import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl: string = environment.apiUrl + '/categories';
  constructor(private http: HttpClient) {}

  list(page: number = 1, limit: number = 5): Observable<Category[]> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return this.http.get<Category[]>(this.apiUrl, { params });
  }

  post(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  delete(category: Category): Observable<Category> {
    return this.http.delete<Category>(this.apiUrl + `/${category.id}`);
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }
}
