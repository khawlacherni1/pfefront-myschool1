import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { EtudiantService } from '../../service/etudiant.service';
import { NgForm } from '@angular/forms';
import { AbsenceService } from '../../service/absence.service';
import { LabsenceService } from '../../service/labsence.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-add-labsence',
  templateUrl: './add-labsence.component.html',
  styles: [
  ]
})
export class AddLabsenceComponent {
  formData!: FormGroup;
  isValid:boolean=true;
  
  constructor( public service:LabsenceService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA)  public data:any,
        public dialogRef:MatDialogRef<AddLabsenceComponent>,
        private etudiantService:EtudiantService,
        private AbsenceService:AbsenceService,public fb: FormBuilder){}
        get f() { return this.formData.controls; }
       

  ngOnInit() {
   
     this.formData =this.fb.group(Object.assign({},this.etudiantService.list[this.data.lAbsenceIndex]));
    }
  



InfoForm() {
  this.formData = this.fb.group({
      id: null,
      numero :this.data.numero,
      matricule : 0,
      nom : '',
      absent : 'O',
      
      
    });
  } 






onSubmit() {
  

  this.etudiantService.list[this.data.lAbsenceIndex] = this.formData.value;

this.dialogRef.close();

 
}

validateForm(formData:any){
  this.isValid=true;
  if(formData.matricule==0)
    this.isValid=false;
    
    return this.isValid;
}
}






