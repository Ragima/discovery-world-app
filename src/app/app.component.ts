import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'firebase-crud-discovery';

  constructor(
    public database: Database,
   
    ){

    window.addEventListener("beforeunload", function(e){
    //  this.window.localStorage.removeItem('isAuth');
    //  this.window.localStorage.removeItem('userData');
   }, false);
  }
  
  registerUser(value:any) {
    set(ref(this.database, 'users/' + value.username), {                         //   POST
      username: value.username,
      first_name: value.first_name,
      last_name : value.last_name
    });
    alert('User created!')
 


//-----------------------------------------------------------------------------------------
//     const starCountRef = ref(this.database, 'users/' + value.username);             //GET
//   onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   alert(data.first_name)
// });
//-----------------------------------------------------------------------------------------
//  update(ref(this.database, 'users/' + value.username), {                         //   UPDATE
//       // username: value.username,
//       first_name: value.first_name,
//       last_name : value.last_name
//     });
//     alert('User updated!');
//   }
// }
//-----------------------------------------------------------------------------------------

//remove(ref(this.database, 'users/' + value.username));                     //DELETE
//alert('removed');
}

}
