"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SectionHero from "@/components/sectionHero";
import MgmtTabs from "@/components/mgmtTabs";
import { postData } from "@/lib/helpers";
import { MgmtForm, MgmtFormTextInput } from "@/components/mgmtForm";
import ActionsTable from "./actionTable";

export default function ActionClientWrapper({ actions }) {
	//init
	const emptyFormFields = { type: "" };

	const router = useRouter();

	const [formFields, setFormFields] = useState(emptyFormFields);
	const [selected, setSelected] = useState(1);
	const [actionId, setActionId] = useState(null);
	const [activeRowId, setActiveRowId] = useState(null);

	//handlers
	const tabClickHandler = (e) => {
		e.preventDefault();
		setSelected(() => e.target.getAttribute("data-num"));
		setFormFields(emptyFormFields);
		setActionId(null);
		setActiveRowId(null);
	};

	const tableRowSelectHandler = (e, action, selectedTab) => {
		if (selectedTab > 1) {
			setFormFields({
				type: action.type,
			});
			setActionId(action.id);
			setActiveRowId(action.id);
		}
	};

	const fieldChangeHandler = (e) => {
		const fieldId = e.target.getAttribute("id");
		const fieldsCopy = { ...formFields };
		fieldsCopy[fieldId] = e.target.value;
		setFormFields(fieldsCopy);
	};

	const createNewHandler = async (e) => {
		e.preventDefault();
		const data = {
			action: { ...formFields, id: uuidv4() },
		};
		postData("http://localhost:3000/api/action/create", data).then((js) => {
			setFormFields(emptyFormFields);
			setActiveRowId(js.id);
			router.refresh();
		});
	};

	const editActionHandler = async (e) => {
		e.preventDefault();
		const data = {
			action: { ...formFields, id: actionId },
		};
		postData("http://localhost:3000/api/action/edit", data).then((js) => {
			setFormFields(emptyFormFields);
			setActionId(null);
			setActiveRowId(js.id);
			router.refresh();
		});
	};

	const removeActionHandler = async (e) => {
		e.preventDefault();
		if (!actionId) {
			alert("Action must be selected first");
			return;
		}
		postData("http://localhost:3000/api/action/remove", {
			id: actionId,
		}).then((js) => {
			console.log(js);
			setFormFields(emptyFormFields);
			setActionId(null);
			setActiveRowId(null);
			setSelected(1);
			router.refresh();
		});
	};

	//to render
	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={"Actions"}></SectionHero>
			<div className='flex flex-1 pt-4'>
				<div className='flex flex-col items-center flex-initial basis-1/4'>
					{actions.length > 0 && (
						<MgmtTabs
							clickHandler={tabClickHandler}
							selectedTabNum={selected}
						></MgmtTabs>
					)}
					<div className='tabs-content flex flex-col items-center w-full'>
						{selected == 1 && (
							<MgmtForm
								buttonText={"Create"}
								buttonClickHandler={createNewHandler}
							>
								<MgmtFormTextInput
									id={"type"}
									disabledValue={false}
									placeholderText={"type"}
									value={formFields.type}
									changeHandler={fieldChangeHandler}
								></MgmtFormTextInput>
							</MgmtForm>
						)}
						{selected == 2 && (
							<MgmtForm
								buttonText={"Edit Action"}
								buttonClickHandler={editActionHandler}
							>
								<MgmtFormTextInput
									id={"type"}
									disabledValue={false}
									placeholderText={"type"}
									value={formFields.type}
									changeHandler={fieldChangeHandler}
								></MgmtFormTextInput>
							</MgmtForm>
						)}
						{selected == 3 && (
							<MgmtForm
								buttonText={"Remove Action"}
								buttonClickHandler={removeActionHandler}
							>
								<MgmtFormTextInput
									id={"type"}
									disabledValue={true}
									placeholderText={"type"}
									value={formFields.type}
									changeHandler={fieldChangeHandler}
								></MgmtFormTextInput>
							</MgmtForm>
						)}
					</div>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				{actions.length !== 0 && (
					<ActionsTable
						selectHandler={tableRowSelectHandler}
						actions={actions}
						activeRowId={activeRowId}
						selectedTab={selected}
					></ActionsTable>
				)}
			</div>
		</div>
	);
}
