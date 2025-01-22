import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/sanity";
import { GET_USER_BY_TC } from "@/sanity/lib/queries";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { kiraciKimligi, homeId } = body;

    if (!kiraciKimligi || !homeId) {
      return NextResponse.json(
        { error: "Tüm alanları doldurun." },
        { status: 400 }
      );
    }

    const tenant = await sanityClient.fetch(GET_USER_BY_TC, {
      tc: kiraciKimligi,
    });

    if (!tenant) {
      return NextResponse.json(
        { error: "Kiracı Kimliği'ne ait bir kullanıcı bulunamadı." },
        { status: 404 }
      );
    }

    await sanityClient
      .patch(homeId)
      .set({ tenant_id: { _type: "reference", _ref: tenant._id } })
      .commit();

    await sanityClient
      .patch(tenant._id)
      .unset([`notifications[_ref == "${homeId}"]`])
      .commit();
    console.log(homeId);

    return NextResponse.json({
      message: "Sözleşme başarıyla kabul edildi ve evin kiracısı güncellendi.",
    });
  } catch (error) {
    console.error("Hata oluştu:", error);
    return NextResponse.json(
      { error: "Sözleşme kaydedilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
