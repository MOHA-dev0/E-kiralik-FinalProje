// schemas/home.js

export default {
  name: "home", // اسم الـ Schema
  title: "Home", // العنوان الذي سيظهر في لوحة التحكم في Sanity
  type: "document", // نوع الـ Schema (document يعني وثيقة مستقلة)
  fields: [
    {
      name: "location",
      title: "Location", // موقع البيت
      type: "string", // نوع الحقل (هنا نستخدم string للموقع)
      description: "Location of the home", // وصف الحقل
    },

    {
      name: "owner_id",
      title: "Owner TC (Kimlik Numarası)", // عنوان الحقل
      type: "reference", // نوع الحقل مرجع
      to: [{ type: "user" }], // مرجع إلى الـ User schema بناءً على رقم الـ TC
      description: "Reference to owner user by TC (Turkish ID Number)", // وصف الحقل
    },
    {
      name: "tenant_id",
      title: "Tenant TC (Kimlik Numarası)",
      type: "reference",
      to: [{ type: "user" }],
      description: "Reference to tenant user by TC (Turkish ID Number)",
    },
  ],
};
