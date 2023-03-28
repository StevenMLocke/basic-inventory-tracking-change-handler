"use client";
import MgmtTable from "@/components/mgmtTable";
import MgmtTabs from "@/components/mgmtTabs";
import { ErrorAlert, InfoAlert } from "@/components/alerts";
import {
	MgmtForm,
	MgmtFormTextInput,
	MgmtDropdown,
} from "@/components/mgmtForm";
import SectionHero from "@/components/sectionHero";
import { postData } from "@/lib/helpers";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ModelClientWrapper({ models, manufacturers }) {
	const router = useRouter();

	const [selected, setSelected] = useState(1);
	const [formFields, setFormFields] = useState({});
	const [manus, setManus] = useState(manufacturers);
	const [activeRowId, setActiveRowId] = useState(null);
	const [error, setError] = useState(false);
	const [info, setInfo] = useState(null);

	const tableData = models.map((model) => {
		return {
			id: model.id,
			name: model.name,
			manufacturer: model.manufacturer.name,
		};
	});

	const errorAlertDismissHandler = (e) => {
		setError(false);
		setFormFields({});
	};

	const infoAlertDismissHandler = (e) => {
		setInfo(null);
		router.refresh();
	};

	const tabClickHandler = (e) => {
		e.preventDefault();
		setSelected(() => e.target.getAttribute("data-num"));
		setFormFields({});
		setActiveRowId(null);
	};

	const fieldChangeHandler = async (e) => {
		const fieldId = e.target.getAttribute("id");
		const fieldsCopy = { ...formFields };
		fieldsCopy[fieldId] = e.target.value;
		setFormFields(fieldsCopy);
	};

	const fieldFocusHandler = (e) => {
		setActiveRowId(null);
	};

	const tableRowSelectHandler = (e, item, selectedTab) => {
		if (selectedTab > 1) {
			const manufacturer = manus.filter((m) => {
				return m.name == item.manufacturer;
			});

			let itemCopy = { ...item };

			itemCopy.manufacturer_id = manufacturer[0].id;
			delete itemCopy.manufacturer;

			setFormFields(itemCopy);
			setActiveRowId(item.id);
		}
	};

	const createHandler = async (e) => {
		e.preventDefault();
		const data = {};
		data.model = { ...formFields, id: uuidv4() };

		await postData("http://localhost:3000/api/model/create", data).then(
			(json) => {
				setInfo(`${json.name} created!`);
				setFormFields({});
				setActiveRowId(json.id);
			}
		);
	};

	const editHandler = async (e) => {
		e.preventDefault();
		if (!formFields.id) {
			setError("You must select an existing model to edit!");
			return;
		}
		const data = { model: { ...formFields } };
		await postData("http://localhost:3000/api/model/edit", data).then(
			(json) => {
				setInfo(`${json.name} edited!`);
				setFormFields({});
				setActiveRowId(json.id);
			}
		);
	};

	const removeHandler = async (e) => {
		e.preventDefault();
		if (!Object.keys(formFields).length) {
			setError("You must select a model to remove!");
			return;
		}

		const data = { model: { ...formFields } };
		await postData("http://localhost:3000/api/model/remove", data).then(
			(json) => {
				setInfo(`${json.name} removed!`);
				setFormFields({});
				setActiveRowId(null);
			}
		);
	};

	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={`Models`}></SectionHero>
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
					{tableData.length > 0 && (
						<MgmtTabs
							selectedTabNum={selected}
							clickHandler={tabClickHandler}
						></MgmtTabs>
					)}
					<div className='tabs-content flex flex-col items-center w-full'>
						{selected == 1 && (
							<MgmtForm
								buttonText={"Create"}
								buttonClickHandler={createHandler}
							>
								<MgmtFormTextInput
									id={"name"}
									placeholderText={"name"}
									changeHandler={fieldChangeHandler}
									focusHandler={fieldFocusHandler}
									value={formFields.name || ""}
									disabledValue={false}
								></MgmtFormTextInput>
								<MgmtDropdown
									id={"manufacturer_id"}
									placeholderText={"Select a Manufacturer…"}
									data={manufacturers}
									value={formFields.manufacturer_id || ""}
									changeHandler={fieldChangeHandler}
								></MgmtDropdown>
							</MgmtForm>
						)}
						{selected == 2 && (
							<MgmtForm
								buttonText={"Edit"}
								buttonClickHandler={editHandler}
							>
								<MgmtFormTextInput
									id={"name"}
									placeholderText={"name"}
									changeHandler={fieldChangeHandler}
									value={formFields.name || ""}
									disabledValue={false}
								></MgmtFormTextInput>
								<MgmtDropdown
									id={"manufacturer_id"}
									placeholderText={"Select a Manufacturer…"}
									data={manufacturers}
									value={formFields.manufacturer_id || ""}
									changeHandler={fieldChangeHandler}
								></MgmtDropdown>
							</MgmtForm>
						)}
						{selected == 3 && (
							<MgmtForm
								buttonText={"Remove"}
								buttonClickHandler={removeHandler}
							>
								<MgmtFormTextInput
									id={"name"}
									placeholderText={"name"}
									changeHandler={fieldChangeHandler}
									value={formFields.name}
									disabledValue={true}
								></MgmtFormTextInput>
								<MgmtDropdown
									id={"manufacturer_id"}
									placeholderText={"Select a Manufacturer…"}
									data={manufacturers}
									value={formFields.manufacturer_id || ""}
									changeHandler={fieldChangeHandler}
									disabledValue={true}
								></MgmtDropdown>
							</MgmtForm>
						)}
					</div>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				{tableData.length > 0 && (
					<MgmtTable
						activeRowId={activeRowId}
						selectHandler={tableRowSelectHandler}
						selectedTab={selected}
						itemsArr={tableData}
					></MgmtTable>
				)}
			</div>
			<pre>{JSON.stringify(formFields, null, 2)}</pre>
		</div>
	);
}
