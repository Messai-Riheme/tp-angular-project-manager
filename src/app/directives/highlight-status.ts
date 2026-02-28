import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]',
  standalone: true
})
export class HighlightStatusDirective implements OnInit {

  @Input() appHighlightStatus: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {

    switch(this.appHighlightStatus) {
      case 'En attente':
        this.el.nativeElement.style.backgroundColor = '#fee2e2';
        break;
      case 'En cours':
        this.el.nativeElement.style.backgroundColor = '#dbeafe';
        break;
      case 'Terminé':
        this.el.nativeElement.style.backgroundColor = '#dcfce7';
        break;
    }
  }
}