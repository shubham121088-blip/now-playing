const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = window.location.origin + window.location.pathname;
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
].join(' ');

const CODE_VERIFIER_KEY = 'spotify_pkce_code_verifier';
const ACCESS_TOKEN_KEY = 'spotify_access_token';
const REFRESH_TOKEN_KEY = 'spotify_refresh_token';
const TOKEN_EXPIRY_KEY = 'spotify_token_expiry';

// Generate PKCE code verifier and challenge
function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

function base64encode(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export async function redirectToSpotifyAuthorize(): Promise<void> {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  window.localStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('client_id', CLIENT_ID);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  authUrl.searchParams.append('code_challenge', codeChallenge);
  authUrl.searchParams.append('scope', SCOPES);

  window.location.href = authUrl.toString();
}

export async function handleSpotifyRedirect(): Promise<boolean> {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (!code) return false;

  const codeVerifier = window.localStorage.getItem(CODE_VERIFIER_KEY);
  if (!codeVerifier) return false;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      setTokens(data.access_token, data.refresh_token, data.expires_in);
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }
  } catch (err) {
    console.error('Error exchanging token:', err);
  }
  return false;
}

function setTokens(accessToken: string, refreshToken: string, expiresIn: number) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  const expiryTime = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
}

export function getAccessToken(): string | null {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (expiry && new Date().getTime() > parseInt(expiry, 10)) {
    // Token expired
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function logoutSpotify() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem(CODE_VERIFIER_KEY);
  window.location.reload();
}

export async function fetchCurrentlyPlaying(): Promise<CurrentlyPlaying | null> {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204 || res.status === 304) {
      return { is_playing: false, progress_ms: 0, item: null, currently_playing_type: 'track' };
    }
    if (res.status === 401) {
      logoutSpotify();
      return null;
    }
    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch currently playing:', err);
    return null;
  }
}