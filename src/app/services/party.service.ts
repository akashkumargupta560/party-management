import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { baseURl } from '../utils/constants';
import { AuthService } from './auth.service';
import { Party } from '../model/Party.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  partyDetailsSubject = new Subject<Party[]>();
  private partyDetails: any = [];

  constructor(private http: HttpClient, private authService: AuthService) { }


  fetchParties() {
      this.http.request('get', `${baseURl}/party/`).subscribe({
          next: (response) => {
              this.partyDetails = response;
              this.partyDetailsSubject.next(this.partyDetails);
          },
          error: (error) => {
              this.handleError(error);
          }
      });
  }

  getPartyDetails() {
      if (this.partyDetails.length === 0) this.fetchParties();
      return [...this.partyDetails];
  }

  getPartyDetailsById(id: any) {
      this.http.request('get', `${baseURl}/party/`, { params: new HttpParams().set('id', id) }).subscribe(
          {
              next:
                  (response) => {
                      this.partyDetails = [response];
                      this.partyDetailsSubject.next(this.partyDetails);
                  },
              error: (error) => {
                  this.handleError(error);
              }
          }
      );
  }

  createPartyDetails(partyDetails: any) {
      const formData = this.createFormData(partyDetails);
      this.http.request('post', `${baseURl}/party/`, { body: formData }).subscribe(
          {
              next:
                  (response) => {
                      this.fetchParties();
                  },
              error: (error) => {
                  this.handleError(error);
              }
          }
      );
      return true
  }

  deletePartyById(id: any) {
      this.http.request('delete', `${baseURl}/party/`, { params: new HttpParams().set('id', id) }).subscribe(
          {
              next:
                  (response) => {
                      this.fetchParties();
                  },
              error: (error) => {
                  this.handleError(error);
              }
          }
      );
  }

  private createFormData(body: any) {
      const formData = new FormData();
      Object.keys(body).forEach((eachKey: any) => {
          if (eachKey === 'image') {
            formData.append(eachKey, body[eachKey]);
          }
          else if (Array.isArray(body[eachKey]) || typeof body[eachKey] === 'object') {
              formData.append(eachKey, JSON.stringify(body[eachKey]));
          } else {
              formData.append(eachKey, body[eachKey]);
          }
      })
      return formData;
  }

  putValue(body: any, id: any) {
      const formData = this.createFormData(body);
      this.http.request('put', `${baseURl}/party/`, { body: formData, params: new HttpParams().set('id', id) }).subscribe(
          {
              next:
                  (response) => {
                      this.fetchParties();
                  },
              error: (error) => {
                  this.handleError(error);
              }
          }
      );
  }

  patchValue(body: any, id: any) {
      const formData = this.createFormData(body);
      this.http.request('patch', `${baseURl}/party/`, { body: formData, params: new HttpParams().set('id', +id) }).subscribe(
          {
              next:
                  (response) => {
                      this.fetchParties();
                  },
              error: (error) => {
                  this.handleError(error);
              }
          }
      );
  }

  getPartyDetailById(id: string) {
      return this.partyDetails.filter((x: any) => x.id == id);
  }

  search(value: string) {
      const filteredData = this.partyDetails.filter((x: any) => Object.values(x).join(";").toLocaleLowerCase().includes(value.toLocaleLowerCase()));
      this.partyDetailsSubject.next(filteredData);
  }

  private handleError(errorRes: HttpErrorResponse) {
      if (errorRes.error.detail === "Invalid token.") {
          this.authService.clearLocalStorage();
      }
  }
}
