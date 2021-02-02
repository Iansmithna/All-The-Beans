import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.css']
})
export class NotificationAreaComponent implements OnInit {

  dangerNotification: Boolean;
  successNotification: Boolean;
  alertText: string;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notificationObservable.subscribe(result => {
      if(result.error)
      {
        this.onDangerNotification(result.message);
      }
      else
      {
        this.onSuccessNotification(result.message);
      }
    });
   }

  ngOnInit(): void {
    this.toggleAll();
  }

  onDangerNotification(msg: string){
    this.alertText = msg;
    this.successNotification = false;
    this.dangerNotification = true;
  }

  
  onSuccessNotification(msg : string){
    this.alertText = msg;
    this.dangerNotification = false;
    this.successNotification = true;
  }

  toggleAll() {
    this.dangerNotification = false;
    this.successNotification = false;
  }

}
