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
        username  
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
    _id,
    girisTarihi,
    komisyonTutari,
    kiraTutari,
    sozlesmeSuresi,
    evEsyaliMi,
    anlasmaKosullari,
    owner_id->{
      tc,
      username,
    },
    home_id->{
      _id,
    }
  }`
);

export const GET_ECONTRACTS_BY_HOMEID_QUERY = defineQuery(`
    
    *[_type == "eContract" && home_id._ref == $id] {
  _id,
  home_id,
  anlasmaKosullari,
  evEsyaliMi,
  tenant_id-> { username, tc },
  owner_id-> { username, tc },
  komisyonTutari,
  sozlesmeSuresi,
  kiraTutari,
  girisTarihi,

}
`);
