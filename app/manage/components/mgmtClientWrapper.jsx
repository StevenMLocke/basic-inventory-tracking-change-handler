"use client";
import { useMemo, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SectionHero from "@/components/sectionHero";
import MgmtTabs from "./mgmtTabs";
import {
	MgmtForm,
	MgmtFormTextInput,
	MgmtDropdown,
	MgmtDate,
} from "./mgmtForm";
import { Table } from "./mgmtTable";
import { Suspense } from "react";

import { ErrorAlert, InfoAlert } from "./mgmtAlerts";

import { dateToString } from "@/lib/clientHelpers";

export default function ClientWrapper({
	session,
	tableData,
	tableColumns,
	tableOptions,
	itemName,
	apiUrl, //for the handlers
	inputTextArr, //map to inputs on mgmtform
	inputSelectArr, //map to inputs on mgmtform
	inputDateArr, //map to inputs on mgmtfrom
	children, //for testing
}) {
	const router = useRouter();

	const memoTableData = useMemo(() => tableData, [tableData]);
	const memoTableColumns = useMemo(() => tableColumns, [tableColumns]);

	const [isPending, startTransition] = useTransition();
	const [selected, setSelected] = useState(-1);
	const [formFields, setFormFields] = useState({});
	const [activeRowId, setActiveRowId] = useState(null);
	const [error, setError] = useState(false);
	const [info, setInfo] = useState(null);

	const postData = async function (url, data) {
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			next: { revalidate: 0 },
		});

		return res.json();
	};

	const errorAlertDismissHandler = (e) => {
		setError(false);
		setFormFields({});
	};

	const infoAlertDismissHandler = (e) => {
		setInfo(null);
	};

	const tabClickHandler = (e) => {
		e.preventDefault();
		setSelected(() => e.target.getAttribute("data-num"));
		setFormFields({});
		setActiveRowId(null);
	};

	const fieldChangeHandler = (e) => {
		const fieldId = e.target.getAttribute("id");
		const fieldsCopy = { ...formFields };
		fieldsCopy[fieldId] = e.target.value;
		setFormFields(fieldsCopy);
	};

	const fieldFocusHandler = (e) => {
		setActiveRowId(null);
	};

	const tableRowSelectHandler = (e, item, selectedTab, rowIndex) => {
		if (selectedTab > 1) {
			setFormFields(item);
			setActiveRowId(rowIndex);
		}
	};

	const createHandler = async (e) => {
		e.preventDefault();
		const data = {};
		data[itemName.toLowerCase().split(" ").join("")] = {
			...formFields,
			id: uuidv4(),
		};

		const returnedItem = await postData(`${apiUrl}create`, data).then(
			(json) => {
				setInfo(`${itemName} created!`);
				setFormFields({});
				setActiveRowId(json.id);
			}
		);

		startTransition(() => {
			router.refresh();
		});
	};

	const editHandler = async (e) => {
		e.preventDefault();
		if (session.user.role !== "admin" && formFields.role_name === "admin") {
			setError("You can not edit an Admin account unless you are an Admin!");
			return;
		}

		if (!formFields.id) {
			setError(`You must select an existing ${itemName} to edit!`);
			return;
		}

		const data = {};
		data[itemName.toLowerCase().split(" ").join("")] = { ...formFields };

		await postData(`${apiUrl}/edit`, data).then((json) => {
			setInfo(`${itemName} edited!`);
			setFormFields({});
			setActiveRowId(json.id);
		});

		startTransition(() => {
			router.refresh();
		});
	};

	const removeHandler = async (e) => {
		e.preventDefault();
		if (!formFields.id) {
			setError(`${itemName} must be selected first`);
			return;
		}

		if (formFields.email) {
			if (session.user.email === formFields.email) {
				setError(
					"You know full-well that you can not delete your own account."
				);
				return;
			}
		}

		const data = { id: formFields.id };

		await postData(`${apiUrl}remove`, data).then((json) => {
			setInfo(`${itemName} removed!`);
			setFormFields({});
			setActiveRowId(null);
			setSelected(1);
		});

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
							focusHandler={fieldFocusHandler}
							value={formFields[item.id] ?? ""}
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
				{inputDateArr?.map((item) => {
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

	//to render
	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={`${itemName}s`}></SectionHero>
			{error && (
				<ErrorAlert
					errorText={error}
					dismissHandler={errorAlertDismissHandler}
				></ErrorAlert>
			)}
			{info && (
				<InfoAlert
					infoText={info}
					dismissHandler={infoAlertDismissHandler}
				></InfoAlert>
			)}
			<div className='flex flex-1 pt-4'>
				<div className='flex flex-col items-center flex-initial basis-1/6 2xl:basis-1/5'>
					<MgmtTabs
						role={session.user.role}
						clickHandler={tabClickHandler}
						selectedTabNum={selected}
						createEnabled={usePathname() == "/manage/asset" ? false : true}
					></MgmtTabs>
					<Suspense fallback={<p>Forms are loading, I suppose.</p>}>
						<div className='tabs-content flex flex-col items-center w-full'>
							{selected == 1 && (
								<MgmtForm
									buttonClickHandler={createHandler}
									buttonText={"Create"}
								>
									{(inputSelectArr || inputTextArr) &&
										formInputs(inputTextArr, inputSelectArr, false)}
								</MgmtForm>
							)}
							{selected == 2 && (
								<MgmtForm
									buttonClickHandler={editHandler}
									buttonText={"Edit"}
								>
									{(inputSelectArr || inputTextArr) &&
										formInputs(inputTextArr, inputSelectArr, false)}
								</MgmtForm>
							)}
							{selected == 3 && (
								<MgmtForm
									buttonClickHandler={removeHandler}
									buttonText={"remove"}
								>
									{(inputSelectArr || inputTextArr) &&
										formInputs(inputTextArr, inputSelectArr, true)}
								</MgmtForm>
							)}
						</div>
					</Suspense>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				<Suspense fallback={<p>Table is loading, I suppose</p>}>
					{memoTableData && memoTableData.length !== 0 && (
						<Table
							tableData={memoTableData}
							tableColumns={memoTableColumns}
							selectHandler={tableRowSelectHandler}
							selectedTab={selected}
							activeRowId={activeRowId}
							options={tableOptions}
						></Table>
					)}
				</Suspense>
			</div>
			{/* <pre>{JSON.stringify(formFields, null, 2)}</pre> */}
			{/* 			<pre>{JSON.stringify(session, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(usePathname(), null, 2)}</pre> */}
			{children}
		</div>
	);
}
