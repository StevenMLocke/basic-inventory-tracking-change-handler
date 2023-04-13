"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import SectionHero from "@/components/sectionHero";
import UserForm from "./UserForm";
import UsersTable from "./UserTable";
import UsersTabs from "./UsersTabs";
import { createUser, editUser, removeUser } from "./../lib/user";

export default function UsersClientWrapper({ users }) {
	const emptyFormFields = { fn: "", ln: "", email: "" };

	const router = useRouter();

	const [formFields, setFormFields] = useState(emptyFormFields);
	const [selected, setSelected] = useState(1);
	const [userId, setUserId] = useState(null);
	const [activeRowId, setActiveRowId] = useState(null);

	const tabClickHandler = (e) => {
		e.preventDefault();
		setSelected(() => e.target.getAttribute("data-num"));
		setFormFields(emptyFormFields);
		setUserId(null);
		setActiveRowId(null);
	};

	const tableRowSelectHandler = (e, user, selectedTab) => {
		if (selectedTab > 1) {
			setFormFields({
				fn: user.fn,
				ln: user.ln,
				email: user.email,
			});
			setUserId(user.id);
			setActiveRowId(user.id);
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
			user: { ...formFields, id: uuidv4() },
		};
		createUser(data).then((js) => {
			setFormFields(emptyFormFields);
			setActiveRowId(js.id);
			router.refresh();
		});
	};

	const editUserHandler = async (e) => {
		e.preventDefault();
		const data = {
			user: { ...formFields, id: userId },
		};
		editUser(data).then((js) => {
			setFormFields(emptyFormFields);
			setUserId(null);
			setActiveRowId(js.id);
			router.refresh();
		});
	};

	const removeUserHandler = async (e) => {
		e.preventDefault();
		if (!userId) {
			alert("User must be selected first");
			return;
		}
		removeUser(userId).then((js) => {
			setFormFields(emptyFormFields);
			setUserId(null);
			setActiveRowId(null);
			setSelected(1);
			router.refresh();
		});
	};

	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={"Users"}></SectionHero>
			<div className='flex flex-1 pt-4'>
				<div className='flex flex-col items-center flex-initial basis-1/4'>
					{users.length > 0 && (
						<UsersTabs
							clickHandler={tabClickHandler}
							selectedTabNum={selected}
						></UsersTabs>
					)}

					<div className='tabs-content flex flex-col items-center w-full'>
						{selected == 1 && (
							<UserForm
								buttonClickHandler={createNewHandler}
								fieldChangeHandler={fieldChangeHandler}
								formFields={formFields}
								buttonText={"Create New User"}
								disabled={false}
							></UserForm>
						)}
						{selected == 2 && (
							<UserForm
								buttonClickHandler={editUserHandler}
								buttonText={"Edit User Info"}
								fieldChangeHandler={fieldChangeHandler}
								formFields={formFields}
							></UserForm>
						)}
						{selected == 3 && (
							<UserForm
								buttonClickHandler={removeUserHandler}
								buttonText={"Remove User"}
								formFields={formFields}
								disabled={true}
							></UserForm>
						)}
					</div>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				{users.length !== 0 && (
					<>
						<UsersTable
							users={users}
							selectHandler={tableRowSelectHandler}
							activeRowId={activeRowId}
							selectedTab={selected}
						></UsersTable>
					</>
				)}
			</div>
			<pre>
				<code>{JSON.stringify(formFields, null, 2)}</code>
			</pre>
		</div>
	);
}
