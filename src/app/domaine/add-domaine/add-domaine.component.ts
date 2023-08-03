import { Component, OnInit } from '@angular/core';
import { DomaineService } from '../../service/domaine.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-add-domaine',
  templateUrl: './add-domaine.component.html',
  styles: [
  ]
})
export class AddDomaineComponent implements OnInit {
title : any;
num : any;
code !: string;
    constructor(public crudApi: DomaineService, public fb: FormBuilder, public toastr: ToastrService,
      private router: Router,public dialogRef:MatDialogRef<AddDomaineComponent>) { }
      get f() { return this.crudApi.formData.controls }
    ngOnInit() {
  
      if (this.crudApi.choixmenu == "A") 
      { this.infoForm() 
      this.onSelectCode();
      this.title ="Ajout Domaine"}
      else
      {
        this.title ="Modification Domaine"
      };
    }
  
    onSelectCode() {
      
      this.crudApi.getNumero().subscribe(
        response => {
        
          this.num = response;
          this.code = ( 1000 + this.num +1).toString().substring(1);
        
          this.f['code'].setValue(this.code);
        }
      );
    }
  
    infoForm() {
      this.crudApi.formData = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
      });
    }
    ResetForm() {
      this.crudApi.formData.reset();
    }
    onSubmit() {
     
        if (this.crudApi.choixmenu == "A") {
          this.addData();
        }
        else {
    
          this.updateData()
        }
    
    
    }
  
  lister()
  {
    this.router.navigate(['/domaines']);
  }
  
    addData() {
      
      this.crudApi.createData(this.crudApi.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.crudApi.getAll().subscribe(
            response =>{this.crudApi.list = response;}
           );                                            
          this.router.navigate(['/domaines']);
        });
    }
    updateData() {
      this.crudApi.updatedata( this.crudApi.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.crudApi.getAll().subscribe(
            response =>{this.crudApi.list = response;}
           );
          this.router.navigate(['/domaines']);
        });
    }
  
}
