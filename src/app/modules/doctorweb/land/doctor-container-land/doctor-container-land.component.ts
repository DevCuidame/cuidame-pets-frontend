import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresentationService } from 'src/app/services/cuidameDoc/presentation.service';

@Component({
    selector: 'app-container-land',
    templateUrl: './doctor-container-land.component.html',
    styleUrls: ['./doctor-container-land.component.scss'],
    standalone: false
})
export class DoctorContainerLandComponent implements OnInit {
  doctor: any;

  constructor(private doctorInfoService: PresentationService) {}

  ngOnInit() {
    this.doctorInfoService.getDoctorInfo().subscribe(
      (doctor) => {
        this.doctor = doctor.doctor;
      },
      (error) => {
        console.error('Error fetching doctor info:', error);
      }
    );
  }

  scrollY: number = 0; // Variable to store scroll position

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('page-header');
    this.scrollY = window.scrollY; // Update scrollY value
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

}
