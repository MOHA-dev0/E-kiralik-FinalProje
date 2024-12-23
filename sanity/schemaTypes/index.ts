import { type SchemaTypeDefinition } from "sanity";
import user from "./user";
import home from "./home";
import eContract from "./eContract";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, home, eContract],
};
