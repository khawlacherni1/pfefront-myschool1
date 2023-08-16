
  import { Component, OnInit } from '@angular/core';
  import { InstitutService } from '../../service/institut.service'
  import { ToastrService } from 'ngx-toastr';
  import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
    from '@angular/forms';
  import { Router } from '@angular/router';
  import { MatDialogRef } from "@angular/material/dialog";
  @Component({
    selector: 'app-add-institut',
    templateUrl: './add-institut.component.html',
    styles: [
    ]
  })
  export class AddInstitutComponent implements OnInit {
  title : any;
  num : any;
  code !: string;
      constructor(public crudApi: InstitutService, public fb: FormBuilder, public toastr: ToastrService,
        private router: Router,public dialogRef:MatDialogRef<AddInstitutComponent>) { }
        get f() { return this.crudApi.formData.controls }
      ngOnInit() {

        if (this.crudApi.choixmenu == "A")
        { this.infoForm() ;
        this.title ="Ajout Institut";
        this.onSelectCode();
      }
        else
        {
          this.title ="Modification Institut"
        };
      }



      infoForm() {
        this.crudApi.formData = this.fb.group({
          id: null,
          code: ['', [Validators.required]],
          libelle: ['', [Validators.required]],
          libelleCourt: ['', [Validators.required]],
          adresse: ['', [Validators.required]],
          tel1: ['', [Validators.required]],
          tel2: ['', [Validators.required]],
          email: ['', [Validators.required]],
          slogant: ['', [Validators.required]],
        });
      }
      ResetForm() {
        this.crudApi.formData.reset();
      }
      onSelectCode() {

        this.crudApi.getCode().subscribe(
          response => {

            this.num = response;
            this.code = ( 1000 + this.num +1).toString().substring(1);

            this.f['code'].setValue(this.code);
          }
        );
      }
      onSubmit() {

          if (this.crudApi.choixmenu == "A") {
            this.addData();
          }
          else {

            this.updateData()
          }


      }

    lister()
    {
      this.router.navigate(['/Instituts']);
    }

      addData() {

        this.crudApi.createData(this.crudApi.formData.value).
          subscribe(data => {
            this.dialogRef.close();
            this.crudApi.getAll().subscribe(
              response =>{this.crudApi.list = response;}
             );
            this.router.navigate(['/instituts']);
          });
      }
      updateData() {
        this.crudApi.updatedata( this.crudApi.formData.value).
          subscribe(data => {
            this.dialogRef.close();
            this.crudApi.getAll().subscribe(
              response =>{this.crudApi.list = response;}
             );
            this.router.navigate(['/instituts']);
          });
      }

  }
