import { Component, OnInit,Inject } from '@angular/core';
import { ModreglementService } from '../../service/modreglement.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-modreglement',
  templateUrl: './add-modreglement.component.html',
  styles: [
  ]
})
export class AddModreglementComponent implements OnInit {
  title :any;
  num : any;
  code !: string;
    constructor(public crudApi: ModreglementService, public fb: FormBuilder, public toastr: ToastrService,
      private router: Router,public dialogRef:MatDialogRef<AddModreglementComponent>) { }
      get f() { return this.crudApi.formData.controls }
    ngOnInit() {
  
      if (this.crudApi.choixmenu == "A") 
      {
         this.infoForm();
         this.title ="Ajout Mode Réglement";
     }
     else
     {
      this.title ="Modification Mode Réglement";
     }
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
    this.router.navigate(['/modreglements']);
  }
  
    addData() {
      
      this.crudApi.createData(this.crudApi.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.crudApi.getAll().subscribe(
            response =>{this.crudApi.list = response;}
           );                                            
          this.router.navigate(['/modreglements']);
        });
    }
    updateData() {
      this.crudApi.updatedata(this.crudApi.formData.value.code, this.crudApi.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.crudApi.getAll().subscribe(
            response =>{this.crudApi.list = response;}
           );
          this.router.navigate(['/modreglements']);
        });
    }
  
}








 

