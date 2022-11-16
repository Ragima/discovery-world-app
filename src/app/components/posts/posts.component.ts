import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChildren } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Subject, takeUntil } from 'rxjs';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { PagingConfig } from '../models/paging-config.model';
import { Post } from '../models/post';
const _ = require("lodash"); 


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements  PagingConfig {

  title = 'ngx-paging-sample';

  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  tableSize: number[] = [5, 10, 15, 20];
  pagingConfig: PagingConfig = {} as PagingConfig;

  private destroy$: Subject<void> = new Subject<void>();
  public isAuth: boolean = false;
  public user: any = '';
  public posts: Post[] = [];

  constructor(
    private storageService: StorageService,
    private postDataService: PostsDataService,
    private changeDetectorRef: ChangeDetectorRef,
   ) {
    // this.storageService.getItem('userData').subscribe(val => {
    //   const userData = JSON.parse(val);
    //   if(userData) {
    //     this.user = _.cloneDeep(userData?.user);          //clear
    //     this.isAuth = _.cloneDeep(userData?.isAuth);      //clear
    //     this.changeDetectorRef.markForCheck();            //clear
    //   } else {  
    //     this.isAuth = false;
    //     this.user = {} as User;
    //   }
    //  });
    this.getUsers();
    this.getPosts();
  //  this.postDataService.posts$
  //  .pipe(
  //   takeUntil(this.destroy$)
  //   )
  //   .subscribe((posts: Post[]) => {
  //    this.posts = _.cloneDeep(posts);
  //    this.pagingConfig.totalItems = posts.length;
  //    this.changeDetectorRef.markForCheck();
  //   })  
   }
  
   onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
    this.getPosts();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getPosts();
  }

getPosts() {
  this.postDataService.posts$
  .pipe(
   takeUntil(this.destroy$)
   )
   .subscribe((posts: Post[]) => {
    this.posts = _.cloneDeep(posts);
    this.pagingConfig.totalItems = posts.length;
    this.changeDetectorRef.markForCheck();
   })  
}

getUsers() {
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
}

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
