// sanity/lib/sanity.ts
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // سيتم تحديده في .env
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // سيتم تحديده في .env
  apiVersion: "2023-01-01", // يجب تحديد الإصدار
  token: process.env.SANITY_API_TOKEN, // إذا كنت بحاجة إلى token لكتابة البيانات أو الوصول للمعلومات الحساسة
  useCdn: process.env.NODE_ENV === "production", // استخدام CDN في بيئة الإنتاج
});
