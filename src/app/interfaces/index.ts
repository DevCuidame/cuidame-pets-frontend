/* eslint-disable @typescript-eslint/naming-convention */
export interface User {
  hashcode: string;
  email: string;
  id: string;
  lastname: string;
  name: string;
  numberID: string;
  phone: string;
  session_token: string;
  typeID: string;
}

export interface Mascota {
    id_pet: string;
    nombre: string;
    especie: string;
    raza: string;
    peso: string;
    fechaNacimiento: string;
    descripcion: string;
    photoBs64: string;
    photoName: string;
}

export interface ResponseApi{
  message: string;
  error: string;
  success: boolean;
}

export interface EditInfo {
  [key: string]: any;
}


// export interface ModeloPaciente{
//   nombre
//   apellido
//   edad
//   genero
//   ciudad
//   departamento
//   direccion
//   rh
//   prepagada
//   arl
//   seguroFunerario
//   aCargo
//   aCargoParentesco
// }

// export interface Article {
//   source:       Source;
//   author?:      string;
//   title:        string;
//   description?: string;
//   url:          string;
//   urlToImage?:  string;
//   publishedAt:  Date;
//   content?:     string;
// }

// export interface Source {
//   id?:  string;
//   name: string;
// }

// export interface ArticlesByCategoryAndPage{
//   [key: string]: {
//     page: number;
//     articles: Article[];
//   };
// }
