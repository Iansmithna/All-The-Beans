import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeanService } from 'src/app/services/bean.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-bean',
  templateUrl: './add-bean.component.html',
  styleUrls: ['./add-bean.component.css']
})
export class AddBeanComponent implements OnInit {

  addForm : FormGroup;
  error   : string;
  imageSource : string;
  formSubmitted : boolean;
  DayOfWeek : number;
  active: boolean;
  constructor(private notificationService: NotificationService, private beanService : BeanService, private router : Router) { }

  ngOnInit(): void {
    this.formSubmitted = false;
    this.addForm = new FormGroup({
      Name          : new FormControl('', [Validators.required]),
      Aroma         : new FormControl('', [Validators.required]),
      Colour        : new FormControl('', [Validators.required]),
      Cost          : new FormControl('', [Validators.required]),
      Image         : new FormControl('', [Validators.required]),
      DayOfWeek     : new FormControl('', [Validators.required]),
      active        : new FormControl('2', [Validators.required])
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
    
    var bean = {
      Name : this.addForm.get('Name').value,
      Aroma : this.addForm.get('Aroma').value,
      Colour : this.addForm.get('Colour').value,
      Cost : this.addForm.get('Cost').value,
      Activated : this.active,
      Image : this.imageSource,
      DayOfWeek : this.DayOfWeek
    };

    this.beanService.AddBean(bean).subscribe(result => {
      try{  
        if(result.name == bean.Name)
        {
          this.router.navigate(['/dashboard']);
          
          this.notificationService.sendSuccess(bean.Name + " has been saved successfully");
        }
      }
      catch
      {
        //error occured
        console.warn("some error occured");
      }
    }, error => console.warn(error));
  }

  onActiveItemChange(val){
    if(val == 1)
    {
      console.log("true");
      this.active = true;
    }
    else
    {
      console.log("false");
      this.active = false;
    }

  }

  get name() { return this.addForm.get('Name'); }
  get aroma() { return this.addForm.get('Aroma'); }
  get colour() { return this.addForm.get('Colour'); }
  get cost() { return this.addForm.get('Cost'); }
  get imageSourceField() { return this.addForm.get('Image'); }
  get dayOfWeekField() { return this.addForm.get('DayOfWeek'); }
}
