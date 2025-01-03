export default {
  name: "user", // اسم الـ Schema
  title: "User", // العنوان الذي سيظهر في لوحة التحكم في Sanity
  type: "document", // نوع الـ Schema (document يعني وثيقة مستقلة)
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string", // نوع الحقل (هنا نستخدم string لاسم المستخدم)
    },
    {
      name: "email",
      title: "Email",
      type: "string", // نوع الحقل (هنا نستخدم string للبريد الإلكتروني)
    },
    {
      name: "notifications",
      title: "Notifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "message",
              title: "Message",
              type: "string", // محتوى الإشعار
            },
            {
              name: "status",
              title: "Status",
              type: "string", // حالة الإشعار
              options: {
                list: ["unread", "read"], // حالات الإشعار
                layout: "radio",
              },
              initialValue: "unread",
            },
            {
              name: "date",
              title: "Date",
              type: "datetime", // تاريخ إرسال الإشعار
            },
            {
              name: "idhome",
              title: "IDHOME",
              type: "string", // معرف الإشعار
            },
          ],
        },
      ],
    },

    {
      name: "password",
      title: "Password",
      type: "text", // نوع الحقل.
      // إخفاء الحقل في لوحة التحكم
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
      type: "string", // نوع الحقل
      description: "Turkish ID Number (11 digits)", // وصف الحقل
      validation: (Rule: {
        regex: (
          arg0: RegExp,
          arg1: {
            name: string; // اسم القاعدة
            invert: boolean; // شرط التحقق
            message: string;
          }
        ) => any;
      }) =>
        Rule.regex(/^\d{11}$/, {
          name: "TC Number", // اسم القاعدة
          invert: false, // شرط التحقق
          message: "TC يجب أن يحتوي على 11 رقماً فقط.", // رسالة الخطأ
        }),
    },
  ],
};
