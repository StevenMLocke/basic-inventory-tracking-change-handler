"use client";
import { AssetCard } from "./assetCard";
import SectionHero from "@/components/sectionHero";
import { ErrorAlert, InfoAlert } from "./../../manage/components/mgmtAlerts";
import {
	MgmtDropdown,
	MgmtForm,
	MgmtFormTextInput,
} from "./../../manage/components/mgmtForm";
import { v4 as uuidv4 } from "uuid";
import { useState, useMemo, startTransition } from "react";
import { useRouter } from "next/navigation";

export function MoveAssetClientWrapper({
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
		//modify asset location
		const assetData = {
			asset: {
				id: asset.id,
				location_id: formFields.location_id,
			},
		};

		if (!assetData.asset.location_id || !assetData.asset.id) {
			setError("You probably forget to select something.");
			return;
		}

		postData(`${apiUrl}asset/edit`, assetData);

		//create transaction
		const transactionData = {
			id: uuidv4(),
			date: new Date().toISOString(),
			asset_id: asset.id,
			action_id: ids.action.id,
			action_user_id: ids.transactor.id,
			location_id: formFields?.location_id,
		};

		postData(`${apiUrl}transaction/create`, transactionData).then((res) =>
			setInfo(`Asset #${asset.asset_number} ${action}.`)
		);

		setFormFields({});
	};

	function formInputs(textFieldsArray, selectArray, disabledValue) {
		return (
			<>
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
			</>
		);
	}

	return (
		<>
			{error && (
				<ErrorAlert
					dismissHandler={dismissHandler}
					errorText={error}
				></ErrorAlert>
			)}
			{info && (
				<InfoAlert
					dismissHandler={dismissHandler}
					infoText={info}
				></InfoAlert>
			)}
			<div className='flex flex-col w-full overflow-y-auto'>
				<div className='flex flex-col flex-1 min-w-full items-center '>
					<SectionHero title={heroText}></SectionHero>
					<div className='flex flex-1 '>
						<div className='flex flex-col flex-1 justify-between'>
							<MgmtForm
								includeButton={false}
								buttonClickHandler={formSubmit}
							>
								<h2 className='prose-xl font-semibold'>Asset Number Search</h2>
								{formInputs(textFieldsArray, selectArray, false)}

								{filteredAssets.length === 1 && query && (
									<AssetCard
										asset={filteredAssets[0]}
										clickHandler={clickHandler}
										buttonText={assetCardButtonText}
									></AssetCard>
								)}
							</MgmtForm>
							<div className='flex justify-center items-center '>
								<h3>
									{assets.length} assets currently {assetState}.
								</h3>
							</div>
							<pre>{JSON.stringify(filteredAssets, null, 2)}</pre>
							<pre>{JSON.stringify(formFields, null, 2)}</pre>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
