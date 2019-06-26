import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public user: string = '';
 
  constructor(private router: Router) { 
    var dataClient: any = localStorage.getItem('loginWebApp.user');
    if (dataClient) {
      this.user = dataClient;
    }
  }
 
  ngOnInit() {
  }
 
  logout() {
    localStorage.removeItem('loginWebApp.user');
    localStorage.removeItem('loginWebApp.token');
    this.router.navigateByUrl('/');
  }
}