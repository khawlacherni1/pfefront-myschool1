




  import { Component, OnInit, Inject } from '@angular/core';
  import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
  import { QcmService } from '../../service/qcm.service';
  import { NgForm } from '@angular/forms';
  import { LqcmService } from '../../service/lqcm.service';
  import { ToastrService } from 'ngx-toastr';
  import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
  from '@angular/forms';
  @Component({
    selector: 'app-add-lqcm',
    templateUrl: './add-lqcm.component.html',
    styles: [
    ]
  })
  export class AddLqcmComponent {
    submitted :any;
    formData!: FormGroup;
    etudiantList:any=[];
    isValid:boolean=true;
    
    constructor( public service:LqcmService,private toastr :ToastrService,
          @Inject(MAT_DIALOG_DATA)  public data:any,
          public dialogRef:MatDialogRef<AddLqcmComponent>,

          public qcmService:QcmService,public fb: FormBuilder){}
          get f() { return this.formData.controls; }
         
  
    ngOnInit() {
      if (this.data.lqcmIndex == null) {
        this.InfoForm();
        this.submitted = false;
        this.f['ligne'].setValue(this.qcmService.list.length + 1);
      }
      else {
        this.formData = this.fb.group(Object.assign({}, this.qcmService.list[this.data.lqcmIndex]));
      }
      }
    
 
  
  
  InfoForm() {
    this.formData = this.fb.group({
        id: null,
        numero :this.data.numero,
        ligne  : 0,
        question: ['', [Validators.required]],
        reponse: [0, [Validators.required]],
        reponse1: ['', [Validators.required]],
        reponse2: ['', [Validators.required]],
        reponse3: ['', [Validators.required]],
        choix1: [1, [Validators.required]],
        choix2: [2, [Validators.required]],
        choix3: [3, [Validators.required]],
      });
    } 
  
  
  
  
  
  

   
    onSubmit() {
      if(this.data.lqcmIndex==null)
      {
        this.qcmService.list.push(this.formData.value)
        this.dialogRef.close();
      }
      else
    {
      this.qcmService.list[this.data.lqcmIndex] = this.formData.value;
    }
    this.dialogRef.close();
    }
  
  
  validateForm(formData:any){
    this.isValid=true;
    if(formData.reponse==0)
      this.isValid=false;
    
      return this.isValid;
  }
  }
  
    
    
  