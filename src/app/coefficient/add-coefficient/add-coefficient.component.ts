import { Component, OnInit,Inject } from '@angular/core';
import { CoefficientService } from '../../service/coefficient.service';
import { ClasseService } from '../../service/classe.service';
import { MatiereService } from '../../service/matiere.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-coefficient',
  templateUrl: './add-coefficient.component.html',
  styles: [
  ]
})
export class AddCoefficientComponent implements OnInit {
  title : any;
  classeList  :any = [];
  matiereList  :any = [];
  numero : any;
  code !: string;
  num :any;
    constructor(public coefficientService: CoefficientService, public fb: FormBuilder, public toastr: ToastrService,
      private router: Router,public dialogRef:MatDialogRef<AddCoefficientComponent>,public classeService: ClasseService,
      @Inject(MAT_DIALOG_DATA) public data :any,
      public matiereService: MatiereService, public datePipe : DatePipe) { }
      get f() { return this.coefficientService.formData.controls }
    ngOnInit() {

      if (this.coefficientService.choixmenu == "A")
      { this.infoForm()


      this.title = "Ajout Coefficient";
      this.onSelectCode();
    }
      else
      {
        this.title = "Modification Coefficient";
      }
      this.classeService.getAll().subscribe(
        response => { this.classeList = response; }
      );

      this.matiereService.getAll().subscribe(
        response => { this.matiereList = response; }
      );
    }

    infoForm() {
      this.coefficientService.formData = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        codeClasse: ['', [Validators.required]],
        codeMatiere: ['', [Validators.required]],
        coef: ['', [Validators.required]],
        matiere: ['', [Validators.required]],
        classe: ['', [Validators.required]],

      });
    }

    onSelectCode() {

      this.coefficientService.getNumero().subscribe(
        response => {

          this.num = response;
          this.code = ( 1000 + this.num +1).toString().substring(1);

          this.f['code'].setValue(this.code);
        }
      );
    }
    ResetForm() {
      this.coefficientService.formData.reset();
    }
    onSubmit() {
      alert("aaaaaa");
        if (this.coefficientService.choixmenu == "A") {
          this.addData();
        }
        else {

          this.updateData()
        }
    }

  lister()
  {
    this.router.navigate(['/coefficients']);
  }

    addData() {

      this.coefficientService.createData(this.coefficientService.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.coefficientService.getAll().subscribe(
            response =>{this.coefficientService.list = response;}
           );
          this.router.navigate(['/coefficients']);
        });
    }
    updateData() {
      this.coefficientService.updatedata( this.coefficientService.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.coefficientService.getAll().subscribe(
            response =>{this.coefficientService.list = response;}
           );
          this.router.navigate(['/coefficients']);
        });
    }
  transformDate(date :any)
  {
    return this.datePipe.transform(date,'yyyy-MM-dd');
  }
  onselectMatiere(ctrl: any) {

    this.f['codeMatiere'].setValue( this.matiereList[ctrl.selectedIndex - 1].code);
    this.f['matiere'].setValue( this.matiereList[ctrl.selectedIndex - 1].libelle);
  }
  onselectClasse(ctrl: any) {

    this.f['codeClasse'].setValue( this.classeList[ctrl.selectedIndex - 1].code);
    this.f['classe'].setValue( this.classeList[ctrl.selectedIndex - 1].libelle);
  }

  }
