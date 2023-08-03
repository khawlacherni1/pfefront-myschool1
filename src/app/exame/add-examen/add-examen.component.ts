import { Component, OnInit , Inject} from '@angular/core';
import { ExamenService } from '../../service/examen.service';
import { EnseignantService } from '../../service/enseignant.service';
import { EtudiantService } from '../../service/etudiant.service';
import { MatiereService } from '../../service/matiere.service';
import { ClasseService } from '../../service/classe.service';
import { CoursService } from '../../service/cours.service';
import { CoefficientService } from '../../service/coefficient.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,  Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styles: [
  ]
})
export class AddExamenComponent implements OnInit{
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
  public imagePath :any;
  imgURL: any;
  public message :any
  examenFile :any;
  constructor(public service: ExamenService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router,
    public enseignantService: EnseignantService, public matiereService: MatiereService,
    public coefficientService: CoefficientService,
    public etudiantService: EtudiantService, public datePipe: DatePipe,
    public classeService: ClasseService, public coursService: CoursService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddExamenComponent>,) { }
  get f() { return this.service.formData.controls }


  ngOnInit() {
    if (this.service.choixmenu == "A") {
      this.infoForm();
      this.date = this.transformDate(new Date(Date.now()));
      this.annee = (this.date).toString().substring(0, 4);;
      this.f['annee'].setValue(this.annee);

      this.onSelectNumero(this.annee);
      this.title = "Ajout Examen";
    }
    else {
      this.title = "Modification Examen";
      this.matricule = localStorage.getItem("matricule");
      this.coursService.getMatiere(this.matricule, this.service.formData.value.codeClasse).subscribe(
        response => {
          this.matiereList = response
        }
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
        if (this.numero == 0)
        {
          this.numero = (ann * 10000) + this.numero + 1;
        }
        else{
          this.numero =  this.numero + 1;
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

    });
  }
  ResetForm() {
    this.service.formData.reset();
  }


  lister() {
    this.router.navigate(['/Examens']);
  }

  onSubmit() {
    if (this.service.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }
  addData() {
    const formData = new FormData();
    const examen = this.service.formData.value;
    formData.append('examen', JSON.stringify(examen));
    formData.append('file', this.examenFile);
    this.service.createData(formData).subscribe(data => {
      this.dialogRef.close();
      this.service.getAll().subscribe(
        response => { this.service.list = response; }
      );
      this.router.navigate(['/examens']);
    });
   }
   
     updateData()
     {
       const formData = new FormData();
       const Examen = this.service.formData.value;
       formData.append('examen', JSON.stringify(Examen));
       formData.append('file', this.examenFile);
       this.service.updatedata(this.service.formData.value.id,formData).subscribe( data => {
         this.toastr.success( 'Modification Faite avec Success');
           });
           this.dialogRef.close();
       this.service.getAll().subscribe(
         response =>{this.service.list = response;
         }
        );
       this.router.navigate(['/examens']);
     }


  onselectClasse(ctrl: any) {
    this.codeClasse = this.classeList[ctrl.selectedIndex - 1].codeClasse;
    this.f['classe'].setValue( this.classeList[ctrl.selectedIndex - 1].classe);
    this.f['codeClasse'].setValue(this.codeClasse);
    this.coursService.getMatiere(this.matricule, this.codeClasse).subscribe(
      response => {
        this.matiereList = response
      }
    );
   
  }
  onselectMatiere(ctrl: any) {
    this.codeMatiere = this.matiereList[ctrl.selectedIndex - 1].codeMatiere;
    this.f['codeMatiere'].setValue(this.codeMatiere);
    this.f['matiere'].setValue(this.matiereList[ctrl.selectedIndex - 1].matiere);
    
  }


  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.examenFile = file;
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

}








