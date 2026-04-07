import { createHmac, timingSafeEqual } from 'crypto';

function getSecret(): string {
  const secret = process.env.SESSION_SECRET ?? import.meta.env?.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET manquant dans les variables d\'environnement');
  return secret;
}

export function signSession(payload: string): string {
  const hmac = createHmac('sha256', getSecret()).update(payload).digest('hex');
  return `${payload}.${hmac}`;
}

export function createSessionToken(role = 'admin', ttlMs = 4 * 60 * 60 * 1000): string {
  const expiry = Date.now() + ttlMs;
  return signSession(`${role}:${expiry}`);
}

export function verifySession(token: string): string | null {
  if (!token) return null;
  const lastDot = token.lastIndexOf('.');
  if (lastDot === -1) return null;

  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);

  const expected = createHmac('sha256', getSecret()).update(payload).digest('hex');

  try {
    if (!timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return null;
  } catch {
    return null;
  }

  const colonIdx = payload.indexOf(':');
  if (colonIdx === -1) return null;
  const role = payload.slice(0, colonIdx);
  const expiry = parseInt(payload.slice(colonIdx + 1));

  if (isNaN(expiry) || Date.now() > expiry) return null;
  return role;
}
