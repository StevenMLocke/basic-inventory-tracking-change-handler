"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SectionHero from "@/components/sectionHero";
import MgmtTabs from "@/components/mgmtTabs";
import MgmtTable from "@/components/mgmtTable";
import {
	MgmtForm,
	MgmtFormTextInput,
	MgmtDropdown,
} from "@/components/mgmtForm";
import { Table } from "@/components/reactTable.jsx";
import { postData } from "@/lib/helpers";

import { ErrorAlert, InfoAlert } from "@/components/alerts";

export default function ClientWrapper({
	tableData,
	tableColumns,
	itemName,
	apiUrl,
	inputTextArr, //map to inputs on mgmtform
	inputSelectArr, //map to inputs on mgmtform
	children, //for testing
}) {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	const [selected, setSelected] = useState(1);
	const [formFields, setFormFields] = useState({});
	const [activeRowId, setActiveRowId] = useState(null);
	const [error, setError] = useState(false);
	const [info, setInfo] = useState(null);

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
		alert(`${apiUrl}create`);
		const data = {};
		data[itemName] = { ...formFields, id: uuidv4() };

		await postData(`${apiUrl}create`, data).then((json) => {
			setInfo(`${json.name} created!`);
			setFormFields({});
			setActiveRowId(json.id);
		});

		startTransition(() => {
			router.refresh();
		});
	};

	const editHandler = async (e) => {
		e.preventDefault();
		if (!formFields.id) {
			setError(`You must select an existing ${itemName} to edit!`);
			return;
		}

		const data = {};
		data[itemName] = { ...formFields };

		await postData(`${apiUrl}/edit`, data).then((json) => {
			setInfo(`${json.name} edited!`);
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

		const data = { id: formFields.id };
		await postData(`${apiUrl}/remove`, data).then((json) => {
			setInfo(`${itemName} removed!`);
			setFormFields({});
			setActiveRowId(null);
			setSelected(1);
		});
		startTransition(() => {
			router.refresh();
		});
	};

	function FormInputs({ textArray, selectArray, disabledValue }) {
		return (
			<>
				{textArray?.map((item) => {
					return (
						<MgmtFormTextInput
							key={item.id}
							changeHandler={fieldChangeHandler}
							disabledValue={disabledValue}
							focusHandler={fieldFocusHandler}
							id={item.name}
							placeholderText={item.name}
							value={formFields[item.name] || null}
						></MgmtFormTextInput>
					);
				})}
				{selectArray?.map((item) => {
					return (
						<MgmtDropdown
							changeHandler={fieldChangeHandler}
							data={item.data}
							disabledValue={disabledValue}
							id={item.id}
							placeholderText={item.type}
							value={formFields[item.id] || null}
							key={item.id}
						></MgmtDropdown>
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
				<div className='flex flex-col items-center flex-initial basis-1/4'>
					<MgmtTabs
						clickHandler={tabClickHandler}
						selectedTabNum={selected}
					></MgmtTabs>
					<div className='tabs-content flex flex-col items-center w-full'>
						{selected == 1 && (
							<MgmtForm
								buttonClickHandler={createHandler}
								buttonText={"Create"}
							>
								{(inputSelectArr || inputTextArr) && (
									<FormInputs
										textArray={inputTextArr}
										selectArray={inputSelectArr}
										disabledValue={false}
									></FormInputs>
								)}
							</MgmtForm>
						)}
						{selected == 2 && (
							<MgmtForm
								buttonClickHandler={editHandler}
								buttonText={"Edit"}
							>
								{(inputSelectArr || inputTextArr) && (
									<FormInputs
										textArray={inputTextArr}
										selectArray={inputSelectArr}
										disabledValue={false}
									></FormInputs>
								)}
							</MgmtForm>
						)}
						{selected == 3 && (
							<MgmtForm
								buttonClickHandler={removeHandler}
								buttonText={"remove"}
							>
								{(inputSelectArr || inputTextArr) && (
									<FormInputs
										textArray={inputTextArr}
										selectArray={inputSelectArr}
										disabledValue={true}
									></FormInputs>
								)}
							</MgmtForm>
						)}
					</div>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				{tableData && tableData.length !== 0 && (
					<Table
						tableData={tableData}
						tableColumns={tableColumns}
						selectHandler={tableRowSelectHandler}
						selectedTab={selected}
						activeRowId={activeRowId}
					></Table>
				)}
			</div>
			<pre>{JSON.stringify(formFields, null, 2)}</pre>
			<pre>{JSON.stringify(activeRowId, null, 2)}</pre>
			{children}
		</div>
	);
}
