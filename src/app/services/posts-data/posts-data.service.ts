import { Injectable } from '@angular/core';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/components/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsDataService {
  private posts: Post[] = [];
  private post: Post = {} as Post;
  public posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(
    this.posts
  );
  public post$: BehaviorSubject<Post> = new BehaviorSubject<Post>(
    this.post
  );

  constructor(
    public database: Database,
  ) {
    const starCountRef = ref(this.database, '/posts');             //GET
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.posts = Object.entries(data).map(item => item[1]) as Post[];
      this.posts$.next(this.posts);
    });
  }

  public addPost(post: any) {
    set(ref(this.database,'posts/' + post.id), {                         //   POST
    ...post
    });
    this.posts$.next(this.posts);
  }
 

  public getPost(postId:string) {
  const starCountRef = ref(this.database, 'posts/' + postId);             //GET
  onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  this.post = data;
  this.post$.next(this.post);
});
  }
  public edirPost () {}

  public removePost() {}

}
