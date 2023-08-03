import { Component, OnInit, Inject } from '@angular/core';
import { BanqueService } from '../../service/banque.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddBanqueComponent } from '../../banque/add-banque/add-banque.component';
@Component({
  selector: 'app-list-banque',
  templateUrl: './list-banque.component.html',
  styles: [
  ]
})
export class ListBanqueComponent implements OnInit {
  Banque :any;
  SearchText :any;
  p :number = 1;
  constructor(public crudApi: BanqueService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddBanqueComponent>,) { }

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
    if (window.confirm('Are sure you want to delete this Banque ?')) {
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

    this.matDialog.open(AddBanqueComponent, dialogConfig);
  }
  addBanque() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddBanqueComponent, dialogConfig);
  }
}
