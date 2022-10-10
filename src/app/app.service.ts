import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from './model/user';

@Injectable({
    providedIn: 'root'
  })

  export class AppService{

    constructor(private http:HttpClient) { }
    
    
    loggedIn = new BehaviorSubject<boolean>(false);

    getAllUsers(){
      return this.http.get("http://localhost:8081/getAllUsers");
    }


    addUser(user: User) {

     // console.log(user.allGuest);
  
      return this.http.post<User>("http://localhost:8081/adduser", user);
  
    }
    

    
  //update
  // updateDepartment(department:any, department_id:string)
  // {
  //   return this.httpClient.put<any>("http://localhost:8081/updatedept/"+department_id,department).pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }

   updateUser(user:any, userId:number)
   {
     return this.http.put<any>("http://localhost:8081/updateuser/"+userId,user).pipe(map((res:any)=>{
       return res;
     }))
   }

  deleteUser(userId:number)
   {
     return this.http.delete<any>("http://localhost:8081/deleteuser/"+userId).pipe(map((res:any)=>{
       return res;
     }))
   }

  }