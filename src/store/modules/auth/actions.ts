interface Credential {
  mobile: string;
  password: string;
}

interface CredentialsProps {
  type: string;
  payload: Credential;
}

interface User {
  name: string;
  mobile: string;
  email: string;
  is_admin: number;
}

interface UserProps {
  token: string;
  user: User;
}

interface SignInProps {
  type: string;
  payload: UserProps;
}

interface SignUpRequestProps {
  name: string;
  mobile: string;
  password: string;
  email?: string;
}

interface SignUpProps {
  type: string;
  payload: SignUpRequestProps;
}

interface PropsType {
  type: string;
}

export function signInRequest(
  mobile: string,
  password: string,
): CredentialsProps {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { mobile, password },
  };
}

export function signInSuccess(token: string, user: User): SignInProps {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { token, user },
  };
}

export function signUpRequest(
  name: string,
  mobile: string,
  password: string,
  password_confirm: string,
  email?: string,
): SignUpProps {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, mobile, password, email },
  };
}

export function signFailure(): PropsType {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut(): PropsType {
  return {
    type: '@auth/SIGN_OUT',
  };
}
