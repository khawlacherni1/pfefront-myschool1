import { Component, OnInit,Inject } from '@angular/core';
import { CoursService } from '../../service/cours.service';
import { ClasseService } from '../../service/classe.service';
import { EnseignantService } from '../../service/enseignant.service';
import { MatiereService } from '../../service/matiere.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styles: [
  ]
})
export class AddCoursComponent implements OnInit {
  title : any;
  classeList  :any = [];
  enseignantList  :any = [];
  matiereList  :any = [];
  numero : any;
  annee:any;
  semestre:any;
  code !: string;
  date : any;
    constructor(public coursService: CoursService, public fb: FormBuilder, public toastr: ToastrService,
      private router: Router,public dialogRef:MatDialogRef<AddCoursComponent>,public classeService: ClasseService,
      @Inject(MAT_DIALOG_DATA) public data :any,
      public enseignantService: EnseignantService,public matiereService: MatiereService, public datePipe : DatePipe) { }
      get f() { return this.coursService.formData.controls }
    ngOnInit() {

      if (this.coursService.choixmenu == "A")
      { this.infoForm()


      this.title = "Ajout Cours";
      this.date = this.transformDate(new Date(Date.now()));
      this.annee =(this.date).toString().substring(0,4);
      this.f['annee'].setValue(this.annee);
      this.onSelectNumero(this.annee);
    }
      else
      {
        this.title = "Modification Cours";
      }
      this.classeService.getAll().subscribe(
        response => { this.classeList = response; }
      );
      this.enseignantService.getAll().subscribe(
        response => { this.enseignantList = response; }
      );
      this.matiereService.getAll().subscribe(
        response => { this.matiereList = response; }
      );
    }

    onSelectNumero(ann : number) {

      this.coursService.getNumero(ann).subscribe(
        response => {
          this.numero = response;
          if (this.numero == 0 )
          {
            this.numero = (ann * 10000) +  1 ;
          }
          else{
            this.numero = this.numero  +  1 ;
          }

          this.f['numero'].setValue(this.numero);
        }
      );
    }

    infoForm() {
      this.coursService.formData = this.fb.group({
        id: null,
        numero: ['', [Validators.required]],
        annee: ['', [Validators.required]],
        semestre: ['', [Validators.required]],
        codeClasse: ['', [Validators.required]],
        matriculeEnseignant: ['', [Validators.required]],
        codeMatiere: ['', [Validators.required]],
        classe: ['', [Validators.required]],
        enseignant: ['', [Validators.required]],
        matiere: ['', [Validators.required]],

      });
    }
    ResetForm() {
      this.coursService.formData.reset();
    }
    onSubmit() {

        if (this.coursService.choixmenu == "A") {
          this.addData();
        }
        else {

          this.updateData()
        }

    }

  lister()
  {
    this.router.navigate(['/courss']);
  }

    addData() {

      this.coursService.createData(this.coursService.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.coursService.getAll().subscribe(
            response =>{this.coursService.list = response;}
           );
          this.router.navigate(['/courss']);
        });
    }
    updateData() {
      this.coursService.updatedata( this.coursService.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.coursService.getAll().subscribe(
            response =>{this.coursService.list = response;}
           );
          this.router.navigate(['/courss']);
        });
    }
  transformDate(date :any)
  {
    return this.datePipe.transform(date,'yyyy-MM-dd');
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

  OnSelectEnseignant(ctrl: any) {
    if (ctrl.selectedIndex == 0) {
      this.f['nom'].setValue('');
    }
    else {
      this.f['matriculeEnseignant'].setValue(this.enseignantList[ctrl.selectedIndex - 1].matricule);
      this.f['nom'].setValue(this.enseignantList[ctrl.selectedIndex - 1].nom);

    }
  }
  OnSelectMatiere(ctrl: any) {
    if (ctrl.selectedIndex == 0) {
      this.f['matiere'].setValue('');
    }
    else {
      this.f['matiere'].setValue(this.matiereList[ctrl.selectedIndex - 1].libelle);
      this.f['codeMatiere'].setValue(this.matiereList[ctrl.selectedIndex - 1].code);
    }
  }
  }
