import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { HashGeneratorPageModule } from '../hash-generator-page/hash-generator-page.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HashGeneratorPageModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page],
  providers:[]
})
export class Tab1PageModule {}
