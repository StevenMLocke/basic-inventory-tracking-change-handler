"use client";
import MgmtTable from "@/components/mgmtTable";
import MgmtTabs from "@/components/mgmtTabs";
import {
	MgmtForm,
	MgmtFormTextInput,
	MgmtDropdown,
} from "@/components/mgmtForm";
import SectionHero from "@/components/sectionHero";
import { useState } from "react";

export default function ModelClientWrapper({ models, manufacturers }) {
	const [selected, setSelected] = useState(0);
	const [formFields, setFormFields] = useState({});
	const [manus, setManus] = useState(manufacturers);
	const [activeRowId, setActiveRowId] = useState(null);
	const [selectedDDManuId, setSelectedDDManuId] = useState("");

	const tableData = models.map((model) => {
		return {
			id: model.id,
			name: model.name,
			manufacturer: model.manufacturer.name,
		};
	});

	const tabClickHandler = (e) => {
		e.preventDefault();
		setSelected(() => e.target.getAttribute("data-num"));
		setFormFields({});
	};

	const fieldChangeHandler = (e) => {
		const fieldId = e.target.getAttribute("id");
		const fieldsCopy = { ...formFields };
		fieldsCopy[fieldId] = e.target.value;
		setFormFields(fieldsCopy);
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
			setSelectedDDManuId(manufacturer[0].id);
		}
	};

	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={`Models`}></SectionHero>
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
							<MgmtForm buttonText={"Create"}>
								<MgmtFormTextInput
									id={"name"}
									placeholderText={"name"}
									changeHandler={fieldChangeHandler}
									value={formFields.name}
									disabledValue={false}
								></MgmtFormTextInput>
								<MgmtDropdown
									id={"manufacturer_id"}
									formFields={formFields}
									placeholderText={"Select a Manufacturer…"}
									data={manufacturers}
									changeHandler={fieldChangeHandler}
									selectorId={selectedDDManuId}
									disabledValue={false}
								></MgmtDropdown>
							</MgmtForm>
						)}
						{selected == 2 && (
							<MgmtForm buttonText={"Edit"}>
								<MgmtFormTextInput
									id={"name"}
									placeholderText={"name"}
									changeHandler={fieldChangeHandler}
									value={formFields.name}
									disabledValue={false}
								></MgmtFormTextInput>
								<MgmtDropdown
									id={"manufacturer_id"}
									placeholderText={"Select a Manufacturer…"}
									data={manufacturers}
									changeHandler={fieldChangeHandler}
								></MgmtDropdown>
							</MgmtForm>
						)}
						{selected == 3 && (
							<MgmtForm buttonText={"Remove"}>
								<MgmtFormTextInput
									id={"name"}
									placeholderText={"name"}
									changeHandler={fieldChangeHandler}
									value={formFields.name}
									disabledValue={true}
								></MgmtFormTextInput>
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
			<pre>{JSON.stringify(selectedDDManuId, null, 2)}</pre>
			<pre>{JSON.stringify(formFields, null, 2)}</pre>
		</div>
	);
}
