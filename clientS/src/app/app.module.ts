import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
