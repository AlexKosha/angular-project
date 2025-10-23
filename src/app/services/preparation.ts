import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { QuestionItem } from '../components/category/category.config';
import { Response, ResponseArray } from '../model/response';

@Injectable({
  providedIn: 'root',
})
export class PreparationService {
  public baseUrl = 'https://angular-back-9esj.onrender.com';

  constructor(private http: HttpClient) {}

  getPreparationQuestionsByCategory(categoryName: string): Observable<ResponseArray<QuestionItem>> {
    return this.http.get<QuestionItem[]>(`${this.baseUrl}/categories/${categoryName}`).pipe(
      map((questions) => ({ data: questions })), // просто повертаємо масив як data
      delay(500)
    );
  }

  updatePreparationQuestionById(
    question: Partial<QuestionItem>,
    id: number
  ): Observable<Response<QuestionItem>> {
    return this.http.put<Response<QuestionItem>>(`${this.baseUrl}/categories/questions/${id}`, {
      answer: question.answer,
    });
  }

  deletePreparationQuestionById(id: number): Observable<Response<QuestionItem>> {
    return this.http.delete<Response<QuestionItem>>(`${this.baseUrl}/questions/${id}`);
  }
}
