import { Component, OnInit,Inject } from '@angular/core';
  import { CycleService } from '../../service/cycle.service';
  import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
  import { AddCycleComponent } from '../../cycle/add-cycle/add-cycle.component';

@Component({
  selector: 'app-list-cycle',
  templateUrl: './list-cycle.component.html',
  styles: [
  ]
})
export class ListCycleComponent implements OnInit {
  Specialite :any;
  SearchText:any;
  p :number = 1;
  constructor(public crudApi: CycleService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddCycleComponent>,) { }

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
    if (window.confirm('Are sure you want to delete this Cycle ?')) {
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
    
    this.matDialog.open(AddCycleComponent, dialogConfig);
  }
  addCycle()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      this.matDialog.open(AddCycleComponent, dialogConfig);
    }

}

