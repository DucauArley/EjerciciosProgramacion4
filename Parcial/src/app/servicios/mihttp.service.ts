import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MihttpService {

  constructor(public http: HttpClient)
  {

  }

  private url = 'http://localhost:80/api/';

  public httpGetO ( metodo: string): Observable<any> {
    return this.http.get( this.url + metodo )
      .pipe( res => res);
  }

}
