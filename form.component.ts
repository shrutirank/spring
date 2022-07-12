import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl,FormGroup,FormBuilder,FormArray,Validators, FormArrayName } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Student, Subject } from './form.model';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

 
  
 
  data=new Student();
  id:any;

//checkbox
  checkboxJson=[{
    id:1,
    label:'Reading',
    checked:false
},
{
  id:2,
  label:'dancing',
  checked:false
},
{
  id:3,
  label:'playing',
  checked:false
},
{
  id:4,
  label:'Singing',
  checked:false
},
];
constructor(private _snackBar: MatSnackBar,private router:Router,private route : ActivatedRoute,private dialog:MatDialog,
  private employeeService:EmployeeService)    { 
 
}

ngOnInit(): void {
  this.id = this.route.snapshot.queryParams['id'];
  if (this.id) {
    this.employeeService. getEmployeeBYId(this.id).subscribe((response:any) => {
      console.log(response);
      const hobbyAry = response.hobbie.split(',');
      for (let i = 0; i < hobbyAry.length; i++) {
        const index = this.checkboxJson.findIndex(p => p.label == hobbyAry[i]);
        if (index != -1 ) {
          this.checkboxJson[index].checked = true;
        }
      }
      this.data = response;
    });
  }
}
saveEmployee(){
  const selected=this.checkboxJson.filter(p=>p.checked).map(x=>x.label);
  this.data.hobbie=selected.join(',')
if(this.id){
  this.employeeService.updateEmployee(this.id,this.data).subscribe(data1=>{
    console.log(data1)
    this.showdata();
  },error=>console.log(error));

}
else{
  this.employeeService.createEmployee(this.data).subscribe(data1=>{
    console.log(data1)
    this.showdata();
  },error=>console.log(error));
}
 }

//save data
sdata(){


  console.log(this.data);
    this.saveEmployee();
}


showdata(){
  this.router.navigate(['/list']);
}

 addsubject(){
  //this.admins.push(this.admin)
  this.data.subject.push(new Subject())
 }
 deletesubject(i:number){
  //this.admins.removeAt(this.admin)
  // this.data.subAry.pop()
  this.data.subject.splice(i,1)
 }


//snackBar
 openSnackBar() {
   this._snackBar.open("saved succesfully!..");
 }
 
 //file-upload
  public userfile:any=File;
 onSelectfile(event){
    const file=event.target.files[0];
    this.userfile=file;
    
  
 }

}
