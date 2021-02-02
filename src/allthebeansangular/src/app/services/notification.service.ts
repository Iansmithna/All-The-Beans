import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationSubject = new Subject<any>();
  notificationObservable = this.notificationSubject.asObservable();

  constructor() { }

  sendError(msg: string) {
    var val = {'message': msg, 'error': true};
    this.notificationSubject.next(val);
  }

  sendSuccess(msg: string) {
    var val = {'message': msg, 'error': false};
    this.notificationSubject.next(val);
  }
}
