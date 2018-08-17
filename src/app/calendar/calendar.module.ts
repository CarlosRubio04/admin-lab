import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'angular-calendar';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CalendarModule.forRoot()
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarioModule { }