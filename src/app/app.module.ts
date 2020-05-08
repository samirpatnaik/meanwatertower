import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { HeaderComponent } from './home/header/header.component';
import { BannerComponent } from './home/banner/banner.component';
import { ServiceComponent } from './home/service/service.component';
import { ProjectComponent } from './home/project/project.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import {DataService} from './data.service';

import {RouterModule, Routes} from '@angular/router';
import { ProjectlistComponent } from './projects/projectlist/projectlist.component';

import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectheaderComponent } from './projects/projectheader/projectheader.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { ProjectdtlsComponent } from './projectdetails/projectdtls/projectdtls.component';

const appRoute: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'projectlist', component: ProjectsComponent},
  {path: 'projectdetail/:id', component: ProjectdetailsComponent},
  {path: '**', component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    ServiceComponent,
    ProjectComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ProjectlistComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectheaderComponent,
    ProjectdetailsComponent,
    ProjectdtlsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
