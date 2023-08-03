import { Component, OnInit, Inject } from '@angular/core';
import { ClasseService } from '../../service/classe.service';

import { EtudiantService } from '../../service/etudiant.service';
import { InscriptionService } from '../../service/inscription.service';
import { SpecialiteService } from '../../service/specialite.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-inscription',
  templateUrl: './add-inscription.component.html',
  styles: [
  ]
})
export class AddInscriptionComponent implements OnInit {
  numero : any;
  title : any;
  classeList: any = [];
  specialiteList: any = [];
  etudiantList: any = [];
  num: any;
  annee: any;
  code !: string;
  date: any;
  compteur: any = {};
  m: any;
  constructor(public service: InscriptionService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddInscriptionComponent>, public specialiteService: SpecialiteService,
    @Inject(MAT_DIALOG_DATA) public data: any, public classeService: ClasseService, public etudiantService: EtudiantService,
    private currentRoute: ActivatedRoute,  private datePipe: DatePipe) { }
  get f() { return this.service.formData.controls }
  ngOnInit() {

   /// this.annee = localStorage.getItem('annee');
   
    
    //  let id = this.currentRoute.snapshot.paramMap.get('id');
    if (this.service.choixmenu == "A") {

      this.infoForm();
      this.date = this.transformDate(new Date(Date.now()));
      this.f['dateInscription'].setValue(this.date);
      this.annee = (this.date).toString().substring(0, 4);;
      this.f['annee'].setValue(this.annee);
      this.getNumero(this.annee);
      this.title = "Ajout Inscription";
    }
    else{
      this.title = "Modification Inscription";
    }
    this.etudiantService.getAll().subscribe(
      response => { this.etudiantList = response; }
    );
    /*    this.specialiteService.getAll().subscribe(
          response => { this.specialiteList = response; }
        );*/
    this.classeService.getAll().subscribe(
      response => { this.classeList = response; }
    );
  }


  getNumero(id: number) {
    
    this.service.getNumero(id).subscribe(
      response => {
        this.numero = response;
        if (this.numero == 0)
        this.f['numero'].setValue((this.annee * 10000) + this.numero + 1);
        else
        this.f['numero'].setValue( this.numero + 1);
      }
    );
  }



  infoForm() {
    this.service.formData = this.fb.group({
      id: null,
      annee: [0, [Validators.required]],
      numero: [0, [Validators.required]],
      dateInscription: ['', [Validators.required]],
      matricule: [0, [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      //     codeSpecialite: ['', [Validators.required]],
      codeClasse: ['', [Validators.required]],
      classe: ['', [Validators.required]],
      montant: [0, [Validators.required]],

    });
  }
  ResetForm() {
    this.service.formData.reset();
  }
  onSubmit() {

    if (this.service.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }

  lister() {
    this.router.navigate(['/inscriptions']);
  }

  addData() {
    this.service.createData(this.service.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.service.getAll().subscribe(
          response => { this.service.list = response; }
        );
        this.router.navigate(['/inscriptions']);
      });
  }
  updateData() {
    this.service.updatedata(this.service.formData.value.code, this.service.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.service.getAll().subscribe(
          response => { this.service.list = response; }
        );
        this.router.navigate(['/inscriptions']);
      });
  }
  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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

  OnSelectEtudiant(ctrl: any) {
    if (ctrl.selectedIndex == 0) {
      this.f['nom'].setValue('');
    }
    else {
      this.f['matricule'].setValue(this.etudiantList[ctrl.selectedIndex - 1].matricule);
      this.f['nom'].setValue(this.etudiantList[ctrl.selectedIndex - 1].nom);
      this.f['prenom'].setValue(this.etudiantList[ctrl.selectedIndex - 1].prenom);
    }
  }


}

