import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styles: [
  ]
})
export class ForgetPasswordComponent implements OnInit {
  submitted = false;
  form !: FormGroup;
  get f() { return this.form.controls; }
  constructor(public service: UserService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>) { }

  ngOnInit() {
    if (this.service.choixmenu == "A") {
      this.infoForm();

    }
  }

  infoForm() {
    this.form = this.fb.group({
      email: [' ', [Validators.required, Validators.minLength(8)]],
      password: ['', Validators.required]
    });
  }



  onReset() {
    this.submitted = false;
    this.dialogRef.close();
    this.router.navigate(['/users']);
  }
  onSubmit() {

    this.service.forgetPassword(this.form.value.email,this.form.value.password).
      subscribe(data => {
        this.dialogRef.close();
        this.service.getAll().subscribe(
          response => { this.service.list = response; }
        );
        this.router.navigate(['/users']);
      });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
  
  