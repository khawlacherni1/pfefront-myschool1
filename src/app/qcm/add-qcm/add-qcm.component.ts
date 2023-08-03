import { Component, OnInit, Inject } from '@angular/core';
import { EnseignantService } from '../../service/enseignant.service';
import { MatiereService } from '../../service/matiere.service';
import { CoursService } from '../../service/cours.service';
import { QcmService } from '../../service/qcm.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AddLqcmComponent } from '../../qcm/add-lqcm/add-lqcm.component';
@Component({
  selector: 'app-add-qcm',
  templateUrl: './add-qcm.component.html',
  styles: [
  ]
})
export class AddQcmComponent implements OnInit {
  title :any;
  date: any;
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
  constructor(public qcmService: QcmService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddQcmComponent>,
    public enseignantService: EnseignantService, public matiereService: MatiereService,
    public datePipe: DatePipe,public coursService: CoursService,  private dialog: MatDialog) { }
  get f() { return this.qcmService.formData.controls }
  ngOnInit() {

    if (this.qcmService.choixmenu == "A") {
      this.infoForm();
      this.date = this.transformDate(new Date(Date.now()));
      this.annee = (this.date).toString().substring(0, 4);;
      this.f['annee'].setValue(this.annee);

      this.onSelectNumero(this.annee);
      this.title = "Ajout Qcms"
    }
    else
    {
      this.title = "Modication Qcms"
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
    this.qcmService.getNumero(ann).subscribe(
      response => {
        this.numero = response;
        this.numero = (ann * 10000) + this.numero + 1;

        this.f['numero'].setValue(this.numero);
      }
    );
  }

  infoForm() {
    this.qcmService.formData = this.fb.group({
      id: null,
      numero: [0, [Validators.required]],
      annee: [0, [Validators.required]],
      codeMatiere: ['', [Validators.required]],
      matriculeEnseignant: ['', [Validators.required]],
      codeClasse: ['', [Validators.required]],
      matiere: ['', [Validators.required]],
      enseignant: ['', [Validators.required]],
      classe: ['', [Validators.required]],
      question: ['', [Validators.required]],
      reponse: [0, [Validators.required]],
     
      lqcms: [],
    });
  }
  ResetForm() {
    this.qcmService.formData.reset();
  }


  lister() {
    this.router.navigate(['/notes']);
  }

  
  onSubmit() {
    this.submitted = true
      this.qcmService.saveOrUpdate(this.qcmService.formData.value).
      subscribe(data => {
        this.toastr.success('Validation Faite avec Success');
        this.router.navigate(['/qcms']);
      });
  }

  onDelete(item: any, Id: number, i: number) {
    if (Id != null)
      this.qcmService.formData.value.id += Id;
    this.qcmService.list.splice(i, 1);

  }
  updateData() {
    this.qcmService.updatedata(this.qcmService.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.qcmService.getAll().subscribe(
          response => { this.qcmService.list = response; }
        );
        this.router.navigate(['/qcms']);
      });
  }
  onselectClasse(ctrl: any) {
    this.codeClasse = this.classeList[ctrl.selectedIndex - 1].codeClasse;
    ;
    this.f['codeClasse'].setValue(this.codeClasse);
    this.f['classe'].setValue(this.classeList[ctrl.selectedIndex - 1].classe);
    this.coursService.getMatiere(this.matricule, this.codeClasse).subscribe(
      response => {
        this.matiereList = response
      }
    );
    
  }


  onselectMatiere(ctrl: any) {
    this.codeMatiere= this.matiereList[ctrl.selectedIndex - 1].codeMatiere;
    this.f['codeMatiere'].setValue(this.codeMatiere);
    this.f['matiere'].setValue(this.matiereList[ctrl.selectedIndex - 1].matiere);
    
  }


  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  AddData(lqcmIndex: any, Id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { lqcmIndex, Id };
    this.dialog.open(AddLqcmComponent, dialogConfig).afterClosed().subscribe(b10 => {

    });
  }

}
