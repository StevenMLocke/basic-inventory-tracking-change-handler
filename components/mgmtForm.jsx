"use client";
export function MgmtForm({ children, buttonClickHandler, buttonText }) {
	return (
		<form
			className='flex flex-col items-center mx-auto mt-2 gap-2'
			onSubmit={buttonClickHandler}
		>
			{children}
			<button className='btn btn-primary bg-neutral-focus btn-outline'>
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
}) {
	return (
		<input
			required
			className='input input-bordered input-sm w-full max-w-xs form-control'
			id={id}
			placeholder={placeholderText}
			type='text'
			value={value}
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
	selectorId,
}) {
	return (
		<select
			required
			id={id}
			className='select select-bordered select-sm w-full max-w-xs form-control'
			onChange={changeHandler}
			placeholder={placeholderText}
			value={selectorId}
		>
			<option
				value=''
				disabled
				selected
			>
				Pick one
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
