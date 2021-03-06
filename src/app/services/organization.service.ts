import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class OrganizationService {
  public baseUrl: string = "";
  constructor(private http: Http, private conf: ConfigurationService) {
    this.baseUrl = this.conf.baseUrl;
  }
  orgInitialSetup(data) {
    var options = this.conf.getHeaderWithWeb();
    return this.http.post(this.baseUrl + "/planner/university/1/initialSetup", data, options).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchOrganizationInfo() {
    var options = this.conf.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/university", options).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchOrganizationInfoById(id) {
    return this.http.get(this.baseUrl + "/university/" + id).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  addObjective(orgId, cycleId, objective) {
    var options = this.conf.getHeaderWithWeb();
    return this.http.post(this.baseUrl + "/planner/university/" + orgId + "/cycle/" + cycleId + "/objective", objective, options).toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }  
  fetchObjectives(orgId,cycleId){
    var options = this.conf.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/planner/university/" + orgId + "/cycle/" + cycleId + "/objective",options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  addInitiative(universityId, cycleId, goalId, initiative) {
    var options = this.conf.getHeaderWithWeb();
    return this.http.post(this.baseUrl + "/planner/university/" + universityId + "/cycle/" + cycleId + "/objective/" + goalId + "/initiative", initiative,options)
      .toPromise()
      .then((response) => {
        return Promise.resolve(response);
      }).catch((err) => { return Promise.reject(err); });
  }
  fetchInitiative(universityId, cycleId, goalId){
    var options = this.conf.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/planner/university/" + universityId + "/cycle/" + cycleId + "/objective/" + goalId + "/initiative",options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  getCycle(){
    var options = this.conf.getHeaderWithWeb();
    return this.http.get(this.baseUrl + "/planner/university/1/cycle",options)
    .toPromise()
    .then((response) => {
      return Promise.resolve(response);
    }).catch((err) => { return Promise.reject(err); });
  }
  public saveQuarteResult(data, quarterId){
    var options = this.conf.getHeaderForFile();
    let xhr = new XMLHttpRequest()
        return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.response)
                }
            }
        }
        xhr.open("POST", this.baseUrl + "/hod/quarter/"+quarterId+"/result", true)
        xhr.send(data)
    });
    // return this.http.post(this.baseUrl + "/hod/quarter/"+quarterId+"/result",data,options)
    //                 .toPromise()
    //                 .then((response) => {
    //                   return Promise.resolve(response);
    //                 }).catch((err) => { return Promise.reject(err); });
  }
}