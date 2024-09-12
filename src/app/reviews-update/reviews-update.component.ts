import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reviews-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reviews-update.component.html',
  styleUrl: './reviews-update.component.scss'
})
export class ReviewsUpdateComponent implements OnInit,OnDestroy{
  id:string = '';
  img:string = '';
  errMsg:string = '';
  subscribe:any;
  review:any={};
constructor(private _ActivatedRoute:ActivatedRoute,private _AuthService:AuthService,private _ReviewsService:ReviewsService,private _Router:Router){}
  updateReviewForm = new FormGroup({
    rating:new FormControl(undefined,[Validators.min(1),Validators.max(5)]),
    comment:new FormControl(undefined),
  })
ngOnInit(): void {
  this._AuthService.checkToken();
  this.id = this._ActivatedRoute.snapshot.params['id'];
  this.loadReview()
}


loadReview()
{
  this.subscribe=this._ReviewsService.getReview(this.id).subscribe({
    next:(res)=>{
        this.review = res.data;
    },error:(err)=>{}
  })
}

updateReview(updateReviewForm:FormGroup)
{
  updateReviewForm.value.comment=updateReviewForm.value.comment || this.review.comment;
  updateReviewForm.value.rating=updateReviewForm.value.rating || this.review.rating;
  this._ReviewsService.updateUserReview(this.id,updateReviewForm.value).subscribe({
    next:(res)=>{
      this._Router.navigate(['/myReviews'])
    },error:(err)=>{
      this.errMsg = err.error.message;
      console.log(this.errMsg)
    }
  })
}
ngOnDestroy(): void {
  this.subscribe.unsubscribe();
}

}
