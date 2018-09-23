import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hook-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  toggleOn: boolean = false;

  linkList = [
    { link: 'home', text: 'Home', scroll: false },
    { link: 'blog', text: 'Blog', scroll: false },
    { link: 'admin', text: 'Admin', scroll: false }
  ];

  constructor() { }

  ngOnInit() {
  }

  checkWindowWidth() {
    this.toggleOn = (window.innerWidth >= 640) ? false : this.toggleOn;
  }

  toggleStatus() {
    return (this.toggleOn) ? ' toggle-on' : '';
  }

  dropdownStatus() {
    return (this.toggleOn) ? ' show' : '';
  }

}
