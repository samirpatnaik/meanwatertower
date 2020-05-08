import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {FormGroup,
  FormControl,
  Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: []
})
export class ContactComponent implements OnInit {
  contactrec;
  msg;
  public frmDetails: FormGroup;
  constructor(protected dataService: DataService, protected httpClient: HttpClient) {
    this.frmDetails = new FormGroup({
      fname : new FormControl('', Validators.required),
      lname : new FormControl('', Validators.required),
      email : new FormControl('', [<any>Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
      phone : new FormControl('', Validators.required),
      message : new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

    this.dataService.getData('contactsection').subscribe(res => this.contactrec = res , err => console.log(err));
  }

 frmSubmit() {
   if (this.frmDetails.valid) {
     const msg = this.httpClient.post('http://127.0.0.1:8080/admin/sendMail', this.frmDetails.value)
       .subscribe((res: Response) => res,
         (err: HttpErrorResponse) => {
           if (err.error instanceof Error) {
             console.log('Client Side Error');
           } else {
             console.log('Sever Side Error');
           }
         });
   }
 }
}
