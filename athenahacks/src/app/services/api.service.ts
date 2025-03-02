import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) { }

  getCalc(prompt: string) {
    return this._http.post<{ response: string }>('http://127.0.0.1:5000/calculate', { prompt: prompt });
  }

  getTmp() {
    return this._http.get('http://127.0.0.1:5000/tmp');
  }
}
