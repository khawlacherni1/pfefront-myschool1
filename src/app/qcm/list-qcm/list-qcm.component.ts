import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QcmService } from '../../service/qcm.service';
import { UserService } from '../../service/user.service';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Component({
  selector: 'app-list-qcm',
  templateUrl: './list-qcm.component.html',
  styles: [
  ]
})
export class ListQcmComponent implements OnInit {
  p :number = 1;
  QcmListe:any;
  SearchText :any;
  constructor( public service :QcmService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,public userService :UserService,
    private datePipe : DatePipe) { }

  ngOnInit() {
    
    this.refreshListe();
    
  }
refreshListe(){
  this.service.getAll().subscribe(
    response =>{this.QcmListe = response;}
   );

}


removeData(id: any) {
  if (window.confirm('Are sure you want to delete this Cours ?')) {
    this.service.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.warning(' data successfully deleted!');
          this.refreshListe();
        },
        error => console.log(error));
  }
}
newQcm()
  {
    this.service.choixmenu ="A"
  this.router.navigate(['/qcm']);
  }

selectData(item :any){
  
  this.service.formData = this.fb.group(Object.assign({},item));
  this.service.choixmenu ="M"
  this.router.navigate(['/qcm']);
}
}
