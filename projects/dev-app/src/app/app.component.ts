import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevFunctions, ModalComponent, ModalService } from 'dev-library';
import { trigger, state, style, animate, transition } from '@angular/animations'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent],
  providers: [ModalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'gray'
      })),
      //transition('void <=> *', animate(1000)),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [ // => operator indicates unidirectional transitions, and <=> is bidirectional. Within the transition
        animate('1s') //animate() specifies how long the transition takes - state change from open to closed takes 1 second
      ]),
      transition('closed => open', [animate('0.5s')]), //state transition from the closed state to the open state with a 0.5-second transition animation arc
    ])
  
  ]
})

export class AppComponent {
  title = 'dev-app';
  isOpen = true;
  func = new DevFunctions();

  constructor(@Inject(ModalService) public modalService: ModalService) {
    
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  
  toggle() {
    
    const result = this.func.multiply(2, 3);
    console.log(result);

    this.isOpen = !this.isOpen;
  }

}
//==================================== notes ====================================
// Use state() to define styles that are applied at the end of each transition, they persist after the animation completes
// Use transition() to define intermediate styles, which create the illusion of motion during the animation
// When animations are disabled, transition() styles can be skipped, but state() styles can't
// Include multiple state pairs within the same transition() argument:
// transition( 'on => off, off => void' )