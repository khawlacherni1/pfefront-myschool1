import { Component, OnInit, Inject } from '@angular/core';
import { ModreglementService } from '../../service/modreglement.service';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddModreglementComponent } from '../../modreglement/add-modreglement/add-modreglement.component';
@Component({
  selector: 'app-list-modreglement',
  templateUrl: './list-modreglement.component.html',
  styles: [
  ]
})
export class ListModreglementComponent implements OnInit {
  Modreglement :any;
  SearchText:any;
  p :number = 1;
  constructor(public crudApi: ModreglementService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddModreglementComponent>,) { }

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
  selectData(item: any) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddModreglementComponent, dialogConfig);
  }
  addModreglement() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddModreglementComponent, dialogConfig);
  }

}

