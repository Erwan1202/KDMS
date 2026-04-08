import type { APIRoute } from 'astro';
export const prerender = false;
import cloudinary from '../../lib/cloudinary';
import { verifySession } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = cookies.get('kdms_session')?.value ?? '';
  if (!verifySession(token)) {
    return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let publicId: string;
  try {
    const data = await request.formData();
    publicId = (data.get('public_id') as string) ?? '';
  } catch {
    return new Response(JSON.stringify({ error: 'Requête invalide.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!publicId.startsWith('kdms/gallery/')) {
    return new Response(JSON.stringify({ error: 'Image non autorisée.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await cloudinary.uploader.destroy(publicId);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
