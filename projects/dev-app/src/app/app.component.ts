import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevFunctions } from 'dev-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dev-app';

  constructor() {

    const devFunctions = new DevFunctions();
    devFunctions.sayHello();
    
  }
}
