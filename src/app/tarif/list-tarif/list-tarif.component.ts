import { Component, OnInit,Inject } from '@angular/core';
  import { TarifService } from '../../service/tarif.service';
  import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
  import { AddTarifComponent } from '../../tarif/add-tarif/add-tarif.component';

@Component({
  selector: 'app-list-tarif',
  templateUrl: './list-tarif.component.html',
  styles: [
  ]
})
export class ListTarifComponent implements OnInit {
  Tarif !: any;
  SearchText:any;
  constructor(public crudApi: TarifService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddTarifComponent>,) { }

  ngOnInit() {
    
    this.getData();
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.list = response; 
    }
    );
  }

  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Tarif ?')) {
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
  selectData(item : any) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="70%";
    
    this.matDialog.open(AddTarifComponent, dialogConfig);
  }
  addTarif()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="70%";
      this.matDialog.open(AddTarifComponent, dialogConfig);
    }

}

