import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../services/profiles/userdata/userdata.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  users: any[] = []; 
  searchQuery: string = '';

  constructor(private userdataservice: UserdataService) {}

  ngOnInit(): void {
    this.userdataservice.getAllUser().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  filteredUsers(): any[] {
    if (!this.searchQuery) {
      return this.users;
    }
    return this.users.filter(user => 
      user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
