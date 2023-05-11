import { MgmtFormTextInput, MgmtDropdown } from './../app/manage/components/mgmtForm'
export function formInputs(textFieldsArray, selectArray, disabledValue) {
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
		</>
	);
}