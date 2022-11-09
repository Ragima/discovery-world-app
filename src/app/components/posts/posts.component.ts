import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChildren } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostComponent } from '../post/post.component';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { Post } from '../models/post';
const _ = require("lodash"); 


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  public isAuth: boolean = false;
  public user: any = '';
  public posts: Post[] = [];

  constructor(
    private storageService: StorageService,
    private postDataService: PostsDataService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.storageService.getItem('userData').subscribe(val => {
      const userData = JSON.parse(val);
      if(userData) {
        this.user = _.cloneDeep(userData?.user);          //clear
        this.isAuth = _.cloneDeep(userData?.isAuth);      //clear
        this.changeDetectorRef.markForCheck();            //clear
      } else {  
        this.isAuth = false;
        this.user = {} as User;
      }
     });
   this.postDataService.posts$
   .pipe(
    takeUntil(this.destroy$)
    )
    .subscribe((posts: Post[]) => {
     this.posts = _.cloneDeep(posts);
     this.changeDetectorRef.markForCheck();
    })  
   }

  ngOnInit(): void { }
  
  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
