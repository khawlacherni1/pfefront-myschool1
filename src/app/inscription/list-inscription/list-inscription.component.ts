import { Component, OnInit, Inject } from '@angular/core';
import { InscriptionService } from '../../service/inscription.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AddReglementComponent } from '../../reglement/add-reglement/add-reglement.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddInscriptionComponent } from '../../inscription/add-inscription/add-inscription.component';
declare var jsPDF: any;
import { AttestationComponent } from '../../inscription/attestation/attestation.component';
import { UserService} from '../../service/user.service';
import { ReglementService } from '../../service/reglement.service';
@Component({
  selector: 'app-list-inscription',
  templateUrl: './list-inscription.component.html',
  styles: [
  ]
})
export class ListInscriptionComponent implements OnInit {
  Inscription : any;
  SearchText:any;
  p :number = 1;
  constructor(public crudApi: InscriptionService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    public userService : UserService,
    public reglementService : ReglementService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddInscriptionComponent>,
    public dialogRef1: MatDialogRef<AttestationComponent>,
    public dialogRef2: MatDialogRef<AddReglementComponent>) { }
    
  ngOnInit() {

    this.getData();
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.list = response;
      }
    );
  }

  removeData(id :number) {
    if (window.confirm('Are sure you want to delete this Catégorie ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item: any) {
     this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(AddInscriptionComponent, dialogConfig);
  }
  addInscription() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(AddInscriptionComponent, dialogConfig);
  }

  impAttestation(id :number) {
    this.crudApi.choixmenu = "T";
    this.crudApi.id = id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(AttestationComponent, dialogConfig);
}

Reglement(id :number) {
  this.crudApi.choixmenu = "A";
  this.crudApi.id = id;
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width = "70%";
  this.matDialog.open(AddReglementComponent, dialogConfig);
}
}

