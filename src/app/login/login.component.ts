import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { HttpService } from './../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username: string = 'satadmin';
  password: string = '1234';
  showError = false;
  showMessageError: string;
  constructor(private httpService: HttpService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }


  async login() {
    try {
      this.showError = true;
      await this.authService.login(this.username, this.password);
      this.router.navigate(['secret']);
    } catch (err) {
      this.showMessageError = 'username or password is invalid';
      this.router.navigate(['login']);
    }
  }

  logout() {

  }
}
