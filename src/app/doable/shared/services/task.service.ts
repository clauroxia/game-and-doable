import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskEdited, TaskResponse } from '../interfaces';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://doable-api-production.up.railway.app/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeadersBearer(): HttpHeaders {
    const token = this.authService.token();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private getHeadersToken(): HttpHeaders {
    const token = this.authService.token();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token token=${token}`,
    });
  }

  listTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(this.apiUrl, {
      headers: this.getHeadersBearer(),
    });
  }

  createTask(task: Task): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task, {
      headers: this.getHeadersBearer(),
    });
  }

  editTask(id: number, task: TaskEdited): Observable<TaskResponse> {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/${id}`, task, {
      headers: this.getHeadersToken(),
    });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeadersToken(),
    });
  }
}
