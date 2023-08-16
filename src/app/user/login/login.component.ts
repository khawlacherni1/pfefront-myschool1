import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user: any = {};
  form!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage !: string;
  name !: string;
  Wdate: any;
  annee !: 0;
  loginForm !: FormGroup;

  constructor(private router: Router, private userService: UserService,
    public toastr: ToastrService, private datePipe: DatePipe, public fb: FormBuilder) { }
  ngOnInit() {
    this.userService.islogin = false;
    this.userService.admin = false;
    this.userService.enseignant = false;
    this.userService.etudiant = false;
    this.userService.rfi = false;
    this.userService.rit = false;

    this.form = this.fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const val = this.form.value;

    this.userService.login(val.username).subscribe(

      res => {

        this.user = res;
        if (this.user)
        {
      if (this.user.password == val.password) {
          localStorage.setItem("name", this.user.nom);
          localStorage.setItem("idUser", this.user.id);
          localStorage.setItem("code", this.user.matricule);
          localStorage.setItem("role", this.user.role);
          localStorage.setItem("matricule", this.user.matricule);
          this.userService.islogin = true;

          if (this.user.role == "ETUDIANT") {
            this.userService.etudiant = true;
            this.router.navigate(['/course']);
          }
          else {
            this.router.navigate(['/about']);
            if (this.user.role == "ENSEIGNANT")
              this.userService.enseignant = true;
            else if (this.user.role == "RIT")
              this.userService.rit = true;
              else if (this.user.role == "RFI")
              this.userService.rfi = true;
              else if (this.user.role == "ADMIN")
              this.userService.admin = true;
          }
        }
        else {
          this.toastr.warning('Mot de Passe  Incorrecte ')
        }
      }
       else
       {
        this.toastr.warning('Login Incorrecte ')
       }



    }
    );
  }


  register() {
    this.router.navigate(['/register']);
  }

  logOut() {
    localStorage.removeItem("name");
  }



  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('name');

  }
}
