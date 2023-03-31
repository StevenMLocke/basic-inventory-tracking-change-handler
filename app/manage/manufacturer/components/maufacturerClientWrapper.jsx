"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SectionHero from "@/components/sectionHero";
import MgmtTabs from "@/components/mgmtTabs";
import MgmtTable from "@/components/mgmtTable";
import { MgmtForm, MgmtFormTextInput } from "@/components/mgmtForm";
import { postData } from "@/lib/helpers";

import { ErrorAlert, InfoAlert } from "@/components/alerts";

export default function ManufacturerClientWrapper({ manufacturers }) {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	const [selected, setSelected] = useState(1);
	const [formFields, setFormFields] = useState({});
	const [activeRowId, setActiveRowId] = useState(null);
	const [error, setError] = useState(false);
	const [info, setInfo] = useState(null);

	const tableData = manufacturers.map((m) => {
		return {
			id: m.id,
			name: m.name,
		};
	});

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

	const tableRowSelectHandler = (e, item, selectedTab) => {
		if (selectedTab > 1) {
			setFormFields(item);
			setActiveRowId(item.id);
		}
	};

	const createHandler = async (e) => {
		e.preventDefault();
		const data = {
			manufacturer: { ...formFields, id: uuidv4() },
		};

		await postData(`http://localhost:3000/api/manufacturer/create`, data).then(
			(json) => {
				setInfo(`${json.name} created!`);
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
		if (!formFields.id) {
			setError("You must select an existing model to edit!");
			return;
		}

		const data = {
			manufacturer: { ...formFields },
		};

		await postData("http://localhost:3000/api/manufacturer/edit", data).then(
			(json) => {
				setInfo(`${json.name} edited!`);
				setFormFields({});
				setActiveRowId(json.id);
			}
		);

		startTransition(() => {
			router.refresh();
		});
	};

	const removeHandler = async (e) => {
		e.preventDefault();
		if (!formFields.id) {
			setError("Manufacturer must be selected first");
			return;
		}

		const data = { id: formFields.id };
		await postData("http://localhost:3000/api/manufacturer/remove", data).then(
			(json) => {
				setInfo(`${json.name} removed!`);
				setFormFields({});
				setActiveRowId(null);
				setSelected(1);
			}
		);
		startTransition(() => {
			router.refresh();
		});
	};

	//to render
	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={"Manufacturers"}></SectionHero>
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
								<MgmtFormTextInput
									id={"name"}
									changeHandler={fieldChangeHandler}
									focusHandler={fieldFocusHandler}
									disabledValue={false}
									placeholderText={"Manufacturer Name"}
									value={formFields.name || null}
								></MgmtFormTextInput>
							</MgmtForm>
						)}
						{selected == 2 && (
							<MgmtForm
								buttonClickHandler={editHandler}
								buttonText={"Edit"}
							>
								<MgmtFormTextInput
									id={"name"}
									changeHandler={fieldChangeHandler}
									focusHandler={fieldFocusHandler}
									disabledValue={false}
									placeholderText={"Manufacturer Name"}
									value={formFields.name || null}
								></MgmtFormTextInput>
							</MgmtForm>
						)}
						{selected == 3 && (
							<MgmtForm
								buttonClickHandler={removeHandler}
								buttonText={"remove"}
							>
								<MgmtFormTextInput
									id={"name"}
									changeHandler={fieldChangeHandler}
									focusHandler={fieldFocusHandler}
									disabledValue={true}
									placeholderText={"Manufacturer Name"}
									value={formFields.name || null}
								></MgmtFormTextInput>
							</MgmtForm>
						)}
					</div>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				{manufacturers.length !== 0 && (
					<MgmtTable
						itemsArr={tableData}
						activeRowId={activeRowId}
						selectHandler={tableRowSelectHandler}
						selectedTab={selected}
					></MgmtTable>
				)}
			</div>
			<pre>{JSON.stringify(formFields, null, 2)}</pre>
		</div>
	);
}
