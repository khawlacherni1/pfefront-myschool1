import { Component, OnInit, Inject } from '@angular/core';
import { HoraireService } from '../../service/horaire.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddHoraireComponent } from '../../emploi/add-horaire/add-horaire.component';
@Component({
  selector: 'app-list-horaire',
  templateUrl: './list-horaire.component.html',
  styles: [
  ]
})
export class ListHoraireComponent implements OnInit {

  p :number = 1;
  Horaire :any;
  SearchText:any;
  constructor(public crudApi: HoraireService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddHoraireComponent>,) { }

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
    if (window.confirm('Are sure you want to delete this Horaire ?')) {
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
    dialogConfig.width = "50%";

    this.matDialog.open(AddHoraireComponent, dialogConfig);
  }
  addHoraire() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddHoraireComponent, dialogConfig);
  }
}
