import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { AlbumNotificationService } from '../notification/album-notification.service';

@Directive({
  selector: '[appErrorIndicator]'
})
export class ErrorIndicatorDirective {
  isFormValid: boolean = false;
  @Input() tabName: string = '';

  constructor(private el: ElementRef,
              private renderer: Renderer2,
    private albumNotification: AlbumNotificationService) {
    
    this.albumNotification.isValidForm$.subscribe((isValid: boolean) => {
      this.isFormValid = isValid;
     });

  }
  
  @HostListener('click', ['$event'])
  onClick(e: Event) { 
    e.preventDefault();

    let classes = ['fa', 'fa-exclamation'];
    if (this.tabName === 'createAlbum') {
      
      if(!this.isFormValid) {
        this.renderer.addClass(this.el.nativeElement, classes.join(' '));
      }
      else {
        this.renderer.removeClass(this.el.nativeElement, 'fa fa-exclamation');
      }
    }

  }
  
}
