import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  login:boolean=false;
  constructor(private _AuthService:AuthService,private _Router:Router ){
    this._AuthService.currentUser.subscribe(()=>{
      if(_AuthService.currentUser.getValue() != null){this.login = true}
      else {this.login = false}
    })
  }
  logout()
  {
    this._AuthService.logout();
    this._Router.navigate(['/login']);

  }

}
