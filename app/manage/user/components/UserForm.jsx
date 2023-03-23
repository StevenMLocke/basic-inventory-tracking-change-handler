export default function UserForm({
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
				id='fn'
				placeholder='first name'
				type='text'
				value={formFields.fn}
				onChange={fieldChangeHandler}
				disabled={disabled}
			></input>
			<input
				required
				className='input input-bordered input-sm w-full max-w-xs form-control'
				id='ln'
				placeholder='last name'
				type='text'
				value={formFields.ln}
				onChange={fieldChangeHandler}
				disabled={disabled}
			></input>
			<input
				required
				className='input input-bordered input-sm w-full max-w-xs form-control'
				id='email'
				placeholder='email'
				type='email'
				value={formFields.email}
				onChange={fieldChangeHandler}
				disabled={disabled}
			></input>
			<button className='btn btn-primary bg-neutral-focus btn-outline'>
				{buttonText}
			</button>
		</form>
	);
}
