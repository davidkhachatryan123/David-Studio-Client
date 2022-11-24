import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeServiceElement } from '../models/home-service-element';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url: string = "/api/home/services";

  constructor(private http: HttpClient) {
    this.url = environment.config.apiUrl + this.url;
  }
  
  public GetServices(culture: string) {
    const params = new HttpParams()
    .set("culture", culture);

    return this.http.get<Array<HomeServiceElement>>(this.url, { params: params });
  }
}