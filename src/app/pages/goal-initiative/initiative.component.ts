import { Component, AfterViewInit, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { DataService } from '../../services/data.service';
declare let $;

@Component({
  selector: 'goal-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class GoalInitiative implements AfterViewInit{
  public selectedGoal;
  public cycle = [];
  public orgId;
  public cycleId;
  public goalId;
  public goals = [];
  public initiatives =[];
  initiativeForm: FormGroup;
  constructor(private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private orgService: OrganizationService,
    private dataservice: DataService) {
    this.initiativeForm = this.formBuilder.group({
      "initiative": ['', [Validators.required]],
      "totalCost": ['', [Validators.required]],
      "activities": this.formBuilder.array([this.setActivity()])
    });
    this.route.params.subscribe(param => {
      if (param['goalId']) this.goalId = param['goalId'];
    });
    this.orgService.fetchInitiative(this.dataservice.objective.id,this.dataservice.objective.cycles.id,this.goalId)
    .then(response =>{
      console.log(response);
      this.initiatives = response.json();
    },error =>{
      console.log(error);
    });
  }
  ngAfterViewInit() {
    // $('.collapsible').collapsible();
  }
  addActivity() {
    const control = <FormArray>this.initiativeForm.controls['activities'];
    control.push(this.setActivity());
  }
  removeActivity(initiativeForm, i) {
    const control = <FormArray>this.initiativeForm.controls['activities'];
    control.removeAt(i);
  }
  addMeasure(form) {
    const control = <FormArray>form.controls['measures'];
    control.push(this.setMeasure());
  }
  removeMeasure(form, j) {
    const control = <FormArray>form.controls['measures'];
    control.removeAt(j);
  }
  setActivity() {
    return this.formBuilder.group({
      "activity": ['', [Validators.required]],
      "departments": ['', [Validators.required]],
      "measures": this.formBuilder.array([this.setMeasure()])
    });
  }
  setMeasure() {
    return this.formBuilder.group({
      "measure": ['', [Validators.required]],
      "frequencyId": [1, [Validators.required]],
      "measureUnit": ['', [Validators.required]],
      "currentLevel": ['', [Validators.required]],
      "annualTarget": this.formBuilder.array(this.setAnnualTarget())
    });
  }
  setAnnualTarget() {
    const annualTarget = [];
    this.dataservice.objective.cycle.forEach(element => {
      annualTarget.push(this.inItTarget(element));
    });
    return annualTarget;
  }
  inItTarget(year) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "levels": this.formBuilder.array([this.inItLevels(1)]),
      "cost": ['', [Validators.required]]
    });
  }
  setTargetTable(form, e) {
    for (var index = 0; index < this.dataservice.objective.cycle.length; index++) {
      form[index].controls['levels'] = this.formBuilder.array([]);
      const levels = <FormArray>form[index].controls['levels'];
      for (var i = 0; i < e; i++) {
        levels.push(this.inItLevels(i + 1));
      }
    }
  }
  inItLevels(q) {
    return this.formBuilder.group({
      "quarter": [q + "quarter"],
      "level": ['', [Validators.required]]
    });
  }
  returnObject;
  submited:boolean = false;
  submitInitiative() {
    this.orgId = this.dataservice.objective.id;
    this.cycleId = this.dataservice.objective.cycles.id;
    delete this.initiativeForm.value['activities'][0].departments;
    console.log("object", this.initiativeForm.value);
    this.orgService.addInitiative(this.orgId, this.cycleId, this.goalId, this.initiativeForm.value).then(res => {
      this.submited = true;
      this.initiatives.push(this.initiativeForm.value);
      this.returnObject = res.json();
      console.log("afsd", res);
    }, err => {
      console.log(err);
    });
  }
  addMoreInitiative(){
    this.initiativeForm.reset();
    this.submited = false;
  }
}