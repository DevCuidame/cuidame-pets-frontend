import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ToastMessage } from 'src/app/utils/toastMessage';
import { WaitMessage } from 'src/app/utils/waitMessage';
import { UserService } from '../../../services/user.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { isValidEmail, isValidPhoneNumber } from 'src/app/utils/methods/validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    standalone: false
})
export class RegisterPage implements OnInit {
  public passwordVisible: boolean = false;
  public showPassword: boolean = false;
  public showPasswordConfirm: boolean = false;
  public selectedImage: string | ArrayBuffer | null = null;
  public selectedDepartment: number | null = null;
  public selectedCityId: number | null = null;
  public departments: any[] = [];
  public townships: any[] = [];
  public file_pub_name: any;

  registerO = {
    name: '',
    lastname: '',
    typeID: '',
    numberID: '',
    phone: '',
    email: '',
    password: '',
    city_id: '',
    address: '',
    confirmPassword: '',
    aceptarTerminos: '',
    pubName: '',
    privName: '',
    imageBs64: '',
  };

  tiposID = [
    { valor: 'tarjeta_identidad', etiqueta: 'T.I' },
    { valor: 'cedula_ciudadania', etiqueta: 'C.C' },
    { valor: 'cedula_extranjeria', etiqueta: 'C.E' },
    { valor: 'tarjeta_extranjeria', etiqueta: 'T.E' },
    { valor: 'pasaporte', etiqueta: 'PAS' },
  ];

  constructor(
    private userService: UserService,
    public navCtrl: NavController,
    public toastMessage: ToastMessage,
    private dataService: DataService,
    public waitMessage: WaitMessage,
    public inAppBrows: InAppBrowser
  ) {}

  ngOnInit() {
    this.getDepartments();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleTextPassword(isConfirm: boolean = false): void {
    if (isConfirm) {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    } else {
      this.showPassword = !this.showPassword;
    }
  }

  getType(isConfirm: boolean = false): string {
    return isConfirm ? (this.showPasswordConfirm ? 'text' : 'password') : (this.showPassword ? 'text' : 'password');
  }

  onDepartmentChange(event: any) {
    this.selectedDepartment = event.detail.value;
    this.selectedCityId = null;
    this.getTownshipsForSelectedDepartment();
  }

  getDepartments() {
    this.userService.getDepartments().subscribe(
      (data: any) => this.departments = data,
      (error) => console.error('Error al obtener los departamentos:', error)
    );
  }

  getTownshipsForSelectedDepartment() {
    if (this.selectedDepartment !== null) {
      this.userService.getTownships(this.selectedDepartment).subscribe(
        (data: any) => this.townships = data,
        (error) => console.error('Error al obtener las ciudades:', error)
      );
    } else {
      this.townships = [];
    }
  }

  selectImage() {
    document.getElementById('imageInput')?.click();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = reader.result;
        this.file_pub_name = file.name;
      };
      reader.readAsDataURL(file);
    }
  }

  register(fRegister: NgForm) {
    if (fRegister.form.value.password !== fRegister.form.value.confirmPassword) {
      this.toastMessage.presentToast('Las contraseñas ingresadas no coinciden.');
      return;
    }

    if (!isValidEmail(this.registerO.email)) {
      this.toastMessage.presentToast('Por favor, agrega un correo válido');
      return;
    }

    if (!isValidPhoneNumber(this.registerO.phone)) {
      this.toastMessage.presentToast('Por favor, ingresa un número de teléfono válido.');
      return;
    }

    if (fRegister.form.value.password.length < 4) {
      this.toastMessage.presentToast('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    if (!this.registerO.aceptarTerminos) {
      this.toastMessage.presentToast('Por favor, acepta los terminos y condiciones');
      return;
    }

    if (!this.selectImage) {
      this.toastMessage.presentToast('Por favor, agrega una imagen');
    } 

    if (fRegister.valid) {
      this.waitMessage.present();
      this.dataService.setUsuarioRegistrado(fRegister.form.value);
      const info = {
        ...fRegister.form.value,
        pubName: this.file_pub_name,
        imageBs64: this.selectedImage,
        code: this.dataService.registerBand.code,
        parentesco: this.dataService.registerBand.parentesco,
      };


      this.userService.createUser(info).subscribe((resp) => {
        if (resp.success) {
          this.toastMessage.presentToast('¡El registro se realizó de manera exitosa!');
          this.navCtrl.navigateBack('/confirmed');
          this.dataService.setData(this.registerO.email);
        }else {
          this.toastMessage.presentToast(resp.message);
        }
      });

      this.waitMessage.dismiss();
    } else {
      this.toastMessage.presentToast('Por favor, revisa el formulario.');
    }
  }

  abrirPoliticas() {
    this.inAppBrows.create('https://cuidame.tech/?page_id=690', '_system');
  }
}
