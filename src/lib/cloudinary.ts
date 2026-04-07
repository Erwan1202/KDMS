import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? import.meta.env?.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ?? import.meta.env?.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ?? import.meta.env?.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export interface GalleryImage {
  public_id: string;
  secure_url: string;
  title: string;
  category: string;
  created_at: string;
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  const result = await cloudinary.search
    .expression('folder:kdms/gallery')
    .with_field('context')
    .sort_by('created_at', 'desc')
    .max_results(100)
    .execute();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result.resources.map((r: any) => ({
    public_id: r.public_id,
    secure_url: r.secure_url,
    title: r.context?.custom?.title ?? '',
    category: r.context?.custom?.category ?? '',
    created_at: r.created_at,
  }));
}
