import { describe, it, expect, beforeAll } from 'vitest';
import { createSessionToken, verifySession } from './auth';

beforeAll(() => {
  process.env.SESSION_SECRET = 'test-secret-32-chars-minimum-ok!';
});

describe('createSessionToken', () => {
  it('retourne une chaîne non vide avec un point', () => {
    const token = createSessionToken();
    expect(token).toContain('.');
    expect(token.length).toBeGreaterThan(10);
  });
});

describe('verifySession', () => {
  it('vérifie un token valide', () => {
    const token = createSessionToken();
    expect(verifySession(token)).toBe('admin');
  });

  it('rejette un token falsifié', () => {
    const token = createSessionToken();
    const tampered = token.slice(0, -4) + 'xxxx';
    expect(verifySession(tampered)).toBeNull();
  });

  it('rejette un token expiré', () => {
    const token = createSessionToken('admin', -1000);
    expect(verifySession(token)).toBeNull();
  });

  it('rejette une chaîne vide', () => {
    expect(verifySession('')).toBeNull();
  });

  it('rejette un token sans point', () => {
    expect(verifySession('notavalidtoken')).toBeNull();
  });
});
