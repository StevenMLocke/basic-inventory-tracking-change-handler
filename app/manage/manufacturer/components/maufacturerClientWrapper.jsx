"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SectionHero from "@/components/sectionHero";
import MgmtTabs from "@/components/mgmtTabs";
import { postData } from "@/lib/helpers";
import ManufacturerForm from "./manufacturerForm";
import ManufacturerTable from "./manufacturerTable";

export default function ManufacturerClientWrapper({ manufacturers }) {
	//init
	const emptyFormFields = { name: "" };

	const router = useRouter();

	const [formFields, setFormFields] = useState(emptyFormFields);
	const [selected, setSelected] = useState(1);
	const [manufacturerId, setManufacturerId] = useState(null);
	const [activeRowId, setActiveRowId] = useState(null);

	//handlers
	const tabClickHandler = (e) => {
		e.preventDefault();
		setSelected(() => e.target.getAttribute("data-num"));
		setFormFields(emptyFormFields);
		setManufacturerId(null);
		setActiveRowId(null);
	};

	const tableRowSelectHandler = (e, manufacturer, selectedTab) => {
		if (selectedTab > 1) {
			setFormFields({
				name: manufacturer.name,
			});
			setManufacturerId(manufacturer.id);
			setActiveRowId(manufacturer.id);
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
			manufacturer: { ...formFields, id: uuidv4() },
		};
		postData("http://localhost:3000/api/manufacturer/create", data).then(
			(js) => {
				setFormFields(emptyFormFields);
				setActiveRowId(js.id);
				router.refresh();
			}
		);
	};

	const editManufacturerHandler = async (e) => {
		e.preventDefault();
		const data = {
			manufacturer: { ...formFields, id: manufacturerId },
		};
		postData("http://localhost:3000/api/manufacturer/edit", data).then((js) => {
			setFormFields(emptyFormFields);
			setManufacturerId(null);
			setActiveRowId(js.id);
			router.refresh();
		});
	};

	const removeManufacturerHandler = async (e) => {
		e.preventDefault();
		if (!manufacturerId) {
			alert("User must be selected first");
			return;
		}
		postData("http://localhost:3000/api/manufacturer/remove", {
			id: manufacturerId,
		}).then((js) => {
			console.log(js);
			setFormFields(emptyFormFields);
			setManufacturerId(null);
			setActiveRowId(null);
			setSelected(1);
			router.refresh();
		});
	};

	//to render
	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={"Manufacturers"}></SectionHero>
			<div className='flex flex-1 pt-4'>
				<div className='flex flex-col items-center flex-initial basis-1/4'>
					{manufacturers.length > 0 && (
						<MgmtTabs
							clickHandler={tabClickHandler}
							selectedTabNum={selected}
						></MgmtTabs>
					)}
					<div className='tabs-content flex flex-col items-center w-full'>
						{selected == 1 && (
							<ManufacturerForm
								buttonText={"Create"}
								disabled={false}
								formFields={formFields}
								fieldChangeHandler={fieldChangeHandler}
								buttonClickHandler={createNewHandler}
							></ManufacturerForm>
						)}
						{selected == 2 && (
							<ManufacturerForm
								buttonText={"Edit Manufacturer Info"}
								disabled={false}
								formFields={formFields}
								fieldChangeHandler={fieldChangeHandler}
								buttonClickHandler={editManufacturerHandler}
							></ManufacturerForm>
						)}
						{selected == 3 && (
							<ManufacturerForm
								buttonText={"Remove Manufacturer"}
								disabled={true}
								formFields={formFields}
								buttonClickHandler={removeManufacturerHandler}
							></ManufacturerForm>
						)}
					</div>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				{manufacturers.length !== 0 && (
					<ManufacturerTable
						manufacturers={manufacturers}
						selectHandler={tableRowSelectHandler}
						activeRowId={activeRowId}
						selectedTab={selected}
					></ManufacturerTable>
				)}
			</div>
		</div>
	);
}
