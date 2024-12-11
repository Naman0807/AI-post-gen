// src/components/Layout.js
import Link from "next/link";

const Layout = ({ children }) => {
	return (
		<div>
			<header className="bg-blue-500 text-white p-4">
				<nav>
					<Link href="/" className="mr-4">
						Home
					</Link>
					<Link href="/dashboard" className="mr-4">
						Dashboard
					</Link>
				</nav>
			</header>
			<main className="p-6">{children}</main>
			<footer className="bg-gray-800 text-white text-center p-4">
				&copy; 2024 Your App Name. All Rights Reserved.
			</footer>
		</div>
	);
};

export default Layout;
