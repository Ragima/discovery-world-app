import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


@Input()
public post: Post;

  
  constructor(
    private _sanitizer: DomSanitizer,
    private router: Router) { 
  }

  ngOnInit(): void {
  }

  onClick(post: Post) {
    this.router.navigate([`posts/view/${post.id}`])
  }
}
