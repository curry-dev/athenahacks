import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) { }

  getCalc(prompt: string, selectedGender: string) {
    return this._http.post<{ response: string, chosen_outfit: string[] }>('http://curry-dev.github.io/calculate', { prompt: prompt, selectedGender: selectedGender });
  }
}
