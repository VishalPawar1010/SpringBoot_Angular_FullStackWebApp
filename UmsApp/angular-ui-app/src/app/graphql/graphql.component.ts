import { Component, OnInit, ViewChild } from '@angular/core';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular';
import { searchForCourseOfferings } from './graphql.operations';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.css']
})
export class GraphQLComponent implements OnInit {
  title = 'angular-graphql-modular';
  searchForCourseOfferings: any[] = [];
  error: any;
  loading: boolean = true;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  constructor(private apollo: Apollo,
    private route: ActivatedRoute,
  ){}


  ngOnInit() {
    console.log("In GraphQLComponent")
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };

    this.route.paramMap.subscribe(() => {
      console.log('graphql list component');
      this.getOperation();
    });
  }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      language: {
        paginate: {
          first: '<i class="fas fa-angle-double-left pagination-icon"></i>',
          previous: '<i class="fas fa-angle-left pagination-icon"></i>',
          next: '<i class="fas fa-angle-right pagination-icon"></i>',
          last: '<i class="fas fa-angle-double-right pagination-icon"></i>',
        },
      },
    };
    setTimeout(() => {
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getOperation(){
    console.log("In getOperation");
    this.apollo.watchQuery({
      query: searchForCourseOfferings
    }).valueChanges.subscribe(({ data, error}: any) => {
        console.log("DATA : ", data)
      this.loading = false;
      this.searchForCourseOfferings = data.searchForCourseOfferings;
      error = error;
      console.log("ERROR : ", error)
    });
  }
}