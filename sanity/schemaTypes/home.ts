export default {
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    {
      name: "location",
      title: "Location",
      type: "string",
      description: "Location of the home",
    },

    {
      name: "owner_id",
      title: "Owner TC (Kimlik Numarası)",
      type: "reference",
      to: [{ type: "user" }],
      description: "Reference to owner user by TC (Turkish ID Number)",
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
