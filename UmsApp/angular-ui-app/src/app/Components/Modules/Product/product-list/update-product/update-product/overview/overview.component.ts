import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

  saveOverviewAndNavigate() {
    // Save product details for the overview section here
    // For example, make an HTTP request to save the data

    // If saving is successful, navigate to the description section
    // You can use router.navigate or CdkStepper to go to the next step
    // this.router.navigate(['description']); // Replace 'description' with your route
    }
}

