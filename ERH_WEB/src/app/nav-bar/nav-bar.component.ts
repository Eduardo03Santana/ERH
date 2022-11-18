import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isCollapsed: boolean = false;
  public titulo?: string;
  constructor(title: Title, router: Router) {
    this.titulo = title.getTitle()
    console.error(this.titulo);
  }
  ngOnInit(): void {
  }
}
