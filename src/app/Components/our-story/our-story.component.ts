import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentService } from '../../Services/content.service';
@Component({
  selector: 'app-our-story',
  imports: [],
  templateUrl: './our-story.component.html',
  styleUrl: './our-story.component.scss',
})
export class OurStoryComponent implements OnInit {
  data: any;
  constructor(private dataService: ContentService) {
    console.log(this.data);
  }
  ngOnInit(): void {
    this.dataService.getContent().subscribe({
      next: (data) => {
        this.data = data;
        console.log(this.data);
      },
      error: () => {
        console.log('there is an error');
      },
    });
  }
}
