import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bill } from 'src/app/models/bill.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private readonly apiUrl: string = environment.apiUrl + '/bills';
  constructor(private http: HttpClient) {}

  list(page: number = 1, limit: number = 5, query: any = {}): Observable<Bill[]> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString())

    for(const key in query){
      if(query.hasOwnProperty(key)){
        params = params.set(key, query[key].toString())
      }
    }

    return this.http.get<Bill[]>(this.apiUrl, { params });
  }

  post(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill);
  }

  delete(bill: Bill): Observable<Bill> {
    return this.http.delete<Bill>(this.apiUrl + `/${bill.id}`);
  }

  update(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.apiUrl}/${bill.id}`, bill);
  }

  getTotalOfBills(query: any): Observable<number> {
    let params = new HttpParams().set('_limit', '1');
    for(const key in query){
      if(query.hasOwnProperty(key)){
        params = params.set(key, query[key].toString())
      }
    }

    return this.http.get<any>(this.apiUrl, { params, observe: 'response' })
      .pipe(
        map(response => {
          const totalCountHeader = response.headers.get('X-Total-Count');
          return totalCountHeader ? +totalCountHeader : 0;
        })
      );
  }
}
