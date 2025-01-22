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

export const GET_DATE_BY_ID_OF_TANANT = defineQuery(`
  *[_type == "eContract" && tenant_id._ref == $id][0]{
  girisTarihi
}`);

export const GET_USER_BY_TC = defineQuery(`
  *[_type == "user" && tc == $tc][0]
  `);

export const GET_NOTIFICATIONS_BY_USER_ID = defineQuery(`
  *[_type == "user" && _id == $id][0].notifications
  `);

export const GET_LOGIN_USER_INFO = defineQuery(
  `*[_type == "user" && tc == $tc && password == $password][0]`
);

export const GET_EMAIL_IF_ALEADY_EXIST = defineQuery(
  `*[_type == "user" && email == $email][0]`
);

export const GET_STATUS_BY_ID = defineQuery(
  `*[_type == "user" && tc == $id][0]{
    notifications[] {
      status
    }
  }`
);

export const GET_BY_ID = defineQuery(`*[_id == $userId][0]`);
