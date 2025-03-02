import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  prompt: string = '';
  response: string = '';

  constructor(private _apiservice: ApiService) {}

  calc(prompt: string) {
    this._apiservice.getCalc(prompt).subscribe(res => {
      this.response = res.response;
      console.log('response:', res);
    });
  }

  tmp() {
    this._apiservice.getTmp().subscribe(res=>console.log('tmp:', res));
  }
}
