import { Component, OnInit } from '@angular/core';
import { Bean } from '../models/bean';
import { BeanService } from '../services/bean.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beanOfTheDay: Bean;
  constructor(private notificationService: NotificationService, private beanService : BeanService) { }

  ngOnInit(): void {
    this.beanService.GetBeanOfTheDay().subscribe(result => this.beanOfTheDay = result, error => this.notificationService.sendError(error.error.message));
  }

}
