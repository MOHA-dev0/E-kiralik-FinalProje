import { defineQuery } from "next-sanity";

export const GET_OWNED_HOMES_QUERY = defineQuery(
  `*[_type == "home" && owner_id->tc== $owner]{
        _id,
        location,
        tenant_id,
        owner_id->{
        _id,
          tc,
        username
        },
         tenant_id->{
        _id,
         tc,
        username // جلب اسم المستأجر مباشرةً
    }
    }`
);

export const GET_RENTED_HOMES_QUERY = defineQuery(
  `*[_type == "home" && tenant_id->tc== $tenant_id]{
        _id,
        location,
        owner_id->{
        _id,
          tc,
        username
        }
    }`
);

export const GET_ECONTRACTS_QUERY = defineQuery(
  `*[_type == "eContract" && _id == $id][0]{
  girisTarihi,
  komisyonTutari,
    kiraTutari,
    sozlesmeSuresi,
    evEsyaliMi,
    anlasmaKosullari,
    owner_id->{
      tc,
      username,
    }
    
}`
);
