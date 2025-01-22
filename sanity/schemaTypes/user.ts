export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
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
              type: "string",
            },
            {
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: ["unread", "read"],
                layout: "radio",
              },
              initialValue: "unread",
            },
            {
              name: "date",
              title: "Date",
              type: "datetime",
            },
            {
              name: "idhome",
              title: "IDHOME",
              type: "string",
            },
          ],
        },
      ],
    },

    {
      name: "password",
      title: "Password",
      type: "text",
    },
    {
      name: "isLandlord",
      title: "Is Landlord",
      type: "boolean",
      description: "Check if the user is a landlord",
    },
    {
      name: "tc",
      title: "TC (Kimlik Numarası)",
      type: "string",
      description: "Turkish ID Number (11 digits)",
      validation: (Rule: {
        regex: (
          arg0: RegExp,
          arg1: {
            name: string;
            invert: boolean;
            message: string;
          }
        ) => any;
      }) =>
        Rule.regex(/^\d{11}$/, {
          name: "TC Number",
          invert: false,
          message: "TC 11 rakamdan oluşmalıdır",
        }),
    },
  ],
};
