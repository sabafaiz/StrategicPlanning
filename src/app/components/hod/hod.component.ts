import {Component} from '@angular/core';
import {OrganizationService2} from '../../providers/organization.service2';
@Component({
  selector:'hod-home-page',
  templateUrl:'./hod.component.html'
})
export class HODComponent{
  public assignedActivities = [];
  constructor(public orgService:OrganizationService2){
    this.orgService.fetchAssignedActivity().subscribe(response =>{
      if(response.status === 204)
        this.assignedActivities = [];
      else
        this.assignedActivities = response;
      console.log(this.assignedActivities);
    });
  }
}