import { auth } from "@/auth";
import { appConfig } from "./config";

export const getAuthHeader = async () => {
  const session = await auth();
  const token = session?.accessToken;

  let authHeader = {
    "Content-Type": "application/json",
  };

  if (token) {
    authHeader["Authorization"] = token;
  }

  return authHeader;
};

export const parseJWT = (token) => {
  // token.split(".") -> token dan nokta karakterine göre 3 elemanlı bir dizi oluşturur
  // token.split(".")[1] -> 1. elemanı alır
  // atob(...) -> base64 ile şifrelenmiş veriyi decode eder
  // JSON.parse(...) -> decode edilen veriyi JSON formatına çevirir
  // Token'dan 'Bearer ' kısmını temizle
  try {
    // token.split(".") -> token dan nokta karakterine göre 3 elemanlı bir dizi oluşturur
    const decoded = JSON.parse(atob(token.split(".")[1])); // Token'ı çözümleyerek JSON'a çeviriyoruz
    return decoded;
  } catch (error) {
    console.error("JWT decode hatası:", error);
    return null;
  }
};

export const getIsTokenValid = (token) => {
  if (!token) return false;

  const decodedToken = parseJWT(token);
  if (!decodedToken) return false;

  const jwtExpireTimeStamp = decodedToken.exp;
  // Eğer expire zamanı varsa, token geçerliliğini kontrol et
  if (!jwtExpireTimeStamp) return false;

  const jwtExpireDateTime = new Date(jwtExpireTimeStamp * 1000);
  return jwtExpireDateTime > new Date(); // Geçerli mi diye kontrol et
};

export const getIsUserAuthorized = (role, targetPath) => {
  if (!role || !targetPath) return false;

  const userRight = appConfig.userRightsOnRoutes.find((item) =>
    item.urlRegex.test(targetPath)
  );

  if (!userRight) return false;

  return userRight.roles.includes(role);
};
