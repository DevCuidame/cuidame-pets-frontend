export class UserModel {
    firstname: string;
    lastname: string;
    typeID: string;
    numberID: string;
    phone: string;
    email: string;
    password: string;
    city_id: string;
    address: string;
    confirmPassword: string;
    aceptarTerminos: boolean;
  
    constructor(
      firstname: string,
      lastname: string,
      typeID: string,
      numberID: string,
      phone: string,
      email: string,
      password: string,
      city_id: string,
      address: string,
      confirmPassword: string,
      aceptarTerminos: boolean
    ) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.typeID = typeID;
      this.numberID = numberID;
      this.phone = phone;
      this.email = email;
      this.password = password;
      this.city_id = city_id;
      this.address = address;
      this.confirmPassword = confirmPassword;
      this.aceptarTerminos = aceptarTerminos;
    }
  }
  