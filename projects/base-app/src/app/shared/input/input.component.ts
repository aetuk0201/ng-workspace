import { Component, OnInit, Input } from '@angular/core';
import { ControlEvent, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control: FormControl | undefined;
  @Input() label: string = '';
  @Input() inputType: string = 'text';
  @Input() placeholder?: string = '';

  constructor() { }
  
  showErrors() {
    if (this.control) {
      const { dirty, touched, errors } = this.control;
      // this.control.events.pipe(takeUntilDestroyed()).subscribe(() => {
      //   next: (event: ControlEvent) => {
      //     if (event.source.dirty && event.source.touched && event.source.errors) {
      //       event.source.markAsDirty();
      //     }
      //   }
      // });
      return dirty && touched && errors;
    }
    return false;
  }
  
}
