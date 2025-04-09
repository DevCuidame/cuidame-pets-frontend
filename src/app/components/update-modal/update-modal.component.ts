import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import {
  Allergy,
  Antecedent,
  AntecedentRelative,
  Disease,
  Medicament,
  Vaccine,
} from 'src/app/models/interfaces';
import { DateFormatService } from 'src/app/services/date-format.service';
import { ComunicationService } from 'src/app/services/relative/comunication.service';
import { DataService } from 'src/app/services/relative/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { showMessage } from 'src/app/utils/messages/toast.func';

enum EntityType {
  Disease = 'disease',
  Disability = 'disability',
  Antecedent = 'antecedent',
  AntecedentRelative = 'antecedentRelative',
  Medicaments = 'medicaments',
  Allergy = 'allergy',
  Vaccine = 'vaccine',
}

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  @Input() data: any;
  @Input() entityType: EntityType;
  @Input() gender: string;

  public title: string = '';
  public _diseases: Disease[] = [];
  public disability: any = []
  public distinctives: any[] = [];
  public antecedent: Antecedent[] = [];
  public antecedentRelative: AntecedentRelative[] = [];
  public medicaments: Medicament[] = [];
  public allergies: Allergy[] = [];
  public vaccines: Vaccine[] = [];

  public toastMessageVisible: boolean = false;
  public isPregnant: string | null = null;

  public relative_id: string = '';

  constructor(
    private modalController: ModalController,
    private dateFormatService: DateFormatService,
    private dataService: DataService,
    private storageService: StorageService,
    public toastr: ToastrService,
    private comunicationService: ComunicationService
  ) {
    this.relative_id = this.storageService.getRelativeId();
  }

  async ngOnInit() {
    await this.setData();
    console.log(this.data)
  }

  dismiss() {
    this.modalController.dismiss();
    this.clearData();
  }



  clearData() {
    this.title = '';
    this._diseases = [];
    this.disability = [];
    this.distinctives = [];
    this.antecedent = [];
    this.antecedentRelative = [];
    this.medicaments = [];
    this.allergies = [];
    this.vaccines = [];
  }

  onPregnancyChange(event: any) {
    this.isPregnant = event.detail.value;
  }

  async save() {
    let updatedData: any;
    switch (this.entityType) {
      case EntityType.Disease:
        this.dataService
          .updateDiseases(this._diseases, this.relative_id)
          .subscribe((response) => {
            if (response.success) {
              this.dismiss();
              this.comunicationService.categoryUpdated(EntityType.Disease)
              updatedData = this._diseases;
              showMessage(
                'success',
                'Información actualizada',
                'Éxito',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            } else {
              showMessage(
                'error',
                'Error al actualizar la información.',
                'Error',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            }
          });
        break;
      case EntityType.Disability:
        if (this.isPregnant) {
          this.disability.embarazada = this.isPregnant;
        }

        this.dataService
          .updateDisability(this.disability, this.relative_id)
          .subscribe((response) => {
            if (response.success) {
              updatedData = this.disability;
              this.dismiss();
              this.comunicationService.categoryUpdated(EntityType.Disability)
              showMessage(
                'success',
                'Información actualizada',
                'Éxito',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            } else {
              showMessage(
                'error',
                'Error al actualizar la información.',
                'Error',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            }
          });
        break;
      case EntityType.Antecedent:
        this.dataService
          .updateAntecedents(this.antecedent, this.relative_id)
          .subscribe((response) => {
            if (response.success) {
              this.dismiss();
              this.comunicationService.categoryUpdated(EntityType.Antecedent)

              showMessage(
                'success',
                'Información actualizada',
                'Éxito',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            } else {
              showMessage(
                'error',
                'Error al actualizar la información.',
                'Error',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            }
          });
        break;
      case EntityType.AntecedentRelative:
        this.dataService
          .updateAntecedentRelatives(this.antecedentRelative, this.relative_id)
          .subscribe((response) => {
            if (response.success) {
              this.dismiss();
              this.comunicationService.categoryUpdated(EntityType.AntecedentRelative)

              showMessage(
                'success',
                'Información actualizada',
                'Éxito',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            } else {
              showMessage(
                'error',
                'Error al actualizar la información.',
                'Error',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            }
          });
        break;
      case EntityType.Medicaments:
        this.dataService
          .updateMedicaments(this.medicaments, this.relative_id)
          .subscribe((response) => {
            if (response.success) {
              this.dismiss();
              this.comunicationService.categoryUpdated(EntityType.Medicaments)

              showMessage(
                'success',
                'Información actualizada',
                'Éxito',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            } else {
              showMessage(
                'error',
                'Error al actualizar la información.',
                'Error',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            }
          });
        break;
      case EntityType.Allergy:
        this.dataService
          .updateAllergies(this.allergies, this.relative_id)
          .subscribe((response) => {
            if (response.success) {
              this.dismiss();
              this.comunicationService.categoryUpdated(EntityType.Allergy)

              showMessage(
                'success',
                'Información actualizada',
                'Éxito',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            } else {
              showMessage(
                'error',
                'Error al actualizar la información.',
                'Error',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            }
          });
        break;
      case EntityType.Vaccine:
        this.dataService
          .updateVaccines(this.vaccines, this.relative_id)
          .subscribe((response) => {
            if (response.success) {
              this.dismiss();
              this.comunicationService.categoryUpdated(EntityType.Vaccine)

              showMessage(
                'success',
                'Información actualizada',
                'Éxito',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            } else {
              showMessage(
                'error',
                'Error al actualizar la información.',
                'Error',
                this.toastr
              );
              this.toastMessageVisible = true;

              timer(3000).subscribe(() => {
                this.clearErrorMessage();
              });
              return;
            }
          });
        break;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  async setData() {
    switch (this.entityType) {
      case EntityType.Disease:
        this.title = 'Enfermedades';
        this._diseases = this.data.data.diseases
        break;
      case EntityType.Disability:
        this.title = 'Discapacidad y/o condición';
        this.disability = this.data.data.disability
        break;
      case EntityType.Antecedent:
        this.title = 'Antecedentes personales';
        this.antecedent = this.data.data.personales.map((item: Antecedent) => ({
          ...item,
          fechaAntecedente: this.dateFormatService.formatSpanishDate(
            item.fechaAntecedente
          ),
        }));
        break;
      case EntityType.AntecedentRelative:
        this.title = 'Antecedentes familiares';
        this.antecedentRelative = this.data.data.familiares;
        break;
      case EntityType.Medicaments:
        this.title = 'Medicamentos';
        this.medicaments = this.data.data.medicamentos;
        break;
      case EntityType.Allergy:
        this.title = 'Alergias';
        this.allergies = this.data.data.alergias;
        break;
      case EntityType.Vaccine:
        this.title = 'Vacunas';
        this.vaccines = this.data.data;
        break;
    }
  }

  extractUniqueItems(data: any[], key: string) {
    return data.reduce((uniqueItems, item) => {
      if (
        item[key] &&
        !uniqueItems.some((uniqueItem) => uniqueItem[key] === item[key])
      ) {
        uniqueItems.push({ [key]: item[key] });
      }
      return uniqueItems;
    }, []);
  }

  addItem(list: any[], newItem: any, add: boolean) {
    if (add) {
      list.push(newItem);
    } else {
      list.pop();
    }
  }

  addDisease(add: boolean) {
    this.addItem(this._diseases, { enfermedad: null }, add);
  }

  addAntecedent(add: boolean) {
    this.addItem(
      this.antecedent,
      {
        tipoAntecedente: null,
        descripcionAntecedente: null,
        fechaAntecedente: null,
      },
      add
    );
  }

  addRelativeAntecedent(add: boolean) {
    this.addItem(
      this.antecedentRelative,
      {
        tipoAntecedenteF: null,
        parentescoF: null,
        descripcionAntecedenteF: null,
      },
      add
    );
  }

  addMedicament(add: boolean) {
    this.addItem(
      this.medicaments,
      {
        medicamento: null,
        laboratorio: null,
        formula: null,
      },
      add
    );
  }

  addAllergy(add: boolean) {
    this.addItem(
      this.allergies,
      {
        tipoAlergia: null,
        descripcion: null,
      },
      add
    );
  }

  addVaccine(add: boolean) {
    this.addItem(
      this.vaccines,
      {
        vacuna: null,
      },
      add
    );
  }

  clearErrorMessage() {
    this.toastMessageVisible = false;
  }
}
