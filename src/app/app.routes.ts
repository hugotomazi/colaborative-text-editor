import {Routes} from '@angular/router'
import { ViewLoginComponent } from './view-login/view-login.component'
import { ViewPrincipalComponent } from './view-principal/view-principal.component'

export const ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: ViewLoginComponent},
    {path: 'texteditor', component: ViewPrincipalComponent}
]
