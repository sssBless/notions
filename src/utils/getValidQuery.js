import { hashPassword } from './validation';

export function getEmailQuery(email) {
  return new URLSearchParams({
    email,
  }).toString();
}

export async function getUserQuery(email, password) {
  return new URLSearchParams({
    email,
    password: await hashPassword(password),
  }).toString();
}
