import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { QuestionItem } from '../components/category/category.config';
import { Response, ResponseArray } from '../model/response';

@Injectable({
  providedIn: 'root',
})
export class PreparationService {
  public baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPreparationQuestionsByCategory(categoryName: string): Observable<ResponseArray<QuestionItem>> {
    return this.http
      .get<ResponseArray<QuestionItem>>(`${this.baseUrl}/preparation/${categoryName}`)
      .pipe(
        map((res: any) => {
          return { data: res[0]?.questions || [] };
        }),
        delay(500)
      );
  }

  updatePreparationQuestionById(
    question: Partial<QuestionItem>,
    id: number
  ): Observable<Response<QuestionItem>> {
    return this.http.patch<Response<QuestionItem>>(`${this.baseUrl}/questions/${id}`, {
      ...question,
    });
  }

  deletePreparationQuestionById(id: number): Observable<Response<QuestionItem>> {
    return this.http.delete<Response<QuestionItem>>(`${this.baseUrl}/questions/${id}`);
  }
}
