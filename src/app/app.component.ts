import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        RouterLink
    ],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

}
