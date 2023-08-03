import { Component, OnInit, Inject } from '@angular/core';
import { ModreglementService } from '../../service/modreglement.service';
import { BanqueService } from '../../service/banque.service';
import { NgForm } from '@angular/forms';
import { ReglementService } from '../../service/reglement.service';
import { LreglementService } from '../../service/lreglement.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-lreglement',
  templateUrl: './add-lreglement.component.html',
  styles: [
  ]
})
export class AddLreglementComponent implements OnInit {
  formData !: FormGroup;
  modreglementList: any =[];
  banqueList: any =[];
  isValid:boolean=true;
  modep : any = 'ESP';
  get f() { return this.formData.controls; }
  constructor( public lreglementService:LreglementService,private toastr :ToastrService,
        @Inject(MAT_DIALOG_DATA) public data :any,
        public dialogRef:MatDialogRef<AddLreglementComponent>,
        public modreglementService :ModreglementService,
        public reglementService :ReglementService,
        public banqueService :BanqueService,
        
        public fb: FormBuilder){}
     

  ngOnInit() {
    this.modreglementService.getAll().subscribe(
      response =>{this.modreglementList= response;}
     );
     this.banqueService.getAll().subscribe(
      response =>{this.banqueList= response;}
     );
    if(this.data.LreglementIndex==null)
    {
      this.InfoForm();
    }
    else 
    this.formData =Object.assign({},this.reglementService.list[this.data.LreglementIndex])    
}


InfoForm() {
  this.formData = this.fb.group({
    id : 0,
    annee : 0,
    numero : 0,
    modeReglement : '',
    numpiece : '',
    banque : '',
    echeance  : '',
    montant : 0,
  });
  } 

  
  
  
  onSubmit(){
  
     if(this.validateForm()){
    if(this.data.lreglementIndex==null)
    {
      this.reglementService.list.push(this.formData.value);
     
    }
     
    else 
    {
      this.reglementService.list[this.data.lreglementIndex] = this.formData.value;
    }
  
    this.dialogRef.close();
       
  }
  }
  validateForm(){
    alert(this.formData.value.modeReglement)
    this.isValid=true;
    if(this.formData.value.modeReglement== null)
      this.isValid=false;
      else if(this.formData.value.montant ==0)
      this.isValid=false;
      return this.isValid;
  }

 onChange(ctrl: any) {

    if (ctrl.selectedIndex == 0) {
      this.f['modeReglment'].setValue('');
    }
    else {

     
      this.f['modeReglement'].setValue(this.modreglementList[ctrl.selectedIndex - 1].code);
      this.modep = this.modreglementList[ctrl.selectedIndex - 1].code;
      alert(this.modep);
    }
  }

}

