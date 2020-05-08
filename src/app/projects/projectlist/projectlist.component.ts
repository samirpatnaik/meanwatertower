import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: []
})
export class ProjectlistComponent implements OnInit {

  projectlist;
  constructor(protected dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData('project').subscribe(res => this.projectlist = res , err => console.log(err));
  }

}
