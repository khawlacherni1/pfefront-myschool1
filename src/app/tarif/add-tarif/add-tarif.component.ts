import { Component, OnInit, Inject } from '@angular/core';
import { TarifService } from '../../service/tarif.service';
import { SpecialiteService } from '../../service/specialite.service';
import { DomaineService } from '../../service/domaine.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-tarif',
  templateUrl: './add-tarif.component.html',
  styles: [
  ]
})
export class AddTarifComponent implements OnInit {
  title : any;
  submitted = false;
  domaineList: any = [];
  specialiteList: any = [];
  num: any;
  code !: string;
  Date: any;
  annee : any;
  constructor(public crudApi: TarifService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router,
    public domaineService: DomaineService,
    public specialiteService: SpecialiteService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data :any,
    public dialogRef: MatDialogRef<AddTarifComponent>) { }
  get f() { return this.crudApi.formData.controls }
  ngOnInit() {

    if (this.crudApi.choixmenu == "A") {
      this.infoForm();;
      this.onSelectCode();
      this.Date = this.transformDate(new Date());
      this.annee = (this.Date).toString().substring(0, 4);
      this.f['annee'].setValue(this.annee);
      this.title = "Ajout Tarif"
    }
    else
    {
this.title = "Modification tarif"
    }
    this.domaineService.getAll().subscribe(
      response => { this.domaineList = response; }
    );
    this.specialiteService.getAll().subscribe(
      response => { this.specialiteList = response; }
    );
  }


  onSelectCode() {

    this.crudApi.getNumero().subscribe(
      response => {

        this.num = response;
        this.code = (1000 + this.num + 1).toString().substring(1);

        this.f['code'].setValue(this.code);
      }
    );
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      codeSpecialite: ['', [Validators.required]],
      codeDomaine: ['', [Validators.required]],      
      annee: [0, [Validators.required]],
      m1: [0, [Validators.required]],
      m2: [0, [Validators.required]],
      m3: [0, [Validators.required]],
      frais: [0, [Validators.required]],
      d1: ['', [Validators.required]],
      d2: ['', [Validators.required]],
      d3: ['', [Validators.required]],
      d4: ['', [Validators.required]],
      montant: [0, [Validators.required]],
     
    });
  }
  ResetForm() {
    this.crudApi.formData.reset();
  }

 
  onSubmit() {
    const val = this.crudApi.formData.value;
   if (val.montant != (val.trim1 + val.trim2 + val.trim3 + val.frais))
   {
    this.submitted = true;
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }
   else
   {
    this.toastr.warning(' Vérifier Vos taris .......!');
   }
   
}

  lister() {
    this.router.navigate(['/tarifs']);
  }

  addData() {
 
    this.crudApi.createData(this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );
        this.router.navigate(['/tarifs']);
      });
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.formData.value.code, this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );
        this.router.navigate(['/tarifs']);
      });
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}

