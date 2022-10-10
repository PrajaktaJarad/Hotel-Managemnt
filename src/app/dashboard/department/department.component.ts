import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Department} from 'src/app/model/department';
import { DepartmentService } from 'src/app/services/department.service';



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments!: Department[];
  formValue!: FormGroup

  departmentModelObject: Department = new Department;
  showAdd!: boolean;
  showBtn!: boolean;
  alldepartmentnData: any;;
  

  constructor(private formBuilder: FormBuilder,private departmentService:DepartmentService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        department_id: [''],
        department_name: [''],
      
      }
    )
    this.getDepartments();
  }


clickAddDepartment()
{
  this.formValue.reset();
  this.showAdd=true;
  this.showBtn=false;
}

getDepartments()
{
  this.departmentService.getAllDepartment().subscribe((department: Department[])=>
  {
    console.log(department);
    this.departments= department;
  });
}

//subscribe
addDepartment() {
  this.departmentModelObject.department_id=this.formValue.value.department_id;
  this.departmentModelObject.department_name= this.formValue.value.department_name;
  this.departmentService.postDepartment(this.departmentModelObject).subscribe((res:any[]) => {
    console.log(res);
    alert("New record Added");
    this.formValue.reset();
    this.getDepartments();
  }
    , err => {
      alert("Error Occured");
    })
}




//delete
deleteDepartment(data:any)

{   this.departmentService.deleteDepartment(data.department_id).subscribe((res:any[])=>{
    console.log(res);
    alert("Record Deleted");
    this.formValue.reset();
    this.getDepartments();
  })
  if(confirm("delete the record of id "+data.department_id))
  {
    console.log("delete");
  }
}

// onEditDep(staff:Staff) {
//   this.formValue.controls['empId'].setValue(staff.empId);
//   this.formValue.controls['empDeptId'].setValue(staff.empDeptId);
//   this.formValue.controls['empName'].setValue(staff.empName);
//   this.formValue.controls['empDeptName'].setValue(staff.empDeptName);
//   this.formValue.controls['email'].setValue(staff.email);
//   this.formValue.controls['empSalary'].setValue(staff.empSalary);
// }

//edit
onEditDepartment(data:Department)
{
  
 // this.departmentModelObject.department_id = data.department_id;
  this.formValue.controls['department_id'].setValue(data.department_id);
  this.formValue.controls['department_name'].setValue(data.department_name);
  

}

updateDepartment()
{
  // this.departmentModelObject.
  // this.departmentModelObject.department_id = data.department_id;
  // this.formValue.controls['department_name'].setValue(data.department_name);
 
   this.departmentModelObject.department_id= this.formValue.value.department_id;
   this.departmentModelObject.department_name= this.formValue.value.department_name;
   this.departmentService.updateDepartment(this.departmentModelObject, this.departmentModelObject.department_id).subscribe(data=>{
    console.log(data);
    alert("Updateed records")
    this.getDepartments();
   })
  }
 
  

//   this.departmentService.updateDepartment(this.departmentModelObject,this.departmentModelObject.department_name)
//   .subscribe((res:any[])=>{
//     alert("Record Updated");
//     this.getDepartments();
//   });
// }

// updateStaffs() {
//   this.sta.empId = this.formValue.value.empId;
//   this.sta.empDeptId = this.formValue.value. empDeptId;
//   this.sta.empName = this.formValue.value.empName;
//   this.sta.empDeptName = this.formValue.value.empDeptName; 
//   this.sta.email = this.formValue.value.email; 
//   this.sta.empSalary = this.formValue.value.empSalary; 
//   this.staffService.updateStaffList(this.sta).subscribe(data => {
//     console.log(data);
//     alert("Updated Staff")
//     this.getstaffs();
    
//   })
// }
  
  
  

}