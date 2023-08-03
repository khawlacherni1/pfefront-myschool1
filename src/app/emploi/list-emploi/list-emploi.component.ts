


  import { Component, OnInit, Inject } from '@angular/core';
  import { EmploiService } from '../../service/emploi.service';
  import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { AddEmploiComponent } from '../../emploi/add-emploi/add-emploi.component';
  @Component({
    selector: 'app-list-emploi',
    templateUrl: './list-emploi.component.html',
    styles: [
    ]
  })
  export class ListEmploiComponent implements OnInit {
    Emploi :any;
    SearchText :any;
    p :number = 1;
    constructor(public service: EmploiService, public toastr: ToastrService,
      private router: Router, public fb: FormBuilder,
      private matDialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<AddEmploiComponent>,) { }
  
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
  
    removeData(id: number) {
      if (window.confirm('Are sure you want to delete this Emploi ?')) {
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
    

    addEmploi() {
      this.service.choixmenu = "A"
      this.router.navigate(['/emploi']);
    }
  
    selectData(item: any) {
  
      this.service.formData = this.fb.group(Object.assign({}, item));
      this.service.choixmenu = "M"
      this.router.navigate(['/emploi']);
    }


  }
  
