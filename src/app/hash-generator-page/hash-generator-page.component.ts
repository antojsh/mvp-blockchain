import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as sha256 from 'sha256';

@Component({
  selector: 'app-hash-generator-page',
  templateUrl: './hash-generator-page.component.html',
  styleUrls: ['./hash-generator-page.component.scss'],
})
export class HashGeneratorPageComponent implements OnInit {

  @Input('onlyImages') onlyImages: boolean;
  typeFilesAccept: String = "image/*";
  base64String: String;
  subject: String = ""
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.typeFilesAccept = this.onlyImages ? "image/*" : "*"
    console.log(sha256('hellow'))
  }

  openFiles() {
    document.getElementById('fileInput').click()
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
    let headers = new HttpHeaders()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", "Basic MTU2ODczMDgwMjc0MTozMDhhOGUzMmE4MDdiNTQ0ZjY3YjQ1YjA4NDNkMQ==")
    this.http.post("https://api.stamping.io/stamp?evidence=" + this.base64String, {}, {
      headers
    }).subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

}
