import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Bean } from 'src/app/models/bean';
import { BeanService } from 'src/app/services/bean.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-edit-bean',
  templateUrl: './edit-bean.component.html',
  styleUrls: ['./edit-bean.component.css']
})
export class EditBeanComponent implements OnInit {

  editForm  : FormGroup;

  id        : number;
  imageSource : string;
  DayOfWeek : number;
  formSubmitted : boolean;
  bean : Observable<Bean>;
  active: boolean;
  
  error   : string;
  constructor(private notificationService: NotificationService, private router : Router, private route : ActivatedRoute, private beanService : BeanService) {
   }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      id      : new FormControl(''),
      name    : new FormControl(''),
      aroma   : new FormControl(''),
      colour  : new FormControl(''),
      cost    : new FormControl(''),
      dayOfWeek : new FormControl(''), 
      Image   : new FormControl(''),
      active  : new FormControl('')
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.bean = this.beanService.GetBean(this.id).pipe(tap(bean => {
        this.editForm.patchValue(bean);
        this.imageSource = bean.image;
        this.DayOfWeek = bean.dayOfWeek;
        this.active = bean.activated;
        this.editForm.patchValue({active: bean.activated? 1: 2});
      }));
    });
  }

  onImageChange(event) {
    this.beanService.onImageChange(event, (incomingEvent) => {
      this.imageSource = "data:image/jpeg;base64," + btoa(incomingEvent.target.result as string);
    });
  }

  onSelectItemChange(val){
    this.DayOfWeek = Number(val);
  }

  onSubmit(){
    this.formSubmitted = true;
    if(this.name.invalid || this.aroma.invalid || this.colour.invalid || this.cost.invalid || this.imageSource == null || this.DayOfWeek == null){
      return;
    }
    
    
    var bean : Bean = {
      id : this.id,
      name : this.editForm.get('name').value + '',
      aroma : this.editForm.get('aroma').value + '',
      colour : this.editForm.get('colour').value + '',
      cost : this.editForm.get('cost').value,
      image : this.imageSource,
      dayOfWeek : this.DayOfWeek,
      activated: this.active
    };

    this.beanService.EditBean(bean, bean.id).subscribe(result => {
      try{  
        if(result.name == bean.name)
        {
          this.router.navigate(['/dashboard']);
          
          this.notificationService.sendSuccess(bean.name + " has been saved successfully");
        }
      }
      catch
      {
        //error occured
          this.notificationService.sendError("An error occured while editing the bean.");
      }
    }, error => console.warn(error));
  }

  onActiveItemChange(val){
    if(val == 1)
    {
      this.active = true;
    }
    else
    {
      this.active = false;
    }

  }

  get name() { return this.editForm.get('name'); }
  get aroma() { return this.editForm.get('aroma'); }
  get colour() { return this.editForm.get('colour'); }
  get cost() { return this.editForm.get('cost'); }
  get imageSourceField() { return this.editForm.get('Image'); }
  get dayOfWeekField() { return this.editForm.get('dayOfWeek'); }
}
