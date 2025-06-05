import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const session = cookies.get('session');

	const isProtected = url.pathname.startsWith('/dashboard');

	if (isProtected && session !== 'valid-session') {
		return {
			status: 302,
			redirect: '/login'
		};
	}

	return {
		user: session ? { name: 'Admin' } : null
	};
};
