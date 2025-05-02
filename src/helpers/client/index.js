export function getCookie(name) {
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((c) => c.trim().startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1].trim() : null;
}

export function setCookie(name, value, options = {}) {
  const cookieString = `${name}=${value}; ${
    options.expires ? `expires=${options.expires.toUTCString()}` : ""
  }; path=/`;
  document.cookie = cookieString;
}

export async function getAuthHeader() {
  const authToken = getCookie("authToken");
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
