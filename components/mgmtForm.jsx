"use client";
export function MgmtForm({ children, buttonClickHandler, buttonText }) {
	return (
		<form
			className='flex flex-col items-center mx-auto my-2 gap-2'
			onSubmit={buttonClickHandler}
		>
			{children}
			<button className='btn btn-primary btn-sm bg-neutral-focus btn-outline'>
				{buttonText}
			</button>
		</form>
	);
}

export function MgmtFormTextInput({
	id,
	placeholderText,
	value,
	changeHandler,
	disabledValue,
	focusHandler,
	inputType,
	required,
}) {
	return (
		<input
			required={required ?? true}
			className='input input-bordered input-sm w-full max-w-xs form-control'
			id={id}
			placeholder={placeholderText}
			type={inputType ?? "text"}
			value={value || ""}
			onFocus={focusHandler}
			onChange={changeHandler}
			disabled={disabledValue}
		></input>
	);
}

export function MgmtDropdown({
	data,
	changeHandler,
	id,
	placeholderText,
	value,
	disabledValue,
	required,
}) {
	return (
		<select
			required={required ?? true}
			id={id}
			className='select select-bordered select-sm w-full max-w-xs form-control'
			onChange={changeHandler}
			defaultValue={""}
			value={value}
			disabled={disabledValue}
		>
			<option
				value=''
				disabled
			>
				{placeholderText}
			</option>
			{data.map((item) => {
				return (
					<option
						key={item.id}
						id={item.id}
						value={item.id}
					>
						{item.name}
					</option>
				);
			})}
		</select>
	);
}
