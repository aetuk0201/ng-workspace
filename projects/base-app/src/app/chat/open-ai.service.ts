import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private imgUrl = 'https://api.openai.com/v1/images/generations';
  private apiKey = 'sk-proj-TkzFpIdLqxZdXd89dvSeT3BlbkFJ4mI9NcLZWJOfsxX5393H';

  constructor(private http: HttpClient) { }

  getResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Given a sentence that contains the name of a US state, respond only with the abbreviation of the state."
          //content: "you are very helpful."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  generateImage(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    };

    return this.http.post(this.imgUrl, body, { headers: headers });
  }
}
