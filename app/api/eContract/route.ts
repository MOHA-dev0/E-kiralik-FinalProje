import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/sanity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received contract data:", body);

    const {
      owner_id,
      kiraciKimligi,
      girisTarihi,
      kiraTutari,
      komisyonTutari,
      sozlesmeSuresi,
      evEsyaliMi,
      anlasmaKosullari,
    } = body;

    if (
      !owner_id ||
      !kiraciKimligi ||
      !girisTarihi ||
      !kiraTutari ||
      !komisyonTutari ||
      !sozlesmeSuresi ||
      !evEsyaliMi ||
      !anlasmaKosullari
    ) {
      return NextResponse.json(
        { error: "Tüm alanları doldurun." },
        { status: 400 }
      );
    }

    // التحقق من وجود المستأجر
    const tenant = await sanityClient.fetch(
      `*[_type == "user" && tc == $tc][0]`,
      { tc: kiraciKimligi }
    );

    if (!tenant) {
      return NextResponse.json(
        { error: "Kiracı Kimliği'ne ait bir kullanıcı bulunamadı." },
        { status: 404 }
      );
    }

    // إنشاء وثيقة العقد
    const document = {
      _type: "eContract",
      owner_id: { _type: "reference", _ref: owner_id },
      tenant_id: { _type: "reference", _ref: tenant._id },
      girisTarihi,
      kiraTutari: parseFloat(kiraTutari),
      komisyonTutari: parseFloat(komisyonTutari),
      sozlesmeSuresi: parseInt(sozlesmeSuresi, 10),
      evEsyaliMi,
      anlasmaKosullari,
    };

    const contractResponse = await sanityClient.create(document);
    console.log("Contract created:", contractResponse);

    const notification = {
      _key: crypto.randomUUID(), // مفتاح فريد للإشعار
      message:
        "Konut için yeni bir başvurunuz var. Lütfen sözleşmeyi inceleyin.",
      status: "unread",
      date: new Date().toISOString(),
      idhome: contractResponse._id, // إضافة ID البيت من العقد
    };

    const updateResponse = await sanityClient
      .patch(tenant._id)
      .setIfMissing({ notifications: [] }) // إذا لم تكن الإشعارات موجودة، يتم إنشاؤها
      .insert("after", "notifications[-1]", [notification]) // إضافة الإشعار إلى نهاية القائمة
      .commit();

    console.log("Notification added:", updateResponse);

    return NextResponse.json({
      message: "Sözleşme başarıyla kaydedildi ve bildirim gönderildi.",
      data: contractResponse,
    });
  } catch (error) {
    console.error("Hata oluştu:", error);
    return NextResponse.json(
      { error: "Sözleşme kaydedilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
