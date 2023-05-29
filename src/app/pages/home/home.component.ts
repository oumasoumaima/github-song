import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CloudDataService } from 'src/app/services/cloud-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  songsData!: Observable<any>;

  constructor(private cloudData: CloudDataService) { }

  ngOnInit(): void {
      this.songsData = this.cloudData.getData();
     
  }

}
