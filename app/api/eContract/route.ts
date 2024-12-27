import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/sanity";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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

    // تحديث الـ home مع المستأجر
    await sanityClient
      .patch(contractResponse._id) // تحديث الـ home بناءً على contract id
      .set({ tenant_id: { _type: "reference", _ref: tenant._id } })
      .commit();

    // إرسال إشعار للمستأجر
    const notification = {
      _key: crypto.randomUUID(),
      message: "Yeni bir konut başvurusu var. Lütfen sözleşmeyi inceleyin.",
      status: "unread",
      date: new Date().toISOString(),
      idhome: contractResponse._id,
    };

    try {
      await sanityClient
        .patch(tenant._id)
        .setIfMissing({ notifications: [] })
        .insert("after", "notifications[-1]", [notification])
        .commit({ autoGenerateArrayKeys: true });
    } catch (error) {
      console.error("Error saving notification:", error);
    }

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
