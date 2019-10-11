import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MihttpService {

  constructor(public http: HttpClient)
  {

  }

  private httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded' })
  };

  private url = 'http://localhost:80/api/';

  public httpGet( metodo: string): Observable<any>
  {
    return this.http.get( this.url + metodo )
      .pipe( res => res);
  }

  public httpPost(metodo: string, body: any): Observable<any>
  {
    return this.http.post(this.url + metodo, body, this.httpOptions)
    .pipe(res=>res);
  }

}
