import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { Post } from '../models/post';
import { User } from '../models/user';
const _ = require("lodash"); 

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public post: Post = {} as Post;
  public postId: string | null = null;
  public errorMessage: string | null = null;
  public tags: string[];
  public users: User[] = [];
  public user: User;
  public postCreatedUser: any;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private storageService: StorageService,
    private postsDataService: PostsDataService,
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService,
    private changeDetectorRef: ChangeDetectorRef,
    ) { 

      this.storageService.getItem('userData').subscribe(val => {
        const userData = JSON.parse(val);
        if(userData) {
          this.user = _.cloneDeep(userData?.user);  
          this.changeDetectorRef.markForCheck();     
        } else {  
          this.user = {} as User;
        }
       })
    this.postsDataService.post$
    .pipe(
      takeUntil(this.destroy$)      
    )
    .subscribe(val => {
      this.post = val;
    })
  }

  ngOnInit(): void {
    this.userDataService.users$.subscribe(val => {
      this.users = val
    }, (err) => {
      this.errorMessage = `Error: ${err}`;
    });
     this.postCreatedUser = this.users.find(user => user.id === this.post.userId);

    this.tags = this.post?.tags?.split(',').map(tag  => `#${tag}`);   
    this.loading = true;    
    this.activatedRoute.paramMap.subscribe((param) => {
      this.postId = param.get('postId');
    });
    
    if(this.postId) {
     this.postsDataService.getPost(this.postId);
     this.postsDataService.post$
     .subscribe(val => {
      this.post = _.cloneDeep(val);
      this.changeDetectorRef.markForCheck();
      this.loading = false;
     }, (err) => {
      this.errorMessage = `Error: ${err}`;
     })
    } else {
      console.log('else')
    }

    console.log('users---------->', this.users, this.user)
  }
 
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
