import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:() => localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7254"]
      }
    })

  ],
  providers: [
    provideClientHydration(),
    { provide: "baseUrl", useValue: "https://localhost:7254/api", multi: true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
