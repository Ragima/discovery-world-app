import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsDataService } from '../services/posts-data/posts-data.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
      PostComponent,
      PostsComponent,
    ],
    imports: [CommonModule, FormsModule, HttpClientModule, FormsModule, NgxPaginationModule],
    providers: [PostsDataService],
    exports: [PostsComponent],
  })
  export class PostsModule {}