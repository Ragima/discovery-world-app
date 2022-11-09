import { Database, ref, set } from '@angular/fire/database';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { Observable, ReplaySubject } from 'rxjs';
import { PostsDataService } from 'src/app/services/posts-data/posts-data.service';
// import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent implements OnInit {
 
  public createPostForm: FormGroup;
  public base64Output : string;

  constructor(
    private fb: FormBuilder,
    public database: Database,
    private router: Router,
    private storageService: StorageService,
    private postDataService: PostsDataService
  ) { 
    this.createPostForm = this.fb.group({
      cityName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      photoUrl: new FormControl('', [Validators.required]),
    })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formValue = this.createPostForm.value;
    let newPost = {}
    this.storageService.getItem('userData').subscribe(val => {
      const userData = JSON.parse(val);
      const { user } = userData;
      newPost = {                         //   POST
        id: new Date().getUTCMilliseconds(),
          userId: userData.user.id,
          dateOfCreate: new Date(),
          likes: [],
          comments: [],
          photo: this.base64Output,
          cityName: formValue.cityName,
          description: formValue.description,
          photoUrl: formValue.photoUrl,
          tags: formValue.tags 
        }
        console.log('create------------', formValue, newPost)
      this.postDataService.addPost(newPost)
      this.router.navigate(['/posts'])
    
     })  
  }
 
  onFileSelected(event: any ) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}
