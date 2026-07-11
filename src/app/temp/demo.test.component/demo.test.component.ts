import { Component, inject } from '@angular/core';
import { DemoTestService } from '../../core/services/demo.test.services/demo.test.service';

@Component({
  selector: 'app-demo.test.component',
  imports: [],
  templateUrl: './demo.test.component.html',
  styleUrl: './demo.test.component.css',
})
export class DemoTestComponent {
  private demoTestService = inject(DemoTestService);
  testDemo() {
    this.demoTestService.getMyProfile().subscribe({
      next: (response) => {
        console.log(response);
      }
    });

    this.demoTestService.viewMyDonationHistory().subscribe({
      next: (response) => {
        console.log(response);
      }
    });

    this.demoTestService.getMyCampaigns().subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }
}
