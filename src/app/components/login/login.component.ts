import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLogged: boolean = true;
  public errorMessage: string = '';
  isError = false;

  constructor(
    private fb: FormBuilder,
    public database: Database,
    private router: Router,
  ) { 

    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
  }
 
  onInputChange() {
    this.errorMessage = '';
    this.isError = false;
  } 

  onLogin() {
    const loginObj = this.loginForm.value;
  try {
    const starCountRef = ref(this.database, 'users/' + loginObj?.username);             //GET
   onValue(starCountRef, (snapshot) => {
       const data = snapshot.val();
       if(data) {
         this.isLogged = data.email === loginObj.email && data.password === loginObj.password;
         if(this.isLogged) {        
          let userData = { user: data, isAuth: true}
           localStorage.setItem('userData', JSON.stringify(userData));
          //  localStorage.setItem('userData', JSON.stringify(data));
          //  localStorage.setItem('isAuth', JSON.stringify(true));
           this.router.navigate(['/posts']);
           this.loginForm.reset({
            username: '',
            email: '',
            password: '',
          })
         } else {
          this.errorMessage = `Please enter valid email and password `;
         }
      } else {         
       this.errorMessage = `User doesn't exist`;
      }      
    });
  } catch(err) {
     console.log('Error', err);
     this.isError = true;
  }
  }
}
