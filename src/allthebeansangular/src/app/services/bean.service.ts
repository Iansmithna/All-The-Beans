import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { AddBean } from '../models/add-bean';
import { Bean } from '../models/bean';

@Injectable({
  providedIn: 'root'
})
export class BeanService {

  constructor(private http: HttpClient) { }

  GetBeanOfTheDay(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "api/Bean/BeanOfTheDay");
  }

  GetAll(): Observable<Bean[]> {
    return this.http.get<Bean[]>(environment.apiUrl + "api/Bean");
  }

  AddBean(bean : AddBean): Observable<Bean> {
    return this.http.post<Bean>(environment.apiUrl + "api/Bean", bean);
  }

  EditBean(bean : Bean, id : number): Observable<any> {
    return this.http.put(environment.apiUrl + "api/Bean/" + id, bean);
  }

  DeleteBean(id : number): Observable<any> {
    return this.http.delete(environment.apiUrl + "api/Bean/" + id, {observe: 'response'});
  }

  GetBean(id : number): Observable<Bean> {
    return this.http.get<Bean>(environment.apiUrl + "api/Bean/" + id);
  }

  onImageChange(files, onLoad){
    if(files)
    {
      var file = files.target.files[0];
      var reader = new FileReader();
      reader.onload = onLoad;
      
      reader.readAsBinaryString(file);
    }
    else
    {
      return of();
    }
  }

  getDayOfWeek(dayNum : number){
    switch(dayNum){
      case 1: return "Monday";
      case 2: return "Tuesday";
      case 3: return "Wednesday";
      case 4: return "Thursday";
      case 5: return "Friday";
      case 6: return "Saturday";
      case 7: return "Sunday";
    }
  }
}
