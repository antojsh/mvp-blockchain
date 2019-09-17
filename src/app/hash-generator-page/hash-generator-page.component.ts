import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from '@ionic/angular';
import * as sha256 from 'sha256';

@Component({
  selector: 'app-hash-generator-page',
  templateUrl: './hash-generator-page.component.html',
  styleUrls: ['./hash-generator-page.component.scss'],
})
export class HashGeneratorPageComponent implements OnInit {

  @Input('onlyText') onlyText: boolean;
  @Input('onlyImages') onlyImages: boolean;
  typeFilesAccept: String = "image/*";
  base64String: String;
  subject: String = ""
  constructor(public loadingController: LoadingController, private http: HttpClient, private afAuth: AngularFireAuth) {

  }

  ngOnInit() {
    this.typeFilesAccept = this.onlyImages ? "image/*" : "*";
  }

  generateHashByText() {
    if (!this.onlyText || !this.subject) {
      return;
    }

    this.base64String = sha256(this.subject);
  }
  openFiles() {
    let id = this.onlyImages ? "fileInputImage" : "fileInputFiles"
    document.getElementById(id).click()
  }

  generateSha253(evt) {
    const file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = ((theFile) => {
      return (e) => {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        this.base64String = sha256(window.btoa(binaryData));
        //showing file converted to base64
        console.log(this.base64String)
      };
    })(file);
    reader.readAsBinaryString(file);
  }


  //+ "&subject=" + this.subject
  sendHash() {
    this.presentLoading()
    this.afAuth.user.subscribe(user => {
      let reference = user.uid;
      fetch("https://api.stamping.io/stamp/?evidence=" + this.base64String + "&reference=" + reference + "&subject=" + this.subject, {

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic MTU2ODczMDgwMjc0MTozMDhhOGUzMmE4MDdiNTQ0ZjY3YjQ1YjA4NDNkMQ=="
        }
      }).then(Response => {
        if (Response.ok) {
          this.loadingController.dismiss();
          this.base64String = "";
          this.subject = "";
          alert('Hash Saved')
        }
      }).catch(err => {
        this.loadingController.dismiss();
        alert(err)
      })
    })

  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Saving Hash'
    });
    await loading.present();
  }

}
