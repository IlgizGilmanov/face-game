import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Person } from 'src/app/client-models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  addPerson(person: Person): Observable<any> {
    return this.http
      .post<Person>('/api/create-person', person, this.httpOptions)
      .pipe(catchError(this.handleError<Person>('Add Person')));
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>('/api/get-persons').pipe(
      tap((persons) => console.log('Persons retrieved!', persons)),
      catchError(this.handleError<Person[]>('Get Persons', [])),
    );
  }

  getPerson(id: string): Observable<Person[]> {
    return this.http.get<Person[]>(`/api/get-person/${id}`).pipe(
      tap((_) => console.log(`Person retrieved: ${id}`)),
      catchError(this.handleError<Person[]>(`Get Person id=${id}`)),
    );
  }

  updatePerson(id: string, person: Person): Observable<any> {
    return this.http.put(`/api/update-person/${id}`, person, this.httpOptions).pipe(
      tap((_) => console.log(`Person updated: ${id}`)),
      catchError(this.handleError<Person[]>('Update Person')),
    );
  }

  deletePerson(id: string): Observable<Person[]> {
    return this.http.delete<Person[]>(`/api/delete-person/${id}`, this.httpOptions).pipe(
      tap((_) => console.log(`Person deleted: ${id}`)),
      catchError(this.handleError<Person[]>('Delete Person')),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
