"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MgmtTabs from "@/components/mgmtTabs.jsx";
import MgmtTable from "@/components/mgmtTable";
import SectionHero from "@/components/sectionHero";
import { MgmtForm, MgmtFormTextInput } from "@/components/mgmtForm";
import { postData } from "@/lib/helpers";
import { v4 as uuidv4 } from "uuid";

export default function MgmtClientWrapper({
	items,
	heroTitle,
	managedItemType,
}) {
	const fields = Object.keys(items[0]).filter(
		(key) => key != "id" && key != "permission_id"
	);
	const router = useRouter();

	const [formFields, setFormFields] = useState({});
	const [selected, setSelected] = useState(1);
	const [itemId, setItemId] = useState(null);
	const [activeRowId, setActiveRowId] = useState(null);

	const tabClickHandler = (e) => {
		e.preventDefault();
		setSelected(() => e.target.getAttribute("data-num"));
		setFormFields({});
		setItemId(null);
		setActiveRowId(null);
	};

	const tableRowSelectHandler = (e, item, selectedTab) => {
		if (selectedTab > 1) {
			setFormFields(item);
			setItemId(item.id);
			setActiveRowId(item.id);
			console.log(fields);
		}
	};

	const fieldChangeHandler = (e) => {
		const fieldId = e.target.getAttribute("id");
		const fieldsCopy = { ...formFields };
		fieldsCopy[fieldId] = e.target.value;
		setFormFields(fieldsCopy);
	};

	const createItemHandler = async (e, managedItemType) => {
		const data = {};
		data[managedItemType] = { ...formFields, id: uuidv4() };

		e.preventDefault();
		postData(`http://localhost:3000/api/${managedItemType}/create`, data).then(
			(js) => {
				console.log(js);
				setFormFields({});
				setActiveRowId(js.id);
				router.refresh();
			}
		);
	};

	const editItemHandler = async (e, itemName) => {
		e.preventDefault();
		const data = {};
		data[itemName] = { ...formFields };
		postData(`http://localhost:3000/api/${itemName}/edit`, data).then((js) => {
			setFormFields({});
			setItemId(null);
			setActiveRowId(js.id);
			router.refresh();
		});
	};

	const removeItemHandler = async (e, itemName) => {
		e.preventDefault();
		if (!itemId) {
			alert("A thing must be selected first");
			return;
		}
		postData(`http://localhost:3000/api/${itemName}/remove`, itemId).then(
			(js) => {
				setFormFields({});
				setItemId(null);
				setActiveRowId(null);
				setSelected(1);
				router.refresh();
			}
		);
	};

	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={heroTitle}></SectionHero>
			<div className='flex flex-1 pt-4'>
				<div className='flex flex-col items-center flex-initial basis-1/4'>
					{items.length > 0 && (
						<MgmtTabs
							clickHandler={tabClickHandler}
							selectedTabNum={selected}
						></MgmtTabs>
					)}

					<div className='tabs-content flex flex-col items-center w-full'>
						{selected == 1 && (
							<MgmtForm
								buttonClickHandler={(e) =>
									createItemHandler(e, managedItemType)
								}
								buttonText={"create"}
							>
								{fields.map((field, i) => {
									return (
										<MgmtFormTextInput
											key={i}
											id={field}
											placeholderText={field}
											value={formFields[field]}
											changeHandler={fieldChangeHandler}
											disabledValue={false}
										></MgmtFormTextInput>
									);
								})}
							</MgmtForm>
						)}
						{selected == 2 && (
							<MgmtForm
								buttonClickHandler={(e) => editItemHandler(e, managedItemType)}
								buttonText={"edit"}
							>
								{fields.map((field, i) => {
									return (
										<MgmtFormTextInput
											key={i}
											id={field}
											placeholderText={field}
											value={formFields[field]}
											changeHandler={fieldChangeHandler}
											disabledValue={false}
										></MgmtFormTextInput>
									);
								})}
							</MgmtForm>
						)}
						{selected == 3 && (
							<MgmtForm
								buttonClickHandler={(e) =>
									removeItemHandler(e, managedItemType)
								}
								buttonText={"remove"}
							>
								{fields.map((field, i) => {
									return (
										<MgmtFormTextInput
											key={i}
											id={field}
											placeholderText={field}
											value={formFields[field]}
											changeHandler={fieldChangeHandler}
											disabledValue={true}
										></MgmtFormTextInput>
									);
								})}
							</MgmtForm>
						)}
					</div>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				{items.length !== 0 && (
					<MgmtTable
						itemsArr={items}
						selectedTab={selected}
						selectHandler={tableRowSelectHandler}
						activeRowId={activeRowId}
					></MgmtTable>
				)}
			</div>
		</div>
	);
}
