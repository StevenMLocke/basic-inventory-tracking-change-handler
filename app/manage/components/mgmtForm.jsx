"use client";
export function MgmtForm({
	children,
	buttonClickHandler,
	buttonText,
	className,
	includeButton,
}) {
	return (
		<form
			className={`${className} flex flex-col items-center mx-auto my-2 gap-2 w-full`}
			onSubmit={buttonClickHandler}
		>
			{children}
			{!(includeButton === false) ? (
				<button className={`btn btn-primary btn-sm bg-inherit btn-outline`}>
					{buttonText}
				</button>
			) : (
				<></>
			)}
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
	blurHandler,
	inputType,
	required,
	submitHandler,
	ref,
}) {
	return (
		<input
			ref={ref}
			required={required ?? true}
			className='input input-bordered input-sm w-full max-w-xs form-control'
			id={id}
			placeholder={placeholderText}
			type={inputType ?? "text"}
			value={value || ""}
			onFocus={focusHandler}
			onBlur={blurHandler}
			onChange={changeHandler}
			onSubmit={submitHandler}
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

export function MgmtDate({
	changeHandler,
	id,
	placeholderText,
	value,
	disabledValue,
	required,
}) {
	return (
		<div className='input-group input-group-sm input-group-vertical justify-center max-w-xs'>
			<label className='pl-2 label-text-alt bg-base-200'>
				{placeholderText}
			</label>
			<input
				className='input input-bordered input-sm w-full max-w-xs'
				type='date'
				id={id}
				onChange={changeHandler}
				value={value || ""}
				disabled={disabledValue || false}
				required={required}
			></input>
		</div>
	);
}
