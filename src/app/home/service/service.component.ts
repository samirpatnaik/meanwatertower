import { Component, OnInit } from '@angular/core';
import { DataService} from '../../data.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: []
})
export class ServiceComponent implements OnInit {

  buildrec;
  designrec;
  planrec;
  servicegal;
  constructor( protected dataService: DataService) { }

  ngOnInit() {
      this.dataService.getData('buildsection').subscribe(res => this.buildrec = res, err => console.log(err));
      this.dataService.getData('designsection').subscribe(res => this.designrec = res, err => console.log(err));
      this.dataService.getData('plansection').subscribe(res => this.planrec = res, err => console.log(err));
      this.dataService.getData('servicegallery').subscribe(res => this.servicegal = res, err => console.log(err));
  }

}
