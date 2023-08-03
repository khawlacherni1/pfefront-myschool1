import { Component, OnInit } from '@angular/core';
import { UserService} from '../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {
 name :any;
 id :any;
 role : any;
  constructor(public userService: UserService,private router: Router ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.id = localStorage.getItem("idUser");
    this.role =localStorage.getItem("role");
  }
logOut()
{
  this.router.navigate(['/login']);
  }
}

