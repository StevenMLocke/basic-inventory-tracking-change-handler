export default function ManufacturerForm({
	buttonClickHandler,
	formFields,
	fieldChangeHandler,
	buttonText,
	disabled,
}) {
	return (
		<form
			className='flex flex-col items-center mx-auto mt-2 gap-2'
			onSubmit={buttonClickHandler}
		>
			<input
				required
				className='input input-bordered input-sm w-full max-w-xs form-control'
				id='name'
				placeholder='Manufacturer Name'
				type='text'
				value={formFields.name}
				onChange={fieldChangeHandler}
				disabled={disabled}
			></input>
			<button className='btn btn-primary bg-neutral-focus btn-outline'>
				{buttonText}
			</button>
		</form>
	);
}
