import './globals.css'

export const metadata = {
	title: 'Basic Inventory Tracking Change Handler',
	description: 'An app to track inventory change',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="dracula">
			<body className='transition-all duration-300'>{children}</body>
		</html>
	)
}
