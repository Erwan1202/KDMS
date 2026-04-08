import type { APIRoute } from 'astro';
export const prerender = false;
import bcrypt from 'bcryptjs';
import { loginLimiter } from '../../lib/rateLimit';
import { createSessionToken } from '../../lib/auth';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? '0.0.0.0';

  // Rate limiting
  try {
    await loginLimiter.consume(ip);
  } catch {
    return new Response(
      JSON.stringify({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Parse body
  let password: string;
  try {
    const data = await request.formData();
    password = (data.get('password') as string) ?? '';
  } catch {
    return new Response(
      JSON.stringify({ error: 'Requête invalide.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if (!password) {
    return new Response(
      JSON.stringify({ error: 'Mot de passe requis.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const hash = process.env.ADMIN_PASSWORD_HASH ?? import.meta.env?.ADMIN_PASSWORD_HASH ?? '';
  const valid = await bcrypt.compare(password, hash);

  if (!valid) {
    return new Response(
      JSON.stringify({ error: 'Identifiants incorrects.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const token = createSessionToken();
  const isProduction = process.env.NODE_ENV === 'production';
  const securePart = isProduction ? '; Secure' : '';

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `kdms_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=14400${securePart}`,
    },
  });
};
