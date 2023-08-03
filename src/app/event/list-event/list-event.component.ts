


  import { Component, OnInit, Inject } from '@angular/core';
  import { EventService } from '../../service/event.service';
  import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';
  import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { UserService } from '../../service/user.service';
  import { FormBuilder, FormControl }  from '@angular/forms';
  import { AddEventComponent } from '../../event/add-event/add-event.component';
  @Component({
    selector: 'app-list-event',
    templateUrl: './list-event.component.html',
    styles: [
    ]
  })
  export class ListEventComponent implements OnInit {
    event: any;
    p: number = 1;
    SearchText:any;
    code: number = 0;
    control: FormControl = new FormControl('');
    constructor(public service: EventService, public toastr: ToastrService,
      private router: Router, public fb: FormBuilder,
      private matDialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public userService: UserService,
      public dialogRef: MatDialogRef<AddEventComponent>,) { }
  
    ngOnInit() {
  
        this.getData();
  
      }
  
 
    addEvent() {
      this.service.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "80%";
      //dialogConfig.data="gdddd";
      this.matDialog.open(AddEventComponent, dialogConfig);
    }
  
  
  
  
    getData() {
      
      this.service.getAll().subscribe(
        response => {
          
          this.service.list = response;
        }
      );
  
    }
  
  
  
   
  
    removeData(id: number) {
      if (window.confirm('Are sure you want to delete this event ?')) {
        this.service.deleteData(id)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning(' data successfully deleted!');
              
                this.getData();
              
            },
            error => console.log(error));
      }
    }
    selectData(item: any) {
      this.service.choixmenu = "M";
      this.service.formData = this.fb.group(Object.assign({}, item));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "80%";
  
      this.matDialog.open(AddEventComponent, dialogConfig);
    }
    
  }
  
