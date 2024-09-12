import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BestSellersComponent } from "../best-sellers/best-sellers.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, BestSellersComponent,BestSellersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(private _AuthService:AuthService){

}

}
