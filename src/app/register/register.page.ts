import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  data: any = {}
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  registerByEmail() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.data.email, this.data.password).then(() => {
      console.log('TODO BIEN')
    }).catch(err => {
      alert(err.message)
    })
  }

}
