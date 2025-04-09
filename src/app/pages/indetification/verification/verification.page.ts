import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { QrCodeService } from 'src/app/services/qr-code.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ToastMessage } from 'src/app/utils/toastMessage';
import { WaitMessage } from 'src/app/utils/waitMessage';
import { DataService } from '../../../services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.page.html',
    styleUrls: ['./verification.page.scss'],
    standalone: false
})
export class VerificationPage implements OnInit {
  objeto = '';
  escaneado = '';
  codeRequest: string;
  identificado: boolean; //Variable true si el codigo tiene asginado un paciente
  ubicacion = {
    latitude: null,
    longitude: null,
  };

  public select = [
    {
      img: 'manilla.png',
      label: 'Manilla',
      seleccionado: true,
    },
    {
      img: 'otros.png',
      label: 'Otros',
      seleccionado: false,
    },
  ];

  type: string;
  public cargaFinalizada: boolean;

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
    public toastMessage: ToastMessage,
    public navCtrl: NavController,
    public waitMessage: WaitMessage,
    private route: ActivatedRoute,
    private qrCode: QrCodeService,
    private geolocation: Geolocation,
    private storageService: StorageService,
    private userService: UserService
  ) {
    this.cargaFinalizada = false;
  }

  async ngOnInit() {
    await this.getPosition();
    this.consultarCodigo();
    await this.storageService.init();
    this.storageService.clear();
  }

  async consultarCodigo() {
    this.codeRequest = this.route.snapshot.paramMap.get('codeRequest');
    this.dataService.setCodeRequest(this.codeRequest);

    const resp = await this.qrCode
      .findByCode(
        this.codeRequest,
        this.ubicacion,
        this.dataService.verifObjeto
      )
      .toPromise();

    const code = resp.data.code;

    this.userService.getLicence(code).subscribe(
      (response) => {
        // console.log("🚀 ~ VerificationPage ~ consultarCodigo ~ response:", response)
        const { license } = response;
        this.type = license;

        if (this.type === 'Pets') {
          this.continueMascota();
        }
        if (this.type === 'Health') {
          this.continuePersona();
        }

        this.cargaFinalizada = true;
      },
      (error) => {
        console.error(error);
      }
    );

    if (resp.success === true) {
      this.identificado = true;
    } else {
      this.identificado = false;
    }
    this.toastMessage.presentToast(resp.message);
  }

  async getPosition() {
    this.waitMessage.present();
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    try {
      const resp = await this.geolocation.getCurrentPosition(options);
      if (resp) {
        this.ubicacion.latitude = resp.coords.latitude;
        this.ubicacion.longitude = resp.coords.longitude;
        console.log('Ubicación obtenida', this.ubicacion);
        this.dataService.setScanLocation(this.ubicacion);
      }
    } catch (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('Permiso denegado por el usuario.');
          this.toastMessage.presentToast('Permiso denegado. Activa los permisos de ubicación.');
          break;
        case error.POSITION_UNAVAILABLE:
          console.log('La ubicación no está disponible.');
          this.toastMessage.presentToast('La ubicación no está disponible.');
          break;
        case error.TIMEOUT:
          console.log('El tiempo de espera se agotó.');
          this.toastMessage.presentToast('El tiempo de espera se agotó al obtener la ubicación.');
          break;
        default:
          console.log('Error desconocido al obtener la ubicación:', error);
          this.toastMessage.presentToast('Error desconocido al obtener la ubicación.');
          break;
      }
    }
    this.waitMessage.dismiss();
  }

  continuePersona() {
    this.dataService.setCodeRequest(this.codeRequest);
    this.dataService.isCivilAccesing = true;
    this.navCtrl.navigateForward('/tab1');
  }

  continueObjeto() {
    this.navCtrl.navigateForward('/tab2');
  }

  continueMascota() {
    this.navCtrl.navigateForward('/tab3');
  }

  goNextObjeto() {
    this.dataService.verifObjeto = this.objeto;
    this.dataService.verifObjetoEscaneado = this.escaneado;
    this.modalCtrl.dismiss();
  }

  onNextForEmployee() {
    this.navCtrl.navigateForward('/tab1');
  }

  onChange() {
    this.objeto = '';
  }

  seleccionar(selection) {
    this.select.forEach((av) => (av.seleccionado = false));
    selection.seleccionado = true;
  }
}
