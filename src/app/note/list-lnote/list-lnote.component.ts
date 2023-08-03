import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from '../../service/note.service';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Component({
  selector: 'app-list-lnote',
  templateUrl: './list-lnote.component.html',
  
})
export class ListLnoteComponent implements OnInit {
  noteListe:any;
  SearchText :any;
  constructor( private service :NoteService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
    
    this.refreshListe();
    
  }
refreshListe(){
  this.service.getAll().subscribe(
    response =>{this.noteListe = response;}
   );

}

  openForEdit(Id:number){
   this.router.navigate(['/notes/modification/'+Id]);
  }

  removeData(id: number) {
    
  }

  onCommandeDelete(id:number){
  
}

selectData(item :any){
  
  this.service.formData = this.fb.group(Object.assign({},item));
  this.service.choixmenu ="M"
  this.router.navigate(['/note']);
}
}

