import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../form/form.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../employee.service'



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  data: Student[] ;
 
  id: any;
  totalElements: number = 0;
  
   request = {};
  //table
  displayedColumns = [
    'id',
    'name',
    'address',
    'gender',
    'hobbie',
    'cars',
    'date',
    'file',
    'action',
  ];
 

  //paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Student>( );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private employeeService:EmployeeService
  ) {
    this.route.params.subscribe((data) => {
      console.log(data);
    });
  }


  ngOnInit(): void {
    this.getProducts({page:1,size:2});
  
  }
  
  getEmployee(){
    this.getProducts(this.request);
  }
  updateEmployee(id:number){
    if(id){
      this.router.navigate(['/form'],{queryParams:{id:id}});

    }
    else{
      this.router.navigate(['/form']);
    }
  }
  deleteEmployee(id:number){

    this.employeeService.deleteEmployee(id).subscribe(data1=>{
      console.log(data1);
      this.getEmployee();
     
    })
  }

  employeeDetails(id:number){
    this.router.navigate(['employee-details',id]);
  }

  view(subject: any,name) {
    subject.uname=name
      this.dialog.open(DialogComponent, {
        data: subject
      });
  } 
 //paginator
   private getProducts(request) {
    this.employeeService.getEmployeeListPage(request)
    .subscribe(data => {
      this.data = data['content'];
          this.totalElements = data['totalElements'];
    }
    , error => {
      console.log(error.error.message);
    }
    );
  }

   nextPage(event:PageEvent){
    this.request['page'] = event.pageIndex.toString();
    this.request['size'] = event.pageSize.toString();
   
    this.getProducts(this.request);
   }

    //searchBar
    search() {
      //  let searchobj = JSON.parse(localStorage.getItem('formdata') as any);
      //  let i = searchobj.findIndex((x: { id: any }) => x.id === this.id);
  
       if (this.id == '') {
         this.ngOnInit();
       } else {
         this.data = this.data.filter((res) => {
         return res.id.toLocaleString().match(this.id.toLocaleLowerCase());
        });
       }
     }
  }

//   delete(id){
//     for(let i=0; i < this.data.length;i++){
//       if(this.data[i].id==id){
//     this.data.splice(i,1);
//     localStorage.setItem('formdata',JSON.stringify(this.data));
//    this.data = this.data.slice();
//   }
// }
//  }


//   edit(id: any) {
//     this.router.navigate(['/form', id]);
//     JSON.parse(localStorage.getItem('formdata') as any);
//   }

//   view(subAry: any) {
//     this.dialog.open(DialogComponent, {
//       data: subAry,
//     });
//   }


