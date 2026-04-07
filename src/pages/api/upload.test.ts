import { describe, it, expect } from 'vitest';
import { validateUpload, ALLOWED_MIME, MAX_SIZE } from './upload';

describe('validateUpload', () => {
  it('accepte un fichier JPEG valide', () => {
    const err = validateUpload('image/jpeg', 1024, 'Mon titre', 'evenementiel');
    expect(err).toBeNull();
  });

  it('rejette un type MIME non autorisé', () => {
    const err = validateUpload('application/pdf', 1024, 'Titre', 'evenementiel');
    expect(err).toContain('Format non supporté');
  });

  it('rejette un fichier trop lourd', () => {
    const err = validateUpload('image/jpeg', MAX_SIZE + 1, 'Titre', 'evenementiel');
    expect(err).toContain('volumineux');
  });

  it('rejette un titre vide', () => {
    const err = validateUpload('image/jpeg', 1024, '', 'evenementiel');
    expect(err).toContain('requis');
  });

  it('rejette une catégorie vide', () => {
    const err = validateUpload('image/jpeg', 1024, 'Titre', '');
    expect(err).toContain('requis');
  });

  it('rejette une catégorie inconnue', () => {
    const err = validateUpload('image/jpeg', 1024, 'Titre', 'inconnue');
    expect(err).toContain('Catégorie invalide');
  });

  it('expose ALLOWED_MIME et MAX_SIZE', () => {
    expect(ALLOWED_MIME.has('image/jpeg')).toBe(true);
    expect(ALLOWED_MIME.has('image/png')).toBe(true);
    expect(ALLOWED_MIME.has('image/webp')).toBe(true);
    expect(MAX_SIZE).toBe(10 * 1024 * 1024);
  });
});
