import { Component, OnInit, Inject } from '@angular/core';
import { ClasseService } from '../../service/classe.service';
import { DomaineService } from '../../service/domaine.service';
import { NiveauService } from '../../service/niveau.service';
import { NationaliteService } from '../../service/nationalite.service';
import { EtablissementService } from '../../service/etablissement.service';
import { EtudiantService } from '../../service/etudiant.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styles: [
  ]
})
export class AddEtudiantComponent implements OnInit {
  numero: any;
  matricule: any;
  annee: any;
  date: any;
  anneeNais: any;
  nationaliteList: any = [];
  specialiteList: any = [];
  domaineList: any = [];
  classeList: any = [];
  classe:any;
  etablissementList: any = [];
  niveauList: any = [];
  userFile: any;
  public imagePath: any;
  imgURL: any;
  public message: any;
  submitted = false;
  title: any;
  isValid = true;
  id !:number;
  constructor(public service: EtudiantService, public fb: FormBuilder, public toastr: ToastrService,
    public etablissementService: EtablissementService,
    public nationaliteService: NationaliteService,
    public domaineService: DomaineService,
    public classeService: ClasseService,
    public niveauService : NiveauService,
    private datePipe: DatePipe,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEtudiantComponent>,

  ) { }
  get f() { return this.service.formData.controls; }
  ngOnInit() {
    this.annee = localStorage.getItem('annee');
    if (this.service.choixmenu == "A") {
      this.infoForm();
      this.title = "Ajout Etudiant";
      this.date = this.transformDate(new Date(Date.now()));
      this.annee = (this.date).toString().substring(0, 4);
    
      this.f['annee'].setValue(this.annee);
      this.onSelectMatricule(this.annee);
      
    }
    else { 
      this.title = "Modification Etudiant";
      this.id = this.service.formData.value.id;
     }
    
    this.nationaliteService.getAll().subscribe(
      response => { this.nationaliteList = response; }
    );
    this.classeService.getAll().subscribe(
      response => { this.classeList = response; }
    );
    this.niveauService.getAll().subscribe(
      response => { this.niveauList = response; }
    );    
    this.etablissementService.getAll().subscribe(
      response => { this.etablissementList = response; }
    );  
  }

  infoForm() {
    this.service.formData = this.fb.group({
      id: null,
      matricule: ['', [Validators.required, Validators.minLength(5)]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      ville: ['', [Validators.required, Validators.minLength(4)]],
      codePostal: [0, [Validators.required]],
      dateNaissance: ['', [Validators.required]],
      lieu: ['', [Validators.required, Validators.minLength(3)]],
      pere: ['', [Validators.required, Validators.minLength(3)]],
      profession: ['', [Validators.required, Validators.minLength(3)]],
      codeClasse: ['', [Validators.required, Validators.minLength(3)]],
      classe: ['', [Validators.required, Validators.minLength(3)]],
      etablissement: ['', [Validators.required, Validators.minLength(3)]],
      codeEtablissement: ['', [Validators.required, Validators.minLength(3)]],
      annee: [0, [Validators.required]],
      cin: ['', [Validators.required, Validators.minLength(8)]],
      cinp: ['', [Validators.required, Validators.minLength(8)]],
      genre: ['', [Validators.required]],
      codeNationalite: ['', [Validators.required, Validators.minLength(3)]],
      tel: ['', [Validators.required, Validators.minLength(6)]],
      telp: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      codeNiveau: ['', [Validators.required, Validators.minLength(3)]],
      nationalite: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  onSelectMatricule(ann: number) {
   
    this.service.getMatricule(ann).subscribe(
      response => {
        this.numero = response;
        if (this.numero == 0)
        {
          this.numero = (ann * 10000) +  1;
        }
        else
        {
          this.numero =  this.numero + 1;
        }
        

        this.f['matricule'].setValue(this.numero);
      }
    );
  }

  ResetForm() {
    this.service.formData.reset();
  }
  onSubmit() {
    this.submitted = true;
    if (this.service.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }

  }

  validateForm() {
    this.isValid = true;
    this.date = this.transformDate(this.service.formData.value.dateNaissance);
    this.anneeNais = (this.date).toString().substring(0, 4);
    if (this.service.formData.value.mat == 0)
      this.isValid = false;
    else if (this.anneeNais > (this.annee - 5))
    {
      this.isValid = false;
      this.toastr.warning('Vérifier Année de Naissance ....');
    }
     
    return this.isValid;
  }


  addData() {
 //   this.validateForm();
    if (this.isValid)
    {
      if (this.service.addimg == 'O') {
        const formData = new FormData();
        const etudiant = this.service.formData.value;
        formData.append('etudiant', JSON.stringify(etudiant));
        formData.append('file', this.userFile);
        this.service.createData(formData).subscribe(data => {
          this.dialogRef.close();
          this.service.getAll().subscribe(
            response => { this.service.list = response; }
          );
          this.router.navigate(['/etudiants']);
        });
      }
      else {
        this.service.saveData(this.service.formData.value).subscribe(data => {
          this.dialogRef.close();
          this.service.getAll().subscribe(
            response => { this.service.list = response; }
          );
          this.router.navigate(['/etudiants']);
        });
      }
    }
  else
  {
    this.toastr.warning('Vérifier Vos données....');
  }
    
   
  }
  updateData() {
    this.service.updatedata( this.service.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.service.getAll().subscribe(
          response => { this.service.list = response; }
        );
        this.router.navigate(['/etudiants']);
      });
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.service.addimg = 'O';
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  OnSelectClasse(ctrl: any) {
    
    this.f['codeClasse'].setValue( this.classeList[ctrl.selectedIndex - 1].code);
    this.f['classe'].setValue( this.classeList[ctrl.selectedIndex - 1].libelle);
  }
  
  OnSelectEtablissement(ctrl: any) {
    
    this.f['codeEtablissement'].setValue( this.etablissementList[ctrl.selectedIndex - 1].code);
    this.f['etablissement'].setValue( this.etablissementList[ctrl.selectedIndex - 1].libelle);
  }
  OnSelectNationalite(ctrl: any) {
    
    this.f['codeNationalite'].setValue( this.nationaliteList[ctrl.selectedIndex - 1].code);
    this.f['nationalite'].setValue( this.nationaliteList[ctrl.selectedIndex - 1].libelle);
  }
  OnSelectNiveau(ctrl: any) {
    
    this.f['codeNiveau'].setValue( this.niveauList[ctrl.selectedIndex - 1].code);
    this.f['niveau'].setValue( this.niveauList[ctrl.selectedIndex - 1].libelle);
  }
}

