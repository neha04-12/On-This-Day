import type { RequestEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }: RequestEvent) {
  const { username, password } = await request.json() as { username: string; password: string };

  if (username === 'admin' && password === 'holymoly') {
    cookies.set('session', 'valid', { path: '/', httpOnly: true });
    return json({ status: 'ok' });
  }

  return json({ error: 'Invalid login' }, { status: 401 });
}
