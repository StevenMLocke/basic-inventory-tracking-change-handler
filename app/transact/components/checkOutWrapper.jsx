"use client";
import { AssetCard } from "./assetCard";
import { ContentWrapper } from "@/components/structures";
import { Alerts } from "./../../manage/components/mgmtAlerts";
import {
	MgmtDropdown,
	MgmtForm,
	MgmtFormTextInput,
} from "./../../manage/components/mgmtForm";
import { SearchableSelect } from "@/components/searchableSelect";
import { v4 as uuidv4 } from "uuid";
import { useState, useMemo, startTransition } from "react";
import { useRouter } from "next/navigation";

export function TransactionClientWrapper({
	users,
	ids,
	assets,
	apiUrl,
	textFieldsArray,
	selectArray,
	heroText,
	action,
	assetCardButtonText,
	assetState,
	out,
}) {
	const router = useRouter();

	const [query, setQuery] = useState("");
	const [error, setError] = useState();
	const [info, setInfo] = useState();
	const [formFields, setFormFields] = useState({});

	const filteredAssets = useMemo(() => {
		return assets.filter((asset) => {
			return asset.asset_number.includes(query);
		});
	}, [query, assets]);

	/* 	const memoizedUsers = useMemo(() => {
		return users;
	}, [users]);
 */
	const postData = async function (url, data) {
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			next: { revalidate: 0 },
		});

		return res.json();
	};

	const inputOnChange = (e) => {
		setQuery(e.target.value);
	};

	const formSubmit = (e) => {
		e.preventDefault();
	};

	const dismissHandler = () => {
		setError();
		setInfo();
		setQuery("");
		startTransition(() => {
			router.refresh();
		});
	};

	const fieldChangeHandler = (e) => {
		const fieldId = e.target.getAttribute("id");
		const fieldsCopy = { ...formFields };
		fieldsCopy[fieldId] = e.target.value;
		setFormFields(fieldsCopy);
	};

	const clickHandler = async (asset) => {
		//modify asset location and status
		const assetData = {
			asset: {
				id: asset.id,
				status_id: ids.status.id,
				location_id: ids?.location?.id ?? formFields.location_id,
				assigned_to_user_id: formFields.asset_user_id ?? null,
			},
		};
		if (out) {
			if (
				!assetData.asset.location_id ||
				!assetData.asset.assigned_to_user_id
			) {
				setError("You probably forget to select something.");
				return;
			}
		}
		try {
			await postData(`${apiUrl}asset/edit`, assetData);
			//create transaction
			const transactionData = {
				id: uuidv4(),
				date: new Date().toISOString(),
				asset_id: asset.id,
				action_id: ids.action.id ?? formFields.action_id,
				action_user_id: ids.transactor.id,
				asset_user_id: formFields?.asset_user_id ?? null,
				location_id: formFields?.location_id ?? ids.location.id,
			};

			await postData(`${apiUrl}transaction/create`, transactionData).then(
				(res) => setInfo(`Asset #${asset.asset_number} ${action}.`)
			);
			setFormFields({});
		} catch (err) {
			setError("Something did not work.");
			setFormFields({});
			return;
		}
	};

	function formInputs(textFieldsArray, selectArray, disabledValue) {
		return (
			<>
				{selectArray?.map((item) => {
					return (
						<MgmtDropdown
							id={item.id}
							placeholderText={`Select a(n) ${item.type}...`}
							data={item.data}
							disabledValue={disabledValue}
							value={formFields[item.id] ?? ""}
							changeHandler={fieldChangeHandler}
							key={item.id}
							required={item.required ?? true}
						></MgmtDropdown>
					);
				})}
				{textFieldsArray?.map((item) => {
					return (
						<MgmtFormTextInput
							key={item.name}
							id={item.id}
							placeholderText={`Choose ${item.name}...`}
							changeHandler={(e) => {
								inputOnChange(e);
								fieldChangeHandler(e);
							}}
							value={query}
							disabledValue={disabledValue}
							inputType={item.inputType}
							required={item.required ?? true}
						></MgmtFormTextInput>
					);
				})}
			</>
		);
	}

	return (
		<>
			<Alerts
				dismissHandler={dismissHandler}
				error={error}
				info={info}
			></Alerts>
			<ContentWrapper heroText={heroText}>
				<div className='flex flex-col flex-1 pt-4'>
					<MgmtForm
						includeButton={false}
						buttonClickHandler={formSubmit}
					>
						<h2 className='prose-xl font-semibold'>
							Select location, user, and asset number
						</h2>
						<SearchableSelect
							placeHolder={`Select user to check out to…`}
							changeHandler={(val) => {
								setFormFields((p) => {
									return { asset_user_id: val.value, ...p };
								});
							}}
							options={users}
							id={"poo"}
						></SearchableSelect>
						{formInputs(textFieldsArray, selectArray, false)}
						{filteredAssets.length === 1 && query && (
							<AssetCard
								asset={filteredAssets[0]}
								clickHandler={clickHandler}
								buttonText={assetCardButtonText}
							></AssetCard>
						)}
					</MgmtForm>
				</div>
				<div className='flex justify-center items-center '>
					<h3>
						{assets.length} assets currently {assetState}.
					</h3>
				</div>
			</ContentWrapper>
		</>
	);
}
