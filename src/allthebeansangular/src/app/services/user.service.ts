import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser : BehaviorSubject<User>;
  public User : Observable<User>;
  constructor(private http : HttpClient) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("User")));
    this.User = this.currentUser.asObservable();
   }

   public get GetCurrentUser(): User {
     return this.currentUser.value;
   }

   public get LoggedIn(): boolean {
     return this.currentUser.value != null;
   }

   login(username : string, password : string) : Observable<User>{
     return this.http.post<any>(environment.apiUrl + 'api/User/Login', {username, password}).pipe(map(user => {
       localStorage.setItem("User", JSON.stringify(user));
       this.currentUser.next(user);
       return user;
     }, error => {
       return error;
     }));
   }

   logout() {
     localStorage.removeItem("User");
     this.currentUser.next(null);
   }

   register( username : string, password : string, email : string) {
    return this.http.post<any>(environment.apiUrl + 'api/User/Register', {username, password, email}).pipe(map(user => {
      localStorage.setItem("User", JSON.stringify(user));
      this.currentUser.next(user);
      return user;
    }, error => {
      return error;
    }));
   }
}
