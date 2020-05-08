import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../data.service';


declare var $: any;

@Component({
  selector: 'app-projectdtls',
  templateUrl: './projectdtls.component.html',
  styleUrls: []
})
export class ProjectdtlsComponent implements OnInit, AfterViewInit {
  qryString;
  prjDtls;
  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router, private zone: NgZone) { }

  reloadPage() { // click handler or similar
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => this.qryString = params ['id']);
    this.dataService.getProjectData('projectdtls', {id: this.qryString}).subscribe(res => this.prjDtls = res , err => console.log(err));
    $.getScript('../../../assets/js/jssor.slider-21.1.2.mini.js');
    $.getScript('../../../assets/js/projectslider.js');
    // window.location.reload('Refresh', 1);
    this.refresh();
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
  ngAfterViewInit() {
    // this.refresh();
     // location.reload();
    //this.reloadPage();
  }
  goProjectList() {
    this.router.navigate(['/projectlist']);
  }

}
