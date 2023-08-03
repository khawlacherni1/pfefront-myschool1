import { Component, OnInit } from '@angular/core';
import { TypepaiementService } from '../../service/typepaiement.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-typepaiement',
  templateUrl: './add-typepaiement.component.html',
  styles: [
  ]
})
export class AddTypepaiementComponent implements OnInit {
title :any;
  num : any;
  code !: string;
    constructor(public service: TypepaiementService, public fb: FormBuilder, public toastr: ToastrService,
      private router: Router,public dialogRef:MatDialogRef<AddTypepaiementComponent>) { }
      get f() { return this.service.formData.controls }
    ngOnInit() {
  
      if (this.service.choixmenu == "A") 
      { this.infoForm() 
      this.onSelectCode()
      this.title = "Ajout Mode Reglement"
      }
      else
      {
      this.title = "Modification Mode Reglement"
      }
    }
  
    onSelectCode() {
      
      this.service.getNumero().subscribe(
        response => {
        
          this.num = response;
          this.code = ( 1000 + this.num +1).toString().substring(1);
        
          this.f['code'].setValue(this.code);
        }
      );
    }
  
    infoForm() {
      this.service.formData = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        reduction: ['0', [Validators.required]],
      });
    }
    ResetForm() {
      this.service.formData.reset();
    }
    onSubmit() {
     
        if (this.service.choixmenu == "A") {
          this.addData();
        }
        else {
    
          this.updateData()
        }
    
    
    }
  
  lister()
  {
    this.router.navigate(['/typepaiements']);
  }
  
    addData() {
      
      this.service.createData(this.service.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.service.getAll().subscribe(
            response =>{this.service.list = response;}
           );                                            
          this.router.navigate(['/typepaiements']);
        });
    }
    updateData() {
      this.service.updatedata(this.service.formData.value.code, this.service.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.service.getAll().subscribe(
            response =>{this.service.list = response;}
           );
          this.router.navigate(['/typepaiements']);
        });
    }
  
}

