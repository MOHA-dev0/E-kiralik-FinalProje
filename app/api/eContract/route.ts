import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/sanity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received contract data:", body);

    const {
      owner_id, // match frontend field name
      kiraciKimligi, // match frontend field name
      girisTarihi,
      kiraTutari,
      komisyonTutari,
      sozlesmeSuresi,
      evEsyaliMi,
      anlasmaKosullari,
    } = body;

    // Check if any required fields are missing
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

    // Check if the tenant exists in the "user" schema
    const tenantExists = await sanityClient.fetch(
      `*[_type == "user" && tc == $tc][0]._id`,
      { tc: kiraciKimligi }
    );

    if (!tenantExists) {
      return NextResponse.json(
        { error: "Kiracı Kimliği'ne ait bir kullanıcı bulunamadı." },
        { status: 404 }
      );
    }

    // Create Sanity document
    const document = {
      _type: "eContract",
      owner_id: { _type: "reference", _ref: owner_id },
      tenant_id: { _type: "reference", _ref: tenantExists }, // Use the valid reference
      girisTarihi,
      kiraTutari,
      komisyonTutari,
      sozlesmeSuresi,
      evEsyaliMi,
      anlasmaKosullari,
    };

    // Create document in Sanity
    const response = await sanityClient.create(document);

    return NextResponse.json({
      message: "Sözleşme başarıyla kaydedildi.",
      data: response,
    });
  } catch (error) {
    console.error("Hata oluştu:", error);
    return NextResponse.json(
      { error: "Sözleşme kaydedilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
