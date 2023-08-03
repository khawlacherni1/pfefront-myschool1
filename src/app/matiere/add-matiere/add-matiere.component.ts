import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../../service/matiere.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styles: [
  ]
})
export class AddMatiereComponent implements OnInit {
  title: any;
  num: any;
  code !: string;
  constructor(public crudApi: MatiereService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddMatiereComponent>) { }
  get f() { return this.crudApi.formData.controls }
  ngOnInit() {

    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.title ="Ajout Matiere";
    }
    else
    {
      this.title ="Ajout Matiere";
    }

  }



  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
    });
  }
  ResetForm() {
    this.crudApi.formData.reset();
  }
  onSubmit() {

    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {

      this.updateData()
    }


  }

  lister() {
    this.router.navigate(['/Matieres']);
  }

  addData() {

    this.crudApi.createData(this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );
        this.router.navigate(['/Matieres']);
      });
  }
  updateData() {
    this.crudApi.updatedata( this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );
        this.router.navigate(['/Matieres']);
      });
  }

}

