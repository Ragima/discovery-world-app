import { Likes } from './../models/likes';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public isAuth: boolean = false;
  public likes: any = [];
  public isLiked: boolean = this.likes.find((item:any) => item.userId === this.user.id) === -1 ? false : true;

@Input()
public post: Post;


@Input()
public user: User;

  constructor(
    private _sanitizer: DomSanitizer,
    private router: Router,
    private postsDataService: PostsDataService
    ) { 
  }

  ngOnInit(): void {
    console.log('user----', this.user);
    this.likes = Object.values(this.post.likes);

   
  }

  onClick(post: Post) {
    this.router.navigate([`posts/view/${post.id}`])
  }

  onEdit($event: any, post: Post) {
    $event.stopPropagation();
    this.router.navigate([`posts/edit/${post.id}`])
 }

 onDelete($event: any,post: Post) {
  $event.stopPropagation();
  this.postsDataService.removePost(this.post.id);
 }
 
 onLikes($event: any) {
  $event.stopPropagation();
 }

 onLikesClick($event: any, post: Post) {
   const parent = $event.target.parentNode;
   let newPost = {
   ...post,
   likes: [...Array.from(post.likes), {
   id: new Date().getUTCMilliseconds(),
   userId: this.user.id
  }]
}

if(this.user.id) {
  this.isLiked = !this.isLiked;
  this.postsDataService.updateLikes(newPost, this.user.id);
    return;
  }
  parent.childNodes[0].classList.toggle('show');
 }

}
