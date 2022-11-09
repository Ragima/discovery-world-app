import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_CONFIGURATION } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { Post } from '../models/post';
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

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private postsDataService: PostsDataService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    ) { 
    this.postsDataService.post$
    .pipe(
      takeUntil(this.destroy$)      
    )
    .subscribe(val => {
      this.post = val;
    })
  }

  ngOnInit(): void {
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
  }
 
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
