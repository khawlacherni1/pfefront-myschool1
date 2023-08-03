import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbsenceService } from '../../service/absence.service';
import { UserService } from '../../service/user.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
@Component({
  selector: 'app-list-absence',
  templateUrl: './list-absence.component.html',
  styles: [
  ]
})
export class ListAbsenceComponent implements OnInit {
  p: number = 1;
  absenceListe: any;
  SearchText: any;
  constructor(private service: AbsenceService, private router: Router,
    private toastr: ToastrService, public fb: FormBuilder, public userService: UserService,
    private datePipe: DatePipe) { }

  ngOnInit() {

    this.refreshListe();

  }
  refreshListe() {
    this.service.getAll().subscribe(
      response => { this.absenceListe = response; }
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
  newAbsence() {
    this.service.choixmenu = "A"
    this.router.navigate(['/absence']);
  }

  selectData(item: any) {

    this.service.formData = this.fb.group(Object.assign({}, item));
    this.service.choixmenu = "M"
    this.router.navigate(['/absence']);
  }

}



