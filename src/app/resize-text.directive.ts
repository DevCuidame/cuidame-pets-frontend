import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appResizeText]',
  standalone: true
})
export class ResizeTextDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const parent = element.parentElement;

    if (element.scrollWidth > parent.clientWidth) {
      element.style.fontSize = '1rem';
    }
  }
}
