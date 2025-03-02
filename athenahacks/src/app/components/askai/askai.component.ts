import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-askai',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './askai.component.html',
  styleUrl: './askai.component.css'
})

export class AskaiComponent {
  prompt: string = '';
  sendAgain: string = '';
  selectedGender: string = 'WOMEN';
  response: string = '';
  chosen_outfit: string[] = [];
  height = "1.125rem";
  textArea: any;

  constructor(private _apiservice: ApiService) {}

  calc(prompt: string, selectedGender: string) {
    this.sendAgain = prompt ?? 'get me an outfit';
    this._apiservice.getCalc(prompt, selectedGender).subscribe(res => {
      this.response = res.response;
      this.chosen_outfit = res.chosen_outfit;
      console.log('response:', this.response, 'chosen_outfit:', this.chosen_outfit);
    });
  }

  tmp() {
    this._apiservice.getTmp().subscribe(res=>console.log('tmp:', res));
  }



  adjustHeight(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set new height
  }

}
