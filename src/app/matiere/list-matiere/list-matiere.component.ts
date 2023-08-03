import { Component, OnInit, Inject } from '@angular/core';
import { MatiereService } from '../../service/matiere.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMatiereComponent } from '../../matiere/add-matiere/add-matiere.component';

@Component({
  selector: 'app-list-matiere',
  templateUrl: './list-matiere.component.html',
  styles: [
  ]
})
export class ListMatiereComponent implements OnInit {
  p :number = 1;
  Matiere :any;
  SearchText:any;
  constructor(public crudApi: MatiereService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMatiereComponent>,) { }

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
    if (window.confirm('Are sure you want to delete this Matiere ?')) {
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

    this.matDialog.open(AddMatiereComponent, dialogConfig);
  }
  addMatiere() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(AddMatiereComponent, dialogConfig);
  }

}




  

