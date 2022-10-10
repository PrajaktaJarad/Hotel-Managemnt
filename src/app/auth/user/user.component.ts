import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Department } from 'src/app/model/department';
import { User } from 'src/app/model/user';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }

 users:User[];
 departments!: Department[];

  formValue!: FormGroup

  userModelObject:User=new User;
  departmentModelObject: Department = new Department;

  showAdd!: boolean;
  showBtn!: boolean;

  allusersData:any;
  alldepartmentnData: any;;
  

  constructor(private formBuilder: FormBuilder,private departmentService:DepartmentService,private appService:AppService) { }

  ngOnInit(): void {
    // this.formValue = this.formBuilder.group(
    //   {
    //     department_id: [''],
    //     department_name: [''],
      
    //   }
    // )
    // this.getDepartments();

    this.formValue = this.formBuilder.group(
      {
        userId:[''],
        username: [''],
        password: [''],
        role:['']
      
      }
    )
    this.getUsers();
  }


// clickAddDepartment()
// {
//   this.formValue.reset();
//   this.showAdd=true;
//   this.showBtn=false;
// }

clickAddUser()
{
  this.formValue.reset();
  this.showAdd=true;
  this.showBtn=false;
}

// getDepartments()
// {
//   this.departmentService.getAllDepartment().subscribe((department: Department[])=>
//   {
//     console.log(department);
//     this.departments= department;
//   });
// }

getUsers()
{
  this.appService.getAllUsers().subscribe((user: User[])=>
  {
   // console.log(department);
    this.users= user;
  });
}

//subscribe
// addDepartment() {
//   this.departmentModelObject.department_id=this.formValue.value.department_id;
//   this.departmentModelObject.department_name= this.formValue.value.department_name;
  
//   this.departmentService.postDepartment(this.departmentModelObject).subscribe((res:any[]) => {
//     console.log(res);
//     alert("New record Added");
//     this.formValue.reset();
//     this.getDepartments();
//   }
//     , err => {
//       alert("Error Occured");
//     })
// }

addUser() {
  this.userModelObject.userId=this.formValue.value.userId;
  this.userModelObject.username=this.formValue.value.username;
  this.userModelObject.password= this.formValue.value.password;
  this.userModelObject.role= this.formValue.value.role;
  
  this.appService.addUser(this.userModelObject).subscribe((res:User) => {
    console.log(res);
    alert("New record Added");
    this.formValue.reset();
    this.getUsers();
  }
    , err => {
      alert("Error Occured");
    })
}



// //delete
deleteUser(data:any)

 {

   this.appService.deleteUser(data.userId).subscribe((res:any[])=>{
     console.log(res);
     alert("Record Deleted");
     this.formValue.reset();
     this.getUsers();
   })
   if(confirm("delete the record of id "+data.userId))
   {
     console.log("delete");
   }
 }


// //edit
// onEditDepartment(data:any)
// {
  
//   this.departmentModelObject.department_id = data.department_id;
//   this.formValue.controls['department_name'].setValue(data.department_name);
  
 onEditUser(data:User)
 {
  
   this.userModelObject.userId = data.userId;
   this.formValue.controls['userId'].setValue(data.userId);
   this.formValue.controls['username'].setValue(data.username);
   this.formValue.controls['password'].setValue(data.password);
   this.formValue.controls['role'].setValue(data.role);
  

 }

// updateDepartment()
// {
//   // this.departmentModelObject.
//   // this.departmentModelObject.department_id = data.department_id;
//   // this.formValue.controls['department_name'].setValue(data.department_name);
 
//    this.departmentModelObject.department_id= this.formValue.value.department_id; 
//   console.log(this.departmentModelObject)
//   this.departmentService.updateDepartment(this.departmentModelObject,this.departmentModelObject.department_name)
//   .subscribe((res:any[])=>{
//     alert("Record Updated");
//     this.getDepartments();
//   });
// }


 updateUser()
 {
  
    this.userModelObject.userId= this.formValue.value.userId; 
    this.userModelObject.userId=this.formValue.value.userId;
    this.userModelObject.username=this.formValue.value.username;
    this.userModelObject.password= this.formValue.value.password;
    this.userModelObject.role= this.formValue.value.role;
    
   console.log(this.userModelObject)
   this.appService.updateUser(this.userModelObject,this.userModelObject.userId)
   .subscribe((res:any[])=>{
     alert("Record Updated");
     this.getUsers();
   });
 }
  
  
  
}
