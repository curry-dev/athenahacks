import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fillform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './fillform.component.html',
  styleUrl: './fillform.component.css'
})
export class FillformComponent {
  response: string = '';
  sendAgain: string = '';
  chosen_outfit: string[] = [];

  // nameControl = new FormControl('');
  occasion = new FormControl('');
  selectedGender: string = '';
  selectedVibe: string = '';

  constructor(private _apiservice: ApiService) {}

  calc(prompt: string, selectedGender: string) {
    if (this.selectedVibe == '' || this.selectedGender == '') {
      this.sendAgain = 'get me an outfit';
    } else {
      this.sendAgain = 'I need an outfit for ' + this.occasion.value + '. I want to look ' + this.selectedVibe + '.';
    }

    // console.log('sendAgain:', this.sendAgain);
    this._apiservice.getCalc(this.sendAgain, selectedGender).subscribe(res => {
      this.response = res.response;
      this.chosen_outfit = res.chosen_outfit;
      console.log('response:', this.response, 'chosen_outfit:', this.chosen_outfit);
    });
  }
}
