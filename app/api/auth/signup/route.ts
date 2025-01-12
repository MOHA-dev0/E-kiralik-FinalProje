import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, tc } = await req.json();

    const existingUser = await sanityClient.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "E-posta zaten kullanımda" },
        { status: 400 }
      );
    }

    const newUser = await sanityClient.create({
      _type: "user",
      username,
      email,
      password,
      tc,
      isLandlord: false,
    });

    return NextResponse.json(
      { message: "Hesap başarıyla oluşturuldu ", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: "Kayıt sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}
