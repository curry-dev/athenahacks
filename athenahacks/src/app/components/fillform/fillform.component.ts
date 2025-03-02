import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fillform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './fillform.component.html',
  styleUrl: './fillform.component.css'
})
export class FillformComponent {
  // nameControl = new FormControl('');
  selectedGender: string = 'female';
  selectedVibe: string = 'chill';

  submitForm() {
    console.log('Selected gender:', this.selectedGender);
  }
}
