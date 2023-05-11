import { getData, postData } from "@/lib/helpers";

export default async function SearchAsset({ statusName }) {
	const apiUrl = process.env.API;

	const status = await getData(
		`${apiUrl}status/get/status/byName?q=${encodeURI(statusName)}`
	);

	const assets = await postData(`${apiUrl}asset/get/assets/byStatus`, status);
	return (
		<div className='flex flex-col gap-10'>
			{assets.map((asset) => {
				// eslint-disable-next-line react/jsx-key
				return <p key={asset.id}>{JSON.stringify(asset, null, 2)}</p>;
			})}
		</div>
	);
}
