import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export async function POST({ cookies }: RequestEvent) {
  cookies.delete('session', { path: '/' }); // 👈 clear the session cookie
  return json({ message: 'Logged out' });
}
