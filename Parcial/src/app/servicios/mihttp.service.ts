import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MihttpService {

  constructor(public http: HttpClient)
  {

  }

  private httpOptions = {
    headers: new HttpHeaders({'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-Type': 'application/x-www-form-urlencoded' })
  };
  
  private url = 'http://localhost:8080/api/';

  public httpGet( metodo: string): Observable<any> 
  {
    return this.http.get( this.url + metodo )
      .pipe( res => res);
  }

  public httpPost(metodo: string): Observable<any> 
  {
    return this.http.post<any>(this.url + metodo, null, this.httpOptions)
    .pipe(res=>res);

  }

}
