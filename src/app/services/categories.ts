import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Response, ResponseArray } from '../model/response';
import { QuestionItem } from '../components/category/category.config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public baseUrl = 'https://angular-back-9esj.onrender.com';

  constructor(private http: HttpClient) {}

  getQuestionsByCategory(categoryName: string): Observable<ResponseArray<QuestionItem>> {
    return this.http.get<QuestionItem[]>(`${this.baseUrl}/categories/${categoryName}`).pipe(
      map((questions) => ({ data: questions })), // просто повертаємо масив як data
      delay(500)
    );
  }

  deleteCategoryQuestionById(id: number): Observable<Response<QuestionItem>> {
    return this.http.delete<Response<QuestionItem>>(`${this.baseUrl}/category/${id}`);
  }
}
