import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { MedicamentService } from 'src/app/services/pets/medicament.service';
import { StorageService } from 'src/app/services/storage.service';
import { isFutureDate, isValidDate } from 'src/app/utils/methods/validators';
import { ToastMessage } from 'src/app/utils/toastMessage';

@Component({
    selector: 'app-create-treatment',
    templateUrl: './create-treatment.page.html',
    styleUrls: ['./create-treatment.page.scss'],
    standalone: false
})
export class CreateTreatmentPage implements OnInit {
  public user: User;
  public petId: string = '';
  button: boolean;

  constructor(
    private medicamentService: MedicamentService,
    private storageService: StorageService,
    public toastMessage: ToastMessage,
    public navCtrl: NavController,
    public dataService: DataService,
    private loadingCtrl: LoadingController
  ) {
    this.button = this.dataService.getData();
  }

  async ngOnInit() {
    await this.storageService.init();
    await this.getUser();
    await this.getPetId();
  }

  async getPetId() {
    this.petId = this.storageService.getPetId();
    // console.log(this.petId);
  }

  treatment = {
    typeTreatment: '',
    name: '',
    status: '',
    startDate: '',
    endDate: '',
    frequency: '',
  };

  validateDateRange(form: NgForm) {
    const startDate = new Date(form.value.startDate);
    const endDate = new Date(form.value.endDate);

    if (startDate > endDate) {
      this.toastMessage.presentToast(
        'Fecha Inicio mayor a la fecha fin'
      );
      form.controls['endDate'].setErrors({ incorrectDate: true });
      
    } else {
      
      form.controls['endDate'].setErrors(null);
    }
  }
  async add(form: NgForm) {
    this.validateDateRange(form);
    if (form.valid) {
      const data = {
        pet_id: this.petId,
        ...this.treatment,
      };

      const isValidDate_ = isValidDate(this.treatment.startDate);

      const isFutureDate_ = isFutureDate(this.treatment.startDate);

      const isValidDate__ = isValidDate(this.treatment.endDate);

      if (!isValidDate_) {
        this.toastMessage.presentToast(
          'Por favor, agrega una fecha de inicio válida'
        );
        return;
      } else if (isFutureDate_) {
        this.toastMessage.presentToast('Fecha de inicio mayor a la actual');
        return;
      } else if (!isValidDate__) {
        this.toastMessage.presentToast(
          'Por favor, agrega una fecha de fin válida'
        );
        return;
      }

      const loading = await this.showLoading();

      try {
        const resp = await this.medicamentService
          .add(data, this.user.session_token)
          .toPromise();
        this.toastMessage.presentToast(resp.message);
        this.dataService.setData(resp.success);

        if (resp.success === true) {
          this.toastMessage.presentToast(resp.message);
          form.resetForm();
          //this.navCtrl.navigateForward('/private/veterinarian/add');
          this.dataService.setData(resp.success);
        }
      } catch (e) {
        console.log('Error al guardar informacion de la condición');
      } finally {
        if (loading) {
          loading.dismiss();
        }
      }
    } else {
      this.toastMessage.presentToast('Por favor revisa los campos');
    }
  }

  goToVeterinarian() {
    this.navCtrl.navigateForward('/private/veterinarian/add');
    this.dataService.setData(true);
  }

  goToHistory() {
    this.navCtrl.navigateRoot('/private/history/show');
  }

  private async getUser() {
    await this.storageService
      .loadUser()
      .then((userp) => {
        if (userp) {
          this.user = userp;
        }
      })
      .catch((e) => console.log('Error obteniento user storage', e));
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espera un momento, por favor...',
      cssClass: 'custom-loading',
    });

    loading.present();
    return loading;
  }
}
