import { cookies } from "next/headers";

export async function getCookie(name) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value || null;
}

export async function setCookie(name, value, options = {}) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}

export async function getAuthHeader() {
  const authToken = await getCookie("authToken");
  if (!authToken) {
    return {
      "Content-Type": "application/json",
    };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
}
