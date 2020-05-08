import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: []
})
export class BannerComponent implements OnInit {

  bannerRec;
  constructor(protected dataService: DataService) { }

  ngOnInit() {
     this.dataService.getData('homebanner').subscribe(res => this.bannerRec = res, err => console.log(err));
  }

}
