import { Component, OnInit,Inject } from '@angular/core';
  import { NationaliteService } from '../../service/nationalite.service';
  import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
  import { AddNationaliteComponent } from '../../nationalite/add-nationalite/add-nationalite.component';

@Component({
  selector: 'app-list-nationalite',
  templateUrl: './list-nationalite.component.html',
  styles: [
  ]
})
export class ListNationaliteComponent implements OnInit {
  p :number = 1;
  Nationalite :any;
  SearchText:any;
  constructor(public crudApi: NationaliteService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddNationaliteComponent>,) { }

  ngOnInit() {
    
    this.getData();
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.list = response; 
    }
    );
  }

  removeData(code: string) {
    if (window.confirm('Are sure you want to delete this Catégorie ?')) {
      this.crudApi.deleteData(code)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item : any) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddNationaliteComponent, dialogConfig);
  }
  addNationalite()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      this.matDialog.open(AddNationaliteComponent, dialogConfig);
    }

}

