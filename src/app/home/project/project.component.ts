import { Component, OnInit, AfterViewInit  } from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: []
})
export class ProjectComponent implements OnInit {

  galleryimg;
  constructor(protected dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getData('project').subscribe(res => this.galleryimg = res, err => console.log(err));
    this.refresh();
  }

  goProjectList() {
    this.router.navigate(['/projectlist']);
  }

  goProjectDtlsList(arg) {
    this.router.navigate(['/projectdetail', arg]);
  }

  refresh() {
    if ( window.localStorage ) {
      if ( !localStorage.getItem('firstLoad') ) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      } else {
        localStorage.removeItem('firstLoad');
      }
    }
  }
}
