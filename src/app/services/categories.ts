import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Response, ResponseArray } from '../model/response';
import { QuestionItem } from '../components/category/category.config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getQuestionsByCategory(categoryName: string): Observable<ResponseArray<QuestionItem>> {
    return this.http
      .get<ResponseArray<QuestionItem>>(`${this.baseUrl}/category/${categoryName}`)
      .pipe(
        map((res: any) => {
          return { data: res[0]?.questions || [] };
        }),
        delay(500)
      );
  }

  deleteCategoryQuestionById(id: number): Observable<Response<QuestionItem>> {
    return this.http.delete<Response<QuestionItem>>(`${this.baseUrl}/questions/${id}`);
  }
}
