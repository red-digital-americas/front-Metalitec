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

  service_general_post_with_url(url:string, parametros:string): Observable<any> {
    return this.http.post(this.url_api + url, parametros, { headers: this.headers });
  }

  public service_general_put(url:string, parametros:string): Observable<any> {
    return this.http.put(this.url_api + url, parametros, { headers: this.headers });
  }

  public service_general_delete(url:string):Observable<any> {
    return this.http.delete(this.url_api + url, { headers: this.headers });
  }

  public service_general_delete_with_url(url:string): Observable<any> {
    return this.http.delete(this.url_api + url, { headers: this.headers });
  }

  public service_general_get(url:string): Observable<any> {
    return this.http.get(this.url_api + url, { headers: this.headers });
  }

}
