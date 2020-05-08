import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: []
})
export class AboutComponent implements OnInit {
  aboutrec;
  teamrec;
  constructor(protected dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.getData('aboutus').subscribe(res => this.aboutrec = res, err => console.log(err));
    this.dataservice.getData('teamsection').subscribe(res => this.teamrec = res, err => console.log(err));
  }

}
