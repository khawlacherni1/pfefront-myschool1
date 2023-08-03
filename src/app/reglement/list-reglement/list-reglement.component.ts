import { Component, OnInit, Inject } from '@angular/core';
import { ReglementService } from '../../service/reglement.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddReglementComponent } from '../../reglement/add-reglement/add-reglement.component';
import { RecuComponent } from '../../reglement/recu/recu.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
@Component({
  selector: 'app-list-reglement',
  templateUrl: './list-reglement.component.html',
  styles: [
  ]
})
export class ListReglementComponent implements OnInit {
  Reglement :any;
  SearchText:any;
  p :number = 1;
  reglementForm !: FormGroup;
  constructor(public service: ReglementService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddReglementComponent>,) { }
  ngOnInit() {
  this.getData();
  this.reglementForm = this.fb.group({
    'date1': ['', Validators.required],
    'date2': ['', Validators.required]
  });
  }

  getData() {
    this.service.getAll().subscribe(
      response => {
        this.service.list = response;
      }
    );
  }

  listReglement() {
    const val = this.reglementForm.value;
    this.service.list= [];
  this.service.getReglement(val.date1, val.date2).subscribe(
    response => {
      this.service.list = response;
    }
  );
}
  removeData(code: string) {
    if (window.confirm('Are sure you want to delete this Catégorie ?')) {
      this.service.deleteData(code)
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

    this.matDialog.open(AddReglementComponent, dialogConfig);
  }
  addReglement() {
    this.service.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(AddReglementComponent, dialogConfig);
  }
  recu(id: number) {
    this.service.choixmenu = "R";
    this.service.id = id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(RecuComponent, dialogConfig);
  }
}

