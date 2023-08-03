
  import { Component, OnInit, Inject } from '@angular/core';
  import { EtablissementService } from '../../service/etablissement.service';
  import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { AddEtablissementComponent } from '../../etablissement/add-etablissement/add-etablissement.component';
  
  @Component({
    selector: 'app-list-etablissement',
    templateUrl: './list-etablissement.component.html',
    styles: [
    ]
  })
  export class ListEtablissementComponent implements OnInit {
    Etablissement :any;
    SearchText:any;
    p :number = 1;
    constructor(public crudApi: EtablissementService, public toastr: ToastrService,
      private router: Router, public fb: FormBuilder,
      private matDialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<AddEtablissementComponent>,) { }
  
    ngOnInit() {
  
      this.getData();
    }
  
    getData() {
      this.crudApi.getAll().subscribe(
        response => {
          this.crudApi.list = response;
        }
      );
    }
  
    removeData(id: number) {
      if (window.confirm('Are sure you want to delete this Etablissement ?')) {
        this.crudApi.deleteData(id)
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
      this.crudApi.choixmenu = "M";
      this.crudApi.formData = this.fb.group(Object.assign({}, item));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "70%";
  
      this.matDialog.open(AddEtablissementComponent, dialogConfig);
    }
    addEtablissement() {
      this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "70%";
      this.matDialog.open(AddEtablissementComponent, dialogConfig);
    }
  
  }
  
