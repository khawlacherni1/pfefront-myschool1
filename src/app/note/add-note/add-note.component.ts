import { Component, OnInit, Inject } from '@angular/core';
import { NoteService } from '../../service/note.service';
import { EnseignantService } from '../../service/enseignant.service';
import { EtudiantService } from '../../service/etudiant.service';
import { MatiereService } from '../../service/matiere.service';
import { ClasseService } from '../../service/classe.service';
import { CoursService } from '../../service/cours.service';
import { CoefficientService } from '../../service/coefficient.service';
import { LnoteService } from '../../service/lnote.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { AddLnoteComponent } from '../../note/add-lnote/add-lnote.component';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styles: [
  ]
})
export class AddNoteComponent implements OnInit {
  title: any;
  date: any;
  coef: any;
  annee: any;
  isValid: any;
  num: any;
  matricule: any;
  codeClasse: any;
  codeMatiere: any;
  enseignantList: any = [];
  classeList: any = [];
  matiereList: any = [];

  submitted = false;
  numero: any;
  constructor(public service: NoteService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddLnoteComponent>,
    public enseignantService: EnseignantService, public matiereService: MatiereService,
    public coefficientService: CoefficientService, public lnoteService: LnoteService,
    public etudiantService: EtudiantService, public datePipe: DatePipe,
    public classeService: ClasseService, public coursService: CoursService, private dialog: MatDialog) { }
  get f() { return this.service.formData.controls }
  ngOnInit() {

    if (this.service.choixmenu == "A") {
      this.infoForm();
      this.etudiantService.list = [];
      this.date = this.transformDate(new Date(Date.now()));
      this.annee = (this.date).toString().substring(0, 4);;
      this.f['annee'].setValue(this.annee);
      this.onSelectNumero(this.annee);
      this.title = "Ajout Notes";
    }
    else {
      this.title = "Modifaction Notes";

      this.matricule = localStorage.getItem("matricule");
      this.coursService.getMatiere(this.matricule, this.service.formData.value.codeClasse).subscribe(
        response => {
          this.matiereList = response
        }
      );
      this.lnoteService.getAll(this.service.formData.value.numero).subscribe(
        response => { this.etudiantService.list = response }

      );
    }
    this.matricule = localStorage.getItem("matricule");
    this.f['enseignant'].setValue(localStorage.getItem("name"));
    this.f['matriculeEnseignant'].setValue(this.matricule);

    this.coursService.getClasse(this.matricule).subscribe(
      response => {
        this.classeList = response
      }
    )

  }

  onSelectNumero(ann: number) {
    this.service.getNumero(ann).subscribe(
      response => {
        this.numero = response;
        alert(this.numero);
        if (this.numero == 0) {
          this.numero = (ann * 10000) + this.numero + 1;
        }
        else {
          this.numero = this.numero + 1;
        }

        this.f['numero'].setValue(this.numero);
      }
    );
  }

  infoForm() {
    this.service.formData = this.fb.group({
      id: null,
      numero: [0, [Validators.required]],
      annee: [0, [Validators.required]],
      semestre: [0, [Validators.required]],
      codeMatiere: ['', [Validators.required]],
      matriculeEnseignant: ['', [Validators.required]],
      codeClasse: ['', [Validators.required]],
      matiere: ['', [Validators.required]],
      enseignant: ['', [Validators.required]],
      classe: ['', [Validators.required]],
      coef: ['', [Validators.required]],
      lnotes: [],
    });
  }
  ResetForm() {
    this.service.formData.reset();
  }


  lister() {
    this.router.navigate(['/notes']);
  }

  AddData(lnoteIndex: any, Id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { lnoteIndex, Id };
    this.dialog.open(AddLnoteComponent, dialogConfig).afterClosed().subscribe(b10 => {

    });
  }
  onSubmit() {
    this.submitted = true
    this.f['lnotes'].setValue(this.etudiantService.list);
    this.service.saveOrUpdate(this.service.formData.value).
      subscribe(data => {
        this.toastr.success('Validation Faite avec Success');
        this.router.navigate(['/notes']);
      });
  }

  onDelete(item: any, Id: number, i: number) {
    if (Id != null)
      this.etudiantService.formData.value.id += Id;
    this.etudiantService.list.splice(i, 1);

  }
  updateData() {
    this.service.updatedata(this.service.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.service.getAll().subscribe(
          response => { this.service.list = response; }
        );
        this.router.navigate(['/notes']);
      });
  }
  onselectClasse(ctrl: any) {
    this.codeClasse = this.classeList[ctrl.selectedIndex - 1].codeClasse;
    this.f['classe'].setValue(this.classeList[ctrl.selectedIndex - 1].classe);
    this.f['codeClasse'].setValue(this.codeClasse);
    this.coursService.getMatiere(this.matricule, this.codeClasse).subscribe(
      response => {
        this.matiereList = response
      }
    );
    this.etudiantService.getList(this.codeClasse).subscribe(
      response => {
        this.etudiantService.list = response
      }
    );
  }
  onselectMatiere(ctrl: any) {
    this.codeMatiere = this.matiereList[ctrl.selectedIndex - 1].codeMatiere;
    this.f['codeMatiere'].setValue(this.codeMatiere);
    this.f['matiere'].setValue(this.matiereList[ctrl.selectedIndex - 1].matiere);
    this.coefficientService.getCoefficient(this.codeClasse, this.codeMatiere).subscribe(
      response => {

        this.coef = response;
        this.f['coef'].setValue(this.coef);
      }
    );
  }


  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}







