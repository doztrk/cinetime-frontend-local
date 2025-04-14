// middleware.js

import { auth } from "@/auth";
import { NextResponse } from "next/server";

// API Hatalarını yakalama işlemi eklemek için custom middleware
export const middleware = async (req) => {
  try {
    // auth middleware'i çalıştır
    const response = await auth(req);

    // Eğer auth middleware'inden bir sonuç dönerse, devam et
    if (response) {
      return NextResponse.next(); // İsteği devam ettir
    }
  } catch (error) {
    // Hata varsa, hata mesajını logla
    console.error("Middleware Hatası:", error.message);

    // Hata mesajıyla beraber bir hata yanıtı döndür
    return NextResponse.json(
      { error: "API Hatası: " + error.message },
      { status: 500 }
    );
  }

  // Eğer auth işlemi başarısız olduysa, burada dönecek yanıt
  return NextResponse.redirect(new URL("/login", req.url));
};
