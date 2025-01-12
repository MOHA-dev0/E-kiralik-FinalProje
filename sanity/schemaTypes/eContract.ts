import { Rule } from "sanity";

export default {
  name: "eContract",
  title: "E-Contract",
  type: "document",
  fields: [
    {
      name: "tenant_id",
      title: "Tenant ID (Kiracı Kimliği)",
      type: "reference",
      to: [{ type: "user" }],
      description: "Reference to the Tenant by their Turkish ID.",
      validation: (Rule: Rule) =>
        Rule.required().error("Tenant ID is required."),
    },
    {
      name: "girisTarihi",
      title: "Entry Date (Giriş Tarihi)",
      type: "date",
      description: "The date the contract starts.",
      validation: (Rule: Rule) =>
        Rule.required().error("Giriş Tarihi is required."),
    },
    {
      name: "kiraTutari",
      title: "Rent Amount (Kira Tutarı)",
      type: "number",
      description: "Monthly rent amount in Turkish Lira.",
      validation: (Rule: Rule) =>
        Rule.required()
          .positive()
          .error("Kira Tutarı must be a positive number."),
    },
    {
      name: "komisyonTutari",
      title: "Commission Amount (Komisyon Tutarı)",
      type: "number",
      description: "Commission fee in Turkish Lira.",
      validation: (Rule: Rule) =>
        Rule.required()
          .positive()
          .error("Komisyon Tutarı must be a positive number."),
    },
    {
      name: "sozlesmeSuresi",
      title: "Contract Duration (Sözleşme Süresi)",
      type: "number",
      description: "Contract duration in months.",
      validation: (Rule: Rule) =>
        Rule.required()
          .min(1)
          .error("Sözleşme Süresi must be at least 1 month."),
    },
    {
      name: "evEsyaliMi",
      title: "Is the House Furnished? (Ev Eşyalı mı?)",
      type: "text",
      description: "Is the house furnished (Evet/Hayir)?",
    },
    {
      name: "anlasmaKosullari",
      title: "Agreement Terms (Anlaşma Koşulları)",
      type: "text",
      description: "Terms and conditions of the agreement.",
      validation: (Rule: Rule) =>
        Rule.required()
          .min(10)
          .max(500)
          .error("Anlaşma Koşulları must be between 10 and 500 characters."),
    },
    {
      name: "owner_id",
      title: "Owner ID (Malik Kimliği)",
      type: "reference",
      to: [{ type: "user" }],
      description: "Reference to the owner by their Turkish ID.",
      validation: (Rule: Rule) =>
        Rule.required().error("Owner ID is required."),
    },
    {
      name: "home_id",
      title: "Home ID (Ev ID)",
      type: "reference",
      to: [{ type: "home" }],
      description: "Reference to the home document.",
      validation: (Rule: Rule) => Rule.required().error("Home ID is required."),
    },
  ],
};
