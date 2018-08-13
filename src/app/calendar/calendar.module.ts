import 'flatpickr/dist/flatpickr.css';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot()
  ],
  declarations: [ CalendarComponent ],
  exports: [ CalendarComponent ]
})
export class CalendarioModule {}
