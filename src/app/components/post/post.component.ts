import { Likes } from './../models/likes';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public isAuth: boolean = false;
  public tags: string[];
  public likes: any = [];
  public isLiked: boolean = this.likes.find((item:any) => item.userId === this.user.id) === -1 ? false : true;
  public newComment:string = '';
  public comments: any = [];
  public isHidden: boolean = true;

@Input()
public post: Post;


@Input()
public user: User;

  constructor(
    private router: Router,
    private postsDataService: PostsDataService
    ) { 
  }

  ngOnInit(): void {
    this.likes = Object.values(this.post.likes);
    this.comments = Object.values(this.post.comments);
    this.tags = this.post.tags.split(',').map(tag  => `#${tag}`);
  }

  onCancelClick($event: any) {
    this.isHidden = true;
    this.onStopPropogation($event);
    this.newComment = '';
  }
  onCommentClick($event: any) {
    this.postsDataService.addComment(this.post, this.user.id, this.newComment )
    this.onStopPropogation($event);
  }
  
  onCommentIconClick($event: any) {
    this.isHidden = !this.isHidden;
    this.onStopPropogation($event);
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
 
 onStopPropogation($event: any) { 
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
  // this.isLiked = !this.isLiked;   
  let filteredLikes = this.likes.filter((item:any) => item.userId !== this.user.id);
  let item = this.likes.find((item:any) => item.userId === this.user.id);
  
  // console.log(this.isLiked)
  // console.log('filteredLIkes', filteredLikes);
  // console.log('likesArray', this.likes);
  // console.log('findMethod', this.likes.find((item:any) => item.userId === this.user.id));
  

  let obj: any;
  if(item && item !== -1) {
    let obj = this.toObject(filteredLikes);
    this.postsDataService.removeLikes(post, obj, this.user.id);
  } else { 
    this.postsDataService.updateLikes(newPost, this.user.id);
  }
    return;
  }
  parent.childNodes[0].classList.toggle('show');
 }

  toObject(arr: Likes[]) {
  let obj = {} as any;
  for(let i = 0; i < arr.length; i++) {
  obj[arr[i]?.userId] = arr[i]
  }
  return obj;
 }



}
