import { URLS } from './../../../../utils/data/url.constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-container-dash',
    templateUrl: './container-dash.component.html',
    styleUrls: ['./container-dash.component.scss'],
    standalone: false
})
export class ContainerDashComponent implements OnInit {
  @ViewChild('content') content: IonContent;
  readonly urls = URLS.urls;
  readonly noFlags = URLS.noFlags;
  readonly editUrls = URLS.editUrls;

  constructor(private router: Router) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.content?.scrollToTop();
}

  private isCurrentUrlIncludedIn(urls: string[]): boolean {
    return urls.includes(this.router.url);
  }

  private doesCurrentUrlMatch(urls: string[]): boolean {
    return urls.some(url => this.router.url.includes(url));
  }

  shouldShowFlag(): boolean {
    return !this.doesCurrentUrlMatch(this.noFlags);
  }

  shouldShowGreeting(): boolean {
    return this.doesCurrentUrlMatch(this.editUrls);
  }

  getBackgroundClass(): string {
    return this.isCurrentUrlIncludedIn(this.urls) ? 'background' : 'white-background';
  }

  getMainClass(): string {
    const isHomeUrl = this.router.url === '/private/pages/home';
    const isProfileUrl = this.router.url === '/private/relative/profile';
    const isProfileAdd = this.router.url === '/private/relative/add';
    const baseClass = this.isCurrentUrlIncludedIn(this.urls) ? 'main' : '';
  
    if (isHomeUrl || isProfileUrl || isProfileAdd) {
      return `${baseClass} no-padding`;
    }
    return baseClass;
  }
  
}
