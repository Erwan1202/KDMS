import type { APIRoute } from 'astro';
import sharp from 'sharp';
import cloudinary from '../../lib/cloudinary';
import { verifySession } from '../../lib/auth';

export const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
export const MAX_SIZE = 10 * 1024 * 1024; // 10 Mo

const VALID_CATEGORIES = new Set([
  'evenementiel',
  'meubles',
  'audiovisuel',
  'valise-resine',
  'industrie',
]);

export function validateUpload(
  mimeType: string,
  fileSize: number,
  title: string,
  category: string
): string | null {
  if (!ALLOWED_MIME.has(mimeType)) {
    return 'Format non supporté. JPG, PNG ou WebP uniquement.';
  }
  if (fileSize > MAX_SIZE) {
    return 'Fichier trop volumineux (max 10 Mo).';
  }
  if (!title.trim()) {
    return 'Titre et catégorie requis.';
  }
  if (!category) {
    return 'Titre et catégorie requis.';
  }
  if (!VALID_CATEGORIES.has(category)) {
    return 'Catégorie invalide.';
  }
  return null;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  // Vérification session
  const token = cookies.get('kdms_session')?.value ?? '';
  if (!verifySession(token)) {
    return new Response(
      JSON.stringify({ error: 'Non autorisé.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let file: File | null;
  let title: string;
  let category: string;

  try {
    const data = await request.formData();
    file = data.get('photo') as File | null;
    title = ((data.get('title') as string) ?? '').trim();
    category = (data.get('category') as string) ?? '';
  } catch {
    return new Response(
      JSON.stringify({ error: 'Requête invalide.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!file) {
    return new Response(
      JSON.stringify({ error: 'Photo requise.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const validationError = validateUpload(file.type, file.size, title, category);
  if (validationError) {
    return new Response(
      JSON.stringify({ error: validationError }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Sharp : re-encode JPEG, strip EXIF, resize max 2000px
  const processed = await sharp(buffer)
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();

  // Upload Cloudinary
  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'kdms/gallery',
          context: `title=${title}|category=${category}`,
        },
        (error, result) => {
          if (error || !result) reject(error ?? new Error('Upload échoué'));
          else resolve(result);
        }
      )
      .end(processed);
  });

  return new Response(JSON.stringify({ ok: true, url: result.secure_url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
