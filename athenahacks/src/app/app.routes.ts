import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AskaiComponent } from './components/askai/askai.component';
import { FillformComponent } from './components/fillform/fillform.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home', 
        component: HomeComponent
    },
    {
        path: 'askai', 
        component: AskaiComponent
    },
    {
        path: 'fillform', 
        component: FillformComponent
    }
];

export default routes;