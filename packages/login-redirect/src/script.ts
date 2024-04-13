import { initializeClient } from '@altairgraphql/api-utils';
import { validOrigins } from 'altair-graphql-core/build/origins';
import { OAUTH_POPUP_CALLBACK_MESSAGE_TYPE } from '@altairgraphql/api-utils/build/constants';

const OAUTH_NONCE_KEY = 'altairgql:oauth:nonce:key';

const getRedirectResult = () => {
  const params = new URLSearchParams(location.search);
  const accessToken = params.get('access_token');
  if (!accessToken) {
    return;
  }

  return {
    accessToken,
  };
};

const signInWithRedirect = (apiBaseUrl: string) => {
  const state = location.href;
  const loginUrl = new URL('/auth/google/login', apiBaseUrl);
  loginUrl.searchParams.append('state', state);

  return location.replace(loginUrl.href);
};
const init = async () => {
  // Check for query parameter and decide action
  const searchParams = new URLSearchParams(window.location.search);
  const action = searchParams.get('action');
  if (action === 'share') {
    initShareLink();
  } else {
    await initLoginRedirect();
  }
};
const initLoginRedirect = async () => {
  // TODO: Call the login endpoint
  const client = initializeClient(
    import.meta.env.DEV ? 'development' : 'production'
  );

  const result = getRedirectResult();
  if (!result) {
    const nonce = getNonce();
    if (!nonce) {
      throw new Error('No nonce found!');
    }

    sessionStorage.setItem(OAUTH_NONCE_KEY, nonce);

    return signInWithRedirect(client.options.apiBaseUrl);
  }

  await sendToken(result.accessToken);

  cleanup();
  document.body.innerText = 'You can now close this window.';

  closeWindow();
};

const closeWindow = () => {
  try {
    window.close();
  } catch {
    // ignore
  }
};

const getNonce = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('nonce');
};

const cleanup = () => {
  sessionStorage.removeItem(OAUTH_NONCE_KEY);
};

const checkNonce = (nonce?: string | null) => {
  const previous = sessionStorage.getItem(OAUTH_NONCE_KEY);
  if (!previous || !nonce) {
    return false;
  }
  return previous === nonce;
};

const isValidOpener = (opener: unknown): opener is Window => !!opener;

const getValidSource = () => {
  const params = new URLSearchParams(window.location.search);
  const source = params.get('sc');

  if (!source) {
    return;
  }

  // Validate origin
  const url = new URL(source);
  if (!validOrigins.includes(url.origin)) {
    return;
  }

  return url.origin;
};

const sendToken = async (token: string) => {
  const nonce = getNonce();

  if (!checkNonce(nonce)) {
    throw new Error('nonce does not match!');
  }
  const payload = { token, nonce };

  if (isValidOpener(window.opener)) {
    const source = getValidSource();
    if (!source) {
      throw new Error('Invalid source provided!');
    }
    window.opener.postMessage(
      {
        type: OAUTH_POPUP_CALLBACK_MESSAGE_TYPE,
        payload,
      },
      source
    );
    return;
  }
  await fetch('/callback', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

const initShareLink = () => {
  const params = new URLSearchParams(window.location.search);
  const queryId = params.get('q');
  if (!queryId) {
    throw new Error('No query id provided!');
  }

  // TODO: Add support for other clients (browser extensions, web clients, etc)
  location.replace(`altair://share?q=${encodeURIComponent(queryId)}`);
};

init();
