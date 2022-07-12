import { Component, Inject, OnInit, Optional } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  // formsubject: any;
  // formmarks: any;
myprop!:string;

  constructor(private dialog:MatDialog,
     @Inject(MAT_DIALOG_DATA)public data:any,private employeeService:EmployeeService) { 
    }



  ngOnInit(): void {
  // console.log(this.data)
  }
  deleteSub(id:number){
    // this.data.filter(item => item.id != id);
   this.employeeService.deleteSubject(id).subscribe(data1=>{
     console.log(data1);
     })
     const item = this.data.find(item => item.id === id);
     this.data.splice(this.data.indexOf(item));
    }


}
