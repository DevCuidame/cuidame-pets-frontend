import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'doctor-app-header-land',
    templateUrl: './doctor-header-land.component.html',
    styleUrls: ['./doctor-header-land.component.scss'],
    standalone: false
})
export class DoctorHeaderLandComponent {
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

  toggleAnimationClasses() {
    const navbar = document.getElementById('navigation-bar');
    const header = document.getElementById('page-header');
    const menuIcon = document.getElementById('menu-icon');

    if (navbar) {
      navbar.classList.toggle('responsive');
    }

    if (header) {
      header.classList.toggle('transparent');
      console.log("🚀 ~ HeaderLandComponent ~ toggleAnimationClasses ~ header?.classList.toggle('transparent'):", header.classList.contains('transparent'));
    }

    if (menuIcon) {
      menuIcon.style.transform = navbar?.classList.contains('responsive') ? 'rotate(90deg)' : 'none';
    }
  }

  onMenuClick() {
    this.toggleAnimationClasses();
  }
}
