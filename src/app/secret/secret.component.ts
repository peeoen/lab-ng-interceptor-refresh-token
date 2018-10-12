import { Component, OnInit } from '@angular/core';
import { HttpService } from './../services/http.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  result: string;
  constructor(private httpService: HttpService) { }

  ngOnInit() {

  }

  async getNormal() {
    const res = await  this.httpService.getDataNotSecret();
    console.log(res);
  }

  async getSecret() {
    const res = await  this.httpService.getDataSecret();
    console.log(res);
  }
}
