import { Component, OnInit } from '@angular/core';
import { UserService} from '../../service/user.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl,Validators }
from '@angular/forms';
import { MustMatch } from '../../validator/must-match.validator';

import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    ]
})
export class RegisterComponent implements OnInit {
  submitted = false;
  userFile :any;
  public imagePath :any;
  imgURL: any;
  pwdd !:string;
  title :any;
  id :any;

  get f() { return this.crudApi.formData.controls; }

  constructor(public crudApi: UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router) { }
    
  ngOnInit() {
    if (this.crudApi.choixmenu == "A")
    {
    this.infoForm();
    this.title = "Add User";
  }
    else
    {
      this.title = "Update Profile";
      this.id =  localStorage.getItem('idUser');
    }
   }

   

  
  infoForm() {
    this.crudApi.formData = this.fb.group({
        id: null,
        username: ['', [Validators.required, Validators.minLength(5)]],
        nom: ['', [Validators.required, Validators.minLength(5)]],
        role: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [' ', [Validators.required, Validators.minLength(8)]],
        pwdd: ['', Validators.required]
         }, {
          
            validator: MustMatch('password', 'pwdd')
          
      });
    }
   
  

  onReset() {
    this.submitted = false;
    this.router.navigate(['/users']);
  }
  onSubmit() {
    this.submitted = true;
  
   
    const val = this.crudApi.formData.value;
 
      if (this.crudApi.choixmenu == "A")
      {
        this.addData();
      }
      else
      {
       this.updateData()
      }
  
}
 
login()
{
  this.router.navigate(['/login']);
}

   

addData() {
 const formData = new FormData();
    alert("add user ....")
    const users = this.crudApi.formData.value;
    formData.append('user', JSON.stringify(users));
    formData.append('file', this.userFile);
    this.crudApi.createData(formData).subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success'); 
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;
    }
     );
    
    this.router.navigate(['/users']);
  });
}

  updateData()
  {
    const formData = new FormData();
    const users = this.crudApi.formData.value;
    formData.append('user', JSON.stringify(users));
    formData.append('file', this.userFile);
    this.crudApi.updatedata(this.crudApi.formData.value.id,formData).subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');
        });
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;
      alert("ddd");}
     );
    this.router.navigate(['/users']);
  }
  onSelectFile(event :any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
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



  
}








