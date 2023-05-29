import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent implements OnInit {
  songs: any[] = []; // Placeholder for your song data
  genres: any[] = [];
  selectedGenre: string = '';
  isGenreDropdownOpen: boolean = false;

  toggleGenreDropdown() {
    this.isGenreDropdownOpen = !this.isGenreDropdownOpen;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/data.json').subscribe(data => {
      this.genres = data;

      // Assuming you want to load the first genre's songs initially
      if (this.genres.length > 0) {
        this.songs = this.genres[0].list;
      }
    });
  }

  setSelectedGenre(genre: any) {
    this.selectedGenre = genre.name;
    this.songs = genre.list;
  }
}
