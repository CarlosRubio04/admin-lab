import { 
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Input, 
  Output, 
  EventEmitter,
  TemplateRef 
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { 
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';


@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  colors: any = {
    red: {
      primary: '#EF462F',
      secondary: '#EF462F'
    },
    blue: {
      primary: '#7AC1F7',
      secondary: '#7AC1F7'
    },
    orange: {
      primary: '#FBB03F',
      secondary: '#FBB03F'
    },
    purple: {
      primary: '#788EC7',
      secondary: '#788EC7'
    }
  };

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  view: string = 'week';

  viewDate: Date = new Date('08 13 2018');

  events: CalendarEvent[] = [
  	{
      title: 'Campamento Educativo',
      color: this.colors.purple,
      start: new Date('08 13 2018 08:00'),
      end: new Date('08 13 2018 10:00'),
      cssClass: 'directivos',
      meta: {
         id: 1,
         cupos: 20,
         insc: 'libre'
      },
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'sm' });
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
}
