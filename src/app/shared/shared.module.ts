import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    // angular
    CommonModule,

    // material
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    // angular
    CommonModule,

    // material
    MatIconModule,
    MatButtonModule,

    // other
    LoadingSpinnerComponent,
  ],
  providers: [],
  entryComponents: [],
})
export class SharedModule {}
