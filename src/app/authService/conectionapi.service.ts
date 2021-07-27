import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConectionapiService {

  url_api = `${environment.API_URL}`;
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  public service_general_get(url:string): Observable<any> {
    return this.http.get(this.url_api + url, { headers: this.headers });
  }

}
