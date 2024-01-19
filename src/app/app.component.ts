import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './backend-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //providers : [BackendServiceService]
})
export class AppComponent implements OnInit {
  title = 'share-eat';
  utilisateurs : object = {};

  constructor(private backendService : BackendServiceService){

  }

  ngOnInit(){
    console.log('On init');
    this.backendService.getAllUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
      console.log(this.utilisateurs);
    });
  }
}
