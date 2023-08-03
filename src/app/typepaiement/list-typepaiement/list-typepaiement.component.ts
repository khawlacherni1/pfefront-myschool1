import { Component, OnInit, Inject } from '@angular/core';
import { TypepaiementService } from '../../service/typepaiement.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTypepaiementComponent } from '../../typepaiement/add-typepaiement/add-typepaiement.component';

@Component({
  selector: 'app-list-typepaiement',
  templateUrl: './list-typepaiement.component.html',
  styles: [
  ]
})
export class ListTypepaiementComponent implements OnInit {
  typepaiement !: any;
  SearchText:any;
  constructor(public service: TypepaiementService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTypepaiementComponent>,) { }

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
    if (window.confirm('Are sure you want to delete this typepaiement ?')) {
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
    dialogConfig.width = "70%";

    this.matDialog.open(AddTypepaiementComponent, dialogConfig);
  }
  addTypepaiement() {
    this.service.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(AddTypepaiementComponent, dialogConfig);
  }
}

