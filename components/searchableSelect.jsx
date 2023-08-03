"use client";
import Select from "react-select";

export function SearchableSelect({ id, changeHandler, options, placeHolder }) {
	return (
		<Select
			onChange={(e, id) => {
				changeHandler(e, id);
			}}
			options={options}
			id={id}
			placeholder={placeHolder}
			isSearchable={true}
			unstyled={true}
			className='
				border-[1px] border-slate-700/80 h-8
				rounded-lg
				pl-3
				pr-2
				text-sm
				min-h-8 w-full max-w-xs'
			classNames={{
				menu: (state) => {
					state.hasValue ? "border-[1px] border-slate-700/80 rounded-lg" : "";
				},
			}}
		></Select>
	);
}
