
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JourService } from '../../service/jour.service';
import { HoraireService } from '../../service/horaire.service';
import { EnseignantService } from '../../service/enseignant.service';
import { MatiereService } from '../../service/matiere.service';
import { NgForm } from '@angular/forms';
import { EmploiService } from '../../service/emploi.service';
import { LemploiService } from '../../service/lemploi.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
@Component({
  selector: 'app-add-lemploi',
  templateUrl: './add-lemploi.component.html',
  styles: [
  ]
})
export class AddLemploiComponent implements OnInit {
  formData!: FormGroup;
  horaireList: any = [];
  jourList: any = [];
  matiereList: any = [];
  enseignantList: any = [];
  isValid: boolean = true;

  constructor(public service: LemploiService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddLemploiComponent>,
    private jourService: JourService, private horaireService: HoraireService,
    private matiereService: MatiereService, private enseignantService: EnseignantService,
    private emploiService: EmploiService, public fb: FormBuilder) { }
  get f() { return this.formData.controls; }

  ngOnInit() {
 
    if(this.data.lemploiIndex==null)
    {
      this.InfoForm();
      
    }
    else 
    {
      
     this.formData =this.fb.group(Object.assign({},this.emploiService.list[this.data.lemploiIndex]));
    }
    this.horaireService.getAll().subscribe(
      response => {
        this.horaireList = response
      }
    )
    this.jourService.getAll().subscribe(
      response => {
        this.jourList = response
      }
    )
    this.matiereService.getAll().subscribe(
      response => {
        this.matiereList = response
      }
    )
    this.enseignantService.getAll().subscribe(
      response => {
        this.enseignantList = response
      }
    )
   
}




  InfoForm() {
    this.formData = this.fb.group({
      id: null,
      numero: this.data.numero,
      jour: ['', [Validators.required]],
      horaire: ['', [Validators.required]],
      codeMatiere: ['', [Validators.required]],
      matiere: ['', [Validators.required]],
      matriculeEnseignant: ['', [Validators.required]],
      enseignant: ['', [Validators.required]],
      salle: [0, [Validators.required]],
      codeJour: ['', [Validators.required]],
      codeHoraire: ['', [Validators.required]],

    });
  }


onSelectHoraire(ctrl :any){
  this.f['horaire'].setValue(this.horaireList[ctrl.selectedIndex - 1].heure);
  this.f['codeHoraire'].setValue(this.horaireList[ctrl.selectedIndex - 1].code);
}
 
onSelectJour(ctrl :any){
  this.f['jour'].setValue(this.jourList[ctrl.selectedIndex - 1].libelle);
  this.f['codeJour'].setValue(this.jourList[ctrl.selectedIndex - 1].code);

}
onSelectMatiere(ctrl :any){
  this.f['codeMatiere'].setValue(this.matiereList[ctrl.selectedIndex - 1].code);
  this.f['matiere'].setValue(this.matiereList[ctrl.selectedIndex - 1].libelle);

}
onSelectEnseignant(ctrl :any){
  this.f['matriculeEnseignant'].setValue(this.enseignantList[ctrl.selectedIndex - 1].matricule);
  this.f['enseignant'].setValue(this.enseignantList[ctrl.selectedIndex - 1].nom);

}




onSubmit() {
  if(this.data.lemploiIndex==null)
  {
    this.emploiService.list.push(this.formData.value)
    this.dialogRef.close();
  }
  else
{
  this.emploiService.list[this.data.lemploiIndex] = this.formData.value;
}
this.dialogRef.close();
}

validateForm(formData: any){
  this.isValid=true;
  if(formData.codeMatiere =='')
    this.isValid=false;
    else if(formData.salle ==0)
    this.isValid=false;
    return this.isValid;
}
}



