import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data: any = {}
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  loginGoogle(): Promise<void> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (result) => {

      }).catch(err => {
        alert(err.message)
      })
  }

  loginFacebook(): Promise<void> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (result) => {
        this.router.navigate(['/tabs'])
      }).catch(err => {
        alert(err.message)
      })
  }

  LoginWithEmail(form): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(this.data.email, this.data.password).catch(err => {
      alert(err.message)
    })
  }


}
