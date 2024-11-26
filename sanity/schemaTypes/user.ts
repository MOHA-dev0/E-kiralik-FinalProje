// schemas/user.js

export default {
  name: "user", // اسم الـ Schema
  title: "User", // العنوان الذي سيظهر في لوحة التحكم في Sanity
  type: "document", // نوع الـ Schema (document يعني وثيقة مستقلة)
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string", // نوع الحقل (هنا نستخدم string للبريد الإلكتروني)
    },
    {
      name: "email",
      title: "Email",
      type: "string", // نوع الحقل (هنا نستخدم string للبريد الإلكتروني)
    },
    {
      name: "password",
      title: "Password",
      type: "text", // نوع الحقل.
      hidden: true, // إخفاء الحقل في لوحة التحكم
    },
    {
      name: "isLandlord",
      title: "Is Landlord",
      type: "boolean", // حقل لتحديد ما إذا كان المستخدم صاحب منزل أم لا
      description: "Check if the user is a landlord", // وصف الحقل
    },
    {
      name: "tc",
      title: "TC (Kimlik Numarası)", // عنوان الحقل
      type: "string",

      description: "Turkish ID Number (11 digits)", // وصف الحقل
    },
  ],
};
