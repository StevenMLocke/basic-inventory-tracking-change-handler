"use client";
import SectionHero from "@/components/sectionHero";
import { ErrorAlert, InfoAlert } from "./../../manage/components/mgmtAlerts";
import {
	MgmtDropdown,
	MgmtForm,
	MgmtFormTextInput,
	MgmtDate,
} from "./../../manage/components/mgmtForm";
import { v4 as uuidv4 } from "uuid";
import { useState, useMemo, startTransition } from "react";
import { useRouter } from "next/navigation";

export function CreateAssetClientWrapper({
	ids,
	apiUrl,
	textFieldsArray,
	selectArray,
	inputDateArray,
	heroText,
}) {
	const router = useRouter();

	const [error, setError] = useState();
	const [info, setInfo] = useState();
	const [formFields, setFormFields] = useState({});

	const postData = async function (url, data) {
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			next: { revalidate: 0 },
		});

		return res.json();
	};

	const dismissHandler = () => {
		setError();
		setInfo();
	};

	const fieldChangeHandler = (e) => {
		const fieldId = e.target.getAttribute("id");
		const fieldsCopy = { ...formFields };
		fieldsCopy[fieldId] = e.target.value;
		setFormFields(fieldsCopy);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		//attempt to create asset
		const data = {
			asset: {
				id: uuidv4(),
				location_id: ids.location.id,
				status_id: ids.status.id,
				...formFields,
			},
		};
		//create and log transaction
		const createdAsset = await postData(`${apiUrl}asset/create`, data);
		if (createdAsset) {
			console.log("created");

			const transaction = {
				id: uuidv4(),
				date: new Date().toISOString(),
				asset_id: data.asset.id,
				action_id: ids.action.id,
				action_user_id: ids.transactor.id,
				location_id: ids.location.id,
			};
			await postData(`${apiUrl}transaction/create`, transaction);
		} else {
			setError("Something went rongk");
		}

		setFormFields({});

		setInfo(`Asset ${data.asset.asset_number} created!`);

		startTransition(() => {
			router.refresh();
		});
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
							changeHandler={fieldChangeHandler}
							disabledValue={disabledValue}
							value={formFields[item.id] ?? ""}
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
				{inputDateArray?.map((item) => {
					return (
						<MgmtDate
							key={item.id}
							changeHandler={fieldChangeHandler}
							disabledValue={disabledValue}
							id={item.id}
							placeholderText={item.placeholderText}
							required={item.required}
							value={formFields[item.id] ?? ""}
						></MgmtDate>
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
								buttonText={"Create"}
								buttonClickHandler={submitHandler}
							>
								<h2 className='prose-xl font-semibold'>Create New Asset</h2>
								{formInputs(textFieldsArray, selectArray, false)}
							</MgmtForm>
							<div className='flex justify-center items-center '></div>
							{/* 							<pre>{JSON.stringify("poo", null, 2)}</pre> */}
							<pre>{JSON.stringify(formFields, null, 2)}</pre>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
