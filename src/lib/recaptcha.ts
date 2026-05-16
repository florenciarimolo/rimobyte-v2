const SITEVERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

const MIN_SCORE = 0.5;
const EXPECTED_ACTION = 'contact';

type SiteverifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};

export type RecaptchaVerifyResult =
  | { ok: true }
  | { ok: false; reason: 'missing' | 'invalid' | 'low_score' | 'action_mismatch' | 'network' };

export async function verifyRecaptchaToken(
  token: string | null | undefined,
  secretKey: string,
): Promise<RecaptchaVerifyResult> {
  if (!token || typeof token !== 'string') {
    return { ok: false, reason: 'missing' };
  }

  let response: Response;
  try {
    response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });
  } catch {
    return { ok: false, reason: 'network' };
  }

  if (!response.ok) {
    return { ok: false, reason: 'network' };
  }

  const data = (await response.json()) as SiteverifyResponse;

  if (!data.success) {
    return { ok: false, reason: 'invalid' };
  }

  if (data.action && data.action !== EXPECTED_ACTION) {
    return { ok: false, reason: 'action_mismatch' };
  }

  if (typeof data.score === 'number' && data.score < MIN_SCORE) {
    return { ok: false, reason: 'low_score' };
  }

  return { ok: true };
}
