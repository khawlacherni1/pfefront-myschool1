import { Component, OnInit, Inject } from '@angular/core';
import { EmploiService } from '../../service/emploi.service';
import { EnseignantService } from '../../service/enseignant.service';
import { LemploiService } from '../../service/lemploi.service';
import { MatiereService } from '../../service/matiere.service';
import { ClasseService } from '../../service/classe.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { AddLemploiComponent } from '../../emploi/add-lemploi/add-lemploi.component';

@Component({
  selector: 'app-add-emploi',
  templateUrl: './add-emploi.component.html',
  styles: [
  ]
})
export class AddEmploiComponent implements OnInit {
  title: any;
  date: any;
  coef: any;
  annee: any;
  isValid: any;
  num: any;
  codeClasse: any;
  codeMatiere: any;
  enseignantList: any = [];
  classeList: any = [];
  matiereList: any = [];
  submitted = false;
  numero: any;
  constructor(public emploiService: EmploiService, public fb: FormBuilder, public toastr: ToastrService,
        private router: Router, public dialogRef: MatDialogRef<AddLemploiComponent>,
    public enseignantService: EnseignantService, public matiereService: MatiereService,
    public datePipe: DatePipe,public lemploiService: LemploiService,
    public classeService: ClasseService, private dialog: MatDialog) { }
  get f() { return this.emploiService.formData.controls }
  ngOnInit() {

    if (this.emploiService.choixmenu == "A") {
      this.infoForm();
      this.date = this.transformDate(new Date(Date.now()));
      this.annee = (this.date).toString().substring(0, 4);;
      this.f['annee'].setValue(this.annee);

      this.onSelectNumero(this.annee);
      this.title = "Ajout Emploi";
    }
    else {
      this.title = "Modification Emploi";
      this.lemploiService.getAll(this.emploiService.formData.value.numero).subscribe(
        response => { this.emploiService.list = response }
      );
    }
    this.classeService.getAll().subscribe(
      response => {
        this.classeList = response
      }
    )

  }

  onSelectNumero(ann: number) {
    this.emploiService.getNumero(ann).subscribe(
      response => {
        this.numero = response;
        if (this.numero == 0)
        {
          this.numero = (ann * 10000) + this.numero + 1;
        }
        else
        {
          this.numero =  this.numero + 1;
        }
       

        this.f['numero'].setValue(this.numero);
      }
    );
  }

  infoForm() {
    this.emploiService.formData = this.fb.group({
      id: null,
      numero: [0, [Validators.required]],
      annee: [0, [Validators.required]],
      semestre: [0, [Validators.required]],
      codeClasse: ['', [Validators.required]],
      classe: ['', [Validators.required]],
      lemplois: [],
    });
  }
  ResetForm() {
    this.emploiService.formData.reset();
  }


  lister() {
    this.router.navigate(['/emplois']);
  }

  AddData(lemploiIndex: any, Id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { lemploiIndex, Id };
    this.dialog.open(AddLemploiComponent, dialogConfig).afterClosed().subscribe(b10 => {
    });
  }
  onSubmit() {
    this.submitted = true
    this.f['lemplois'].setValue(this.emploiService.list);
    this.emploiService.saveOrUpdate(this.emploiService.formData.value).
      subscribe(data => {
        this.toastr.success('Validation Faite avec Success');
      
        this.emploiService.getAll().subscribe(
          response => { this.emploiService.list = response; }
        );
        this.router.navigate(['/emplois']);
      });
  }

  onDelete(item: any, Id: number, i: number) {
    if (Id != null)
      this.emploiService.formData.value.id += Id;
    this.emploiService.list.splice(i, 1);

  }
  updateData() {
    this.emploiService.updatedata(this.emploiService.formData.value).
      subscribe(data => {
     
        this.emploiService.getAll().subscribe(
          response => { this.emploiService.list = response; }
        );
        this.router.navigate(['/emplois']);
      });
  }

  OnSelectClasse(ctrl: any) {
    if (ctrl.selectedIndex == 0) {
      this.f['classe'].setValue('');
    }
    else {
      this.f['classe'].setValue(this.classeList[ctrl.selectedIndex - 1].libelle);
      this.f['codeClasse'].setValue(this.classeList[ctrl.selectedIndex - 1].code);
    }
  }


  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  liste()
  {
    this.dialogRef.close();
        this.emploiService.getAll().subscribe(
          response => { this.emploiService.list = response; }
        );
        this.router.navigate(['/emplois']);
  }
}
