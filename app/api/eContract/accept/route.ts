import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // تأكد من أن المسار صحيح

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { kiraciKimligi, contractId, homeId } = data;

    if (!contractId || !homeId || !kiraciKimligi) {
      return NextResponse.json(
        { message: "Contract ID, Home ID, and Tenant TC are required" },
        { status: 400 }
      );
    }

    // التحقق من وجود المستأجر في قاعدة البيانات والحصول على الـ _id
    const tenant = await client.fetch(
      `*[_type == "user" && tc == $kiraciKimligi][0]`,
      { kiraciKimligi }
    );

    if (!tenant) {
      return NextResponse.json(
        { message: "Tenant not found in the database" },
        { status: 404 }
      );
    }

    // التحقق من وجود المنزل في قاعدة البيانات
    const home = await client.fetch(`*[_type == "home" && _id == $homeId]`, {
      homeId,
    });

    if (!home) {
      return NextResponse.json({ message: "Home not found" }, { status: 404 });
    }

    // إضافة مرجع الـ tenant إلى خانة `tenant_id` في الـ home
    const updatedHome = await client
      .patch(homeId) // تحديد ID المنزل
      .set({
        tenant_id: { _type: "reference", _ref: tenant.id }, // تعيين الـ _id الخاص بالمستأجر كمرجع
      })
      .commit(); // تنفيذ التحديث

    if (updatedHome) {
      console.log("Tenant reference added to home:", updatedHome); // سجل لتتأكد من النجاح
      return NextResponse.json(
        { message: "Tenant reference added successfully" },
        { status: 200 }
      );
    } else {
      console.error("Failed to add Tenant reference", updatedHome); // سجل الخطأ في حالة الفشل
      return NextResponse.json(
        { message: "Failed to add Tenant reference" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error during contract acceptance:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
