import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
  providers: [ServiceService]
})
export class ListUsersComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'website', 'action'];
  dataSource: any = [];

  constructor(private userService: ServiceService){
    this.getUsers();
  }


  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.dataSource = response;
      console.log(response);
    });
    
  }
  
}
