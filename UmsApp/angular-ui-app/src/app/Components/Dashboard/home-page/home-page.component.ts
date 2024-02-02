import { Component, OnInit } from '@angular/core';
import { NodeHomeService } from 'src/app/services/NodeServices/node-home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  dataFromApi:any;

  constructor(private nodeService: NodeHomeService) {}

  ngOnInit() {
    this.nodeService.getDataFromNodeApi().subscribe(data => {
      console.log('data node in component= ',data)
      this.dataFromApi = data.test;
    });
  }
}
