import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink,MatToolbarModule,MatMenuModule,
    MatBadgeModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  logged_in: boolean = false;
  language: string = 'English';
  user_role!: any;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  ngDoCheck() {
    this.user_role = sessionStorage.getItem("role");
    const user_sesson_id = sessionStorage.getItem("user_session_id");
    if(user_sesson_id){
      this.logged_in = true;
    }
  }
  logout(){
    sessionStorage.removeItem("user_session_id");
    sessionStorage.removeItem("role");
    this.router.navigateByUrl('/sign-in');
    location.reload();
  }


}
