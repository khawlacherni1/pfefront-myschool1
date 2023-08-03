import { Component, OnInit, Inject } from '@angular/core';
import { AbsenceService } from '../../service/absence.service';
import { LabsenceService } from '../../service/labsence.service';
import { EnseignantService } from '../../service/enseignant.service';
import { EtudiantService } from '../../service/etudiant.service';
import { MatiereService } from '../../service/matiere.service';
import { ClasseService } from '../../service/classe.service';
import { CoursService } from '../../service/cours.service';
import { HoraireService } from '../../service/horaire.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AddLabsenceComponent } from '../../absence/add-labsence/add-labsence.component';
@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styles: [
  ]
})
export class AddAbsenceComponent implements OnInit {
  title : any;
  date: any;
  coef : any;
  annee: any;
  isValid: any;
  num: any;
  matricule: any;
  codeClasse: any;
  codeMatiere: any;
  enseignantList: any = [];
  classeList: any = [];
  matiereList: any = [];
  horaireList: any = [];
  submitted = false;
  numero: any;
  constructor(public service: AbsenceService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddLabsenceComponent>,
    public enseignantService: EnseignantService, public matiereService: MatiereService,
    public horaireService: HoraireService, public labsenceService: LabsenceService,
    public etudiantService: EtudiantService, public datePipe: DatePipe,
    public classeService: ClasseService, public coursService: CoursService, private dialog: MatDialog) { }
  get f() { return this.service.formData.controls }
  ngOnInit() {

    if (this.service.choixmenu == "A") {
      this.infoForm();
      this.date = this.transformDate(new Date(Date.now()));
      this.annee = (this.date).toString().substring(0, 4);;
      this.f['annee'].setValue(this.annee);
      this.f['dateJour'].setValue(this.date);
      this.etudiantService.list= [];
      this.onSelectNumero(this.annee);
      this.title ="Ajout Absences";
    }
    else
    {
      this.title = "Modification Absences";
      this.matricule = localStorage.getItem("matricule");
      this.coursService.getMatiere(this.matricule, this.service.formData.value.codeClasse).subscribe(
        response => {
          this.matiereList = response
        }
      );
      this.labsenceService.getAll(this.service.formData.value.numero).subscribe(
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
    this.horaireService.getAll().subscribe(
      response => {
        this.horaireList = response
      }
    )
  }

  onSelectNumero(ann: number) {
    this.service.getNumero(ann).subscribe(
      response => {
        this.numero = response;
        this.numero = (ann * 10000) + this.numero + 1;

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
      dateJour: ['', [Validators.required]],
      codeMatiere: ['', [Validators.required]],
      matriculeEnseignant: ['', [Validators.required]],
      codeClasse: ['', [Validators.required]],
      matiere: ['', [Validators.required]],
      enseignant: ['', [Validators.required]],
      classe: ['', [Validators.required]],
      codeHoraire: ['', [Validators.required]],
      horaire: ['', [Validators.required]],
      labsences: [],
    });
  }
  ResetForm() {
    this.service.formData.reset();
  }


  lister() {
    this.router.navigate(['/absences']);
  }

  AddData(lAbsenceIndex: any, Id: any) {
 //   this.etudiantService.list[lAbsenceIndex - 1].absent.value = 'O'
   const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { lAbsenceIndex, Id };
    this.dialog.open(AddLabsenceComponent, dialogConfig).afterClosed().subscribe(b10 => {

    });
  }
  onSubmit() {
    this.submitted = true
    this.f['labsences'].setValue(this.etudiantService.list);
    this.service.saveOrUpdate(this.service.formData.value).
      subscribe(data => {
        this.toastr.success('Validation Faite avec Success');
        this.router.navigate(['/absences']);
      });
  }

  onDelete(item: any, Id: number, i: number) {
    if (Id != null)
      this.service.formData.value.id += Id;
    this.service.list.splice(i, 1);

  }
  updateData() {
    this.service.updatedata(this.service.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.service.getAll().subscribe(
          response => { this.service.list = response; }
        );
        this.router.navigate(['/absences']);
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
    this.codeMatiere= this.matiereList[ctrl.selectedIndex - 1].codeMatiere;
    this.f['codeMatiere'].setValue(this.codeMatiere);
    this.f['matiere'].setValue(this.matiereList[ctrl.selectedIndex - 1].matiere);
    }

  onselectHoraire(ctrl: any) {
      this.f['codeHoraire'].setValue(this.horaireList[ctrl.selectedIndex - 1].code);
    this.f['horaire'].setValue(this.horaireList[ctrl.selectedIndex - 1].heure);
    }


  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}







