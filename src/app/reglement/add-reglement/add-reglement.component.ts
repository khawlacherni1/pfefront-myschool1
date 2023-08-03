import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CompteurService } from '../../service/compteur.service';
import { ReglementService } from '../../service/reglement.service';
import { LreglementService } from '../../service/lreglement.service';
import { EtudiantService } from '../../service/etudiant.service';
import { TypepaiementService } from '../../service/typepaiement.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { InscriptionService } from '../../service/inscription.service';
import { AddLreglementComponent } from '../../reglement/add-lreglement/add-lreglement.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Observable } from "rxjs";
@Component({
  selector: 'app-add-reglement',
  templateUrl: './add-reglement.component.html',
  styles: [
  ]
})
export class AddReglementComponent implements OnInit {
  title : any;
  annee = 0;
  etudiantList: any = [];
  typePaiementList: any = [];
  isValid: boolean = true;
  Date: any;
  inscription :any;
  compteur: any = {};
  client: any = {};
  lreglement: any = {};
  constructor(public service: ReglementService,
    public compteurservice: CompteurService,
    public etudiantService: EtudiantService,
    public typePaiementService: TypepaiementService,
    private dialog: MatDialog, public fb: FormBuilder,
    public lreglementService: LreglementService,
    public inscriptionService :InscriptionService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    public dialogRef:MatDialogRef<AddReglementComponent>,
    private datePipe: DatePipe) { }
  get f() { return this.service.formData.controls; }
  ngOnInit() {
    this.Date = this.transformDate(new Date());
    this.annee = (this.Date).toString().substring(0, 4);
    //  let id =this.currentRoute.snapshot.paramMap.get('id');
    if (this.service.choixmenu == "A") {
      this.InfoForm();
      this.onSelectCompteur(this.annee);
      this.f['dateReglement'].setValue(this.Date);
      this.f['annee'].setValue(this.annee);
      this.etudiantService.getAll().subscribe(
        response => { this.etudiantList = response; }
      )
      
        this.typePaiementService.getAll().subscribe(
          response => { this.typePaiementList = response; }
      );
      this.service.list = [];
    
      this.getData(this.inscriptionService.id);
      this.title = "Ajout Reglement";
    }
    else
    {
      this.lreglementService.getAll(this.service.formData.value.numero).subscribe(
        response => { this.service.list = response }
      );
      this.title = "Modification Reglements"
     
    }
   
    
  }


  onSelectCompteur(id: number) {
    this.compteurservice.getData(id).subscribe(
      response => {
        this.compteur = response;
        this.f['numero'].setValue((this.annee * 10000) + this.compteur.numReglement);
      }
    );
  }


  InfoForm() {
    this.service.formData = this.fb.group({
      id: null,
      annee: [0, [Validators.required]],
      numero: [0, [Validators.required]],
      dateReglement: ['', [Validators.required]],
      matricule: [0, [Validators.required]],
      nom : ['', [Validators.required]],
      prenom : ['', [Validators.required]],
      classe: ['', [Validators.required]],
      numInscription : [0, [Validators.required]],
      libelle : ['', [Validators.required]],
      typePaiement: [0, [Validators.required]],
      montant: 0,
      lreglements: [],
    });
  }
  getData(id :number) {
    this.inscriptionService.getData(id).subscribe(
      response => {
        this.inscription = response;
        
        this.f['matricule'].setValue(this.inscription.matricule);
        this.f['nom'].setValue(this.inscription.nom);
        this.f['prenom'].setValue(this.inscription.prenom);
        this.f['numInscription'].setValue(this.inscription.numero);
        this.f['montant'].setValue(this.inscription.montant);
        this.f['classe'].setValue(this.inscription.classe);
        this.f['libelle'].setValue('Reglément Frais inscription');
      }
    );
    }
  ResetForm() {
    this.service.formData.reset();
  }

  AddData(lreglementIndex: any, Id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { lreglementIndex, Id };
    this.dialog.open(AddLreglementComponent, dialogConfig).afterClosed().subscribe(b10 => {
      this.updateTotal();
    });
  }

  onDelete(item: any, Id: number, i: number) {
    if (Id != null)
      this.service.formData.value.id += Id;
    this.service.list.splice(i, 1);
    this.updateTotal();
  }

  updateTotal() {
    this.f['montant'].setValue(this.service.list.reduce((prev: any, curr: any) => {
      return prev + curr.montant * 1;
    }, 0));
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.value.nom == null)
      this.isValid = false;
    else if (this.service.list.length == 0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
    this.validateForm();
    if (this.isValid)
    {
      this.f['lreglements'].setValue(this.service.list);
      this.service.createData(this.service.formData.value).
        subscribe(inscription => {
          this.dialogRef.close();
          this.toastr.success('Validation Faite avec Success');
          this.service.getAll().subscribe(
            response => {
              this.service.list = response;
            }
          );
          this.router.navigate(['/reglements']);
        });
    }
    else
    {
      this.toastr.success('Veuillez vérifier Vos données....'); 
    }
    
  }



  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}










