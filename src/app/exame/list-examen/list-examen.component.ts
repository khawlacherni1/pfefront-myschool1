import { Component, OnInit, Inject } from '@angular/core';
import { ExamenService } from '../../service/examen.service';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddExamenComponent } from '../../exame/add-examen/add-examen.component';
  
  @Component({
    selector: 'app-list-examen',
    templateUrl: './list-examen.component.html',
    styles: [
    ]
  })
  export class ListExamenComponent {
 
      Examen :any;
      SearchText:any;
      p :number = 1;
      constructor(public service: ExamenService, public toastr: ToastrService,
        private router: Router, public fb: FormBuilder,
        private matDialog: MatDialog,public userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddExamenComponent>,) { }
    
      ngOnInit() {
    
        this.getData();
      }
    
      getData() {
        this.service.getAll().subscribe(
          response => {
            this.service.list = response;
          }
        );
      }
    
      removeData(id : number) {
        if (window.confirm('Are sure you want to delete this Examen ?')) {
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
    
        this.matDialog.open(AddExamenComponent, dialogConfig);
      }
      addExamen() {
        this.service.choixmenu = "A";
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "80%";
        //dialogConfig.data="gdddd";
        this.matDialog.open(AddExamenComponent, dialogConfig);
      }
    }
    
    
    
    
      
    
    
    
    
    