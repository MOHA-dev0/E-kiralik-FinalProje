import { defineQuery } from "next-sanity";

export const GET_OWNED_HOMES_QUERY = defineQuery(
  `*[_type == "home" && owner_id->tc== $owner]{
        _id,
        location,
        owner_id->{
        _id,
          tc,
        username
        }
    }`
);
