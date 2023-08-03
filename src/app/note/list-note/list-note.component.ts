import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from '../../service/note.service';
import { UserService } from '../../service/user.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',

})
export class ListNoteComponent implements OnInit {
  p: number = 1;
  SearchText: any;
  constructor(public service: NoteService, private router: Router,
    private toastr: ToastrService, public fb: FormBuilder, public userService: UserService,
    private datePipe: DatePipe) { }

  ngOnInit() {

    this.refreshListe();

  }
  refreshListe() {
    this.service.getAll().subscribe(
      response => { this.service.list = response; }
    );

  }


  removeData(id: any) {
    if (window.confirm('Are sure you want to delete this Cours ?')) {
      this.service.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.refreshListe();
          },
          error => console.log(error));
    }
  }
  newNote() {
    this.service.choixmenu = "A"
    this.router.navigate(['/note']);
  }

  selectData(item: any) {

    this.service.formData = this.fb.group(Object.assign({}, item));
    this.service.choixmenu = "M"
    this.router.navigate(['/note']);
  }

}



