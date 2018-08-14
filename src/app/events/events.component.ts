import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  event: any = {};
  starDay: Date = new Date();
  endDay: Date = new Date();

  events: any = [];

  modalData: {
    event: any;
  };

  constructor(private modal: NgbModal, private mainService: MainService, public datepipe: DatePipe) { 
    mainService.getEvents().valueChanges().subscribe(events => {
      this.events = events;
    });
  }

  convertStarDay() {
    return this.datepipe.transform(this.starDay, 'MMM d, y, h:mm:ss a');
  }
  convertEndDay() {
    return this.datepipe.transform(this.endDay, 'MMM d, y, h:mm:ss a');
  }

  addEvent() {
    this.event.id = Date.now();
    this.event.start = this.convertStarDay();
    this.event.end = this.convertEndDay();
    this.mainService.saveEvent(this.event);
  }

  editEvent() {
    this.event.start = this.convertStarDay();
    this.event.end = this.convertEndDay();
    this.mainService.editEvent(this.event);
    this.event = {};
  }

  handleEvent(event) {
    this.event = event;
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  ngOnInit() {
  }

}
