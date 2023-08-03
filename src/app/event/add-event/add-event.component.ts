
import { Component, OnInit , Inject} from '@angular/core';
import { EventService } from '../../service/event.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styles: [
  ]
})
export class AddEventComponent implements OnInit {
  submitted = false;
  eventFile: any;
  public imagePath: any;
  imgURL: any;
  date: any;
  annee: any;
  numero: any;
  title: any;
  id: any;

  get f() { return this.service.formData.controls; }

  constructor(public service: EventService, public fb: FormBuilder, public toastr: ToastrService,
    public datePipe: DatePipe, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEventComponent>,) { }

  ngOnInit() {
    if (this.service.choixmenu == "A") {
      this.infoForm();
      this.title = "Add Event";
      this.date = this.transformDate(new Date(Date.now()));
      this.annee = (this.date).toString().substring(0, 4);;
      this.f['annee'].setValue(this.annee);

      this.onSelectNumero(this.annee);
    }
    else {
      this.title = "Update Event";

    }
  }




  infoForm() {
    this.service.formData = this.fb.group({
      id: null,
      annee: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      libelle: ['', [Validators.required, Validators.minLength(5)]],
      lieu: ['', [Validators.required, Validators.minLength(5)]],
      ville: ['', [Validators.required]],
      pays: ['', [Validators.required, Validators.minLength(3)]],
      dateDebut: ['', [Validators.required, Validators.email]],
      nbj: [0, [Validators.required, Validators.email]],
      nombre: ['', [Validators.required, Validators.email]],
      tarif: [' ', [Validators.required, Validators.minLength(8)]],
      typeEvent: ['', Validators.required]
    });
  }

  onSelectNumero(ann: number) {
    this.service.getNumero(ann).subscribe(
      response => {
        this.numero = response;
        if (this.numero == 0) {
          this.numero = (ann * 10000) + this.numero + 1;
        }
        else {
          this.numero = this.numero + 1;
        }
        this.f['numero'].setValue(this.numero);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.router.navigate(['/events']);
  }
  onSubmit() {
    this.submitted = true;


    const val = this.service.formData.value;

    if (this.service.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }

  }





  addData() {
    const formData = new FormData();
    const event = this.service.formData.value;
    formData.append('event', JSON.stringify(event));
    formData.append('file', this.eventFile);
    this.service.createData(formData).subscribe(data => {
      this.toastr.success('Validation Faite avec Success');
      this.dialogRef.close();
      this.service.getAll().subscribe(
        response => {
          this.service.list = response;
        }
      );

      this.router.navigate(['/events']);
    });
  }

  updateData() {
    this.service.updatedata(this.service.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.service.getAll().subscribe(
          response => { this.service.list = response; }
        );
        this.router.navigate(['/events']);
      });
  }
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.eventFile = file;
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


}








