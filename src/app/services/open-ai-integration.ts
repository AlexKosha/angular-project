import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiIntegration {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  API_KEY: string = '';

  private apiKey = this.API_KEY;

  constructor(private http: HttpClient) {}

  generateAnswerForQuestion(question: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const systemPromp = `Ти експерт з глибокими знаннями в JavaScript, RxJS, TypeScript та Angular.
    Твоє завдання  - надати чіткі, докладні й зрозумілі відповіді на будь-які питання
    у цих сферах. Твої пояснення повинні бути досткпними для новачків, включати приклади коду, аналогії
    зі світу розробки та ревльного життя. Структуруй свої відповіді так,
    щоб кожен крок був зрозумілий і логічно зв'язаний з попереднім. Розяснюй складні
    концепції простими словами, використовуючи фнплогіх та приклади, що допоможуть слухачам
    з різним рівнем підготовки зрозуміти матеріал.`;

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPromp,
        },
        {
          role: 'user',
          content: question,
        },
      ],
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map((res) => {
        return res.choices[0].message.content;
      })
    );
  }
}
