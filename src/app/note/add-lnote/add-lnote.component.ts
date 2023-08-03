
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EtudiantService } from '../../service/etudiant.service';
import { NgForm } from '@angular/forms';
import { NoteService } from '../../service/note.service';
import { LnoteService } from '../../service/lnote.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
@Component({
  selector: 'app-add-lnote',
  templateUrl: './add-lnote.component.html',
  styles: [
  ]
})
export class AddLnoteComponent implements OnInit {
  formData!: FormGroup;
  etudiantList: any = [];
  isValid: boolean = true;

  constructor(public service: LnoteService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddLnoteComponent>,
    public etudiantService: EtudiantService,
    public fb: FormBuilder) { }
  get f() { return this.formData.controls; }


  ngOnInit() {

    this.formData = this.fb.group(Object.assign({}, this.etudiantService.list[this.data.lnoteIndex]));
  }




  InfoForm() {
    this.formData = this.fb.group({
      id: null,
      numero: this.data.numero,
      matricule: 0,
      nom: '',
      moy: 0,


    });
  }






  onSubmit() {
    this.etudiantService.list[this.data.lnoteIndex] = this.formData.value;
    this.dialogRef.close();
  }

  validateForm(formData: any) {
    this.isValid = true;
    if (formData.matricule == 0)
      this.isValid = false;
    else if (formData.note < 0)
      this.isValid = false;
    return this.isValid;
  }
}



