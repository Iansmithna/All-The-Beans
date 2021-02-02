import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bean } from '../models/bean';
import { BeanService } from '../services/bean.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  day       : number;
  beans     : Bean[];

  constructor(private notificationService : NotificationService,private beanService : BeanService,private router : Router) { }

  ngOnInit(): void {
    this.day = new Date().getDay();
    this.beanService.GetAll().subscribe(result => this.beans = result, error => console.error(error));
  }

  onEditBean(id : number){
    this.router.navigate(['/dashboard/edit/', id]);
  }

  onDeleteBean(id : number){
    this.beanService.DeleteBean(id).subscribe(result => {
      if(result.status == '200'){
        this.beans.forEach((bean, index) => {
          if(bean.id == id)
          {
            this.beans.splice(index, 1);
            this.notificationService.sendError(bean.name + " has been deleted");
            return
          }
        });
      }
    })
  }

}
