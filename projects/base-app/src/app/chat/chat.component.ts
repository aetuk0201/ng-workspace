import { Component } from '@angular/core';
import { OpenAiService } from './open-ai.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  prompt = '';
  response = '';

  constructor(private openAiService: OpenAiService) { }

  sendPrompt() {
    this.openAiService.getResponse(this.prompt).subscribe(
      data => {
        this.response = data.choices[0].message['content'];
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
  generateImage() {
    //this.prompt = 'people sitting on a beach at sunset with a mountain in the background';

    this.openAiService.generateImage(this.prompt).subscribe(
      resp => {
        console.log(resp.data[0].url);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

}
