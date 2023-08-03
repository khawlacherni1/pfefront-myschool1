import { Component, OnInit } from '@angular/core';
import { BanqueService } from '../../service/banque.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-banque',
  templateUrl: './add-banque.component.html',
  styles: [
  ]
})
export class AddBanqueComponent implements OnInit {
  title: any;
  num: any;
  code !: string;
  constructor(public crudApi: BanqueService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, public dialogRef: MatDialogRef<AddBanqueComponent>) { }
  get f() { return this.crudApi.formData.controls }
  ngOnInit() {

    if (this.crudApi.choixmenu == "A") {
      this.infoForm();
      this.title ="Ajout Banque";
    }
    else
    {
      this.title ="Modification Banque";
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
    this.router.navigate(['/Banques']);
  }

  addData() {
     this.crudApi.createData(this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );
        this.router.navigate(['/banques']);
      });
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );
        this.router.navigate(['/banques']);
      });
  }

}

