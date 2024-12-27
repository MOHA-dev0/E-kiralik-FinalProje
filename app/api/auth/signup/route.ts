import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, tc } = await req.json();

    // تحقق مما إذا كان المستخدم موجودًا بالفعل
    const existingUser = await sanityClient.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مستخدم بالفعل" },
        { status: 400 }
      );
    }

    // إضافة المستخدم الجديد إلى قاعدة البيانات
    const newUser = await sanityClient.create({
      _type: "user",
      username,
      email,
      password,
      tc,
      isLandlord: false, // يمكنك تعديل هذا بناءً على التطبيق الخاص بك
    });

    return NextResponse.json(
      { message: "تم إنشاء الحساب بنجاح", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error); // تسجيل الخطأ للتصحيح
    return NextResponse.json(
      { error: "حدث خطأ أثناء التسجيل" },
      { status: 500 }
    );
  }
}
