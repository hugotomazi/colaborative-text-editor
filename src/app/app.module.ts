import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ROUTES} from './app.routes'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SocketService} from './services/socket.service';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ViewPrincipalComponent } from './view-principal/view-principal.component';
import { ViewLoginComponent } from './view-login/view-login.component';
import { RouterModule } from '@angular/router';
import { ConnectedUsersComponent } from './view-principal/connected-users/connected-users.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ViewPrincipalComponent,
    ViewLoginComponent,
    ConnectedUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SocketService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
