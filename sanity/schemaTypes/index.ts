import { type SchemaTypeDefinition } from "sanity";
import user from "./user";
import home from "./home";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, home],
};
