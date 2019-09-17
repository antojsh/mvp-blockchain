import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HashGeneratorPageComponent } from './hash-generator-page.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [HashGeneratorPageComponent],
  exports:[
    HashGeneratorPageComponent
  ]
})
export class HashGeneratorPageModule { }
