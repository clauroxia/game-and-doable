import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { AuthService } from '../../shared/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { TaskEdited, TaskResponse } from '../../shared/interfaces';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  template: `
    <div [formGroup]="formDoable" (ngSubmit)="handleSubmit()" class="doable">
      <form class="form-tasks">
        <input
          placeholder="do the dishes"
          type="text"
          formControlName="title"
        />
        <input
          type="date"
          placeholder="dd / mm / yyyy"
          formControlName="due_date"
        />
        <p
          [ngStyle]="error ? { display: 'block' } : { display: 'none' }"
          class="error-message"
        >
          {{ messageError }}
        </p>
        <app-button textButton="Add task" type="submit" />
      </form>
      <div class="container-tasks">
        <div class="sort">
          <div>
            <p>Sort by</p>
            <select name="select" (change)="sortBy($event)">
              <option value="value1" selected>Due Date (old first)</option>
              <option value="value2">Due Date (new first)</option>
              <option value="value3">Alphabetical (a-z)</option>
              <option value="value4">Alphabetical (z-a)</option>
            </select>
          </div>
          <div>
            <p>Filter</p>
            <label class="checkboxes"
              ><input
                type="checkbox"
                (change)="toggleFilter($event, 'pending')"
              />Only pending</label
            >
            <label class="checkboxes"
              ><input
                type="checkbox"
                (change)="toggleFilter($event, 'important')"
              />Only important</label
            >
          </div>
          <div>
            <app-button
              textButton="Logout"
              [buttonSecondary]="isActive"
              [buttonSm]="isActive"
              (clicked)="handleLogout()"
            />
          </div>
        </div>
        <div class="task-list">
          <ul>
            @for (task of filteredTasks; track $index) {
            <li class="task-item" data-testid="task">
              <div class="task-description">
                <label class="checkboxes"
                  ><input
                    type="checkbox"
                    [checked]="task.completed"
                    (change)="handleToggle(task.id, 'completed')"
                  />{{ task.title }}</label
                >
                <p>{{ task.due_date }}</p>
              </div>
              <div class="svg-buttons">
                <app-button
                  [buttonOutline]="!task.important"
                  [buttonSecondary]="task.important"
                  [buttonIcon]="isActive"
                  (clicked)="handleToggle(task.id, 'important')"
                >
                  <img
                    src="../../../../assets/icons/badge-alert.svg"
                    class="svg-icon"
                  />
                </app-button>
                <app-button
                  [buttonOutline]="isActive"
                  [buttonIcon]="isActive"
                  (clicked)="handleDelete(task.id)"
                >
                  <img
                    src="../../../../assets/icons/trash.svg"
                    class="svg-icon"
                  />
                </app-button>
              </div>
            </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrl: './authenticated.component.css',
})
export class AuthenticatedComponent {
  isActive = true;
  tasks: TaskResponse[] = [];
  filteredTasks: TaskResponse[] = [];
  isImportant!: boolean;
  isCompleted!: boolean;
  taskEdited!: TaskEdited;
  formDoable!: FormGroup;
  showOnlyPending = false;
  showOnlyImportant = false;
  sortByValue: string = 'value1';
  error: boolean = false;
  messageError = 'Task is required';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.formDoable = this.fb.group({
      title: ['', Validators.required],
      due_date: [''],
    });

    this.getTasks();
  }

  getTasks(): void {
    this.taskService.listTasks().subscribe((tasks: TaskResponse[]) => {
      this.tasks = tasks;
      this.getFilteredTasks();
      this.sortValueOptions(this.sortByValue);
    });
  }

  toggleFilter(event: Event, taskStatus: string) {
    if (taskStatus === 'pending') {
      this.showOnlyPending = (event.target as HTMLInputElement).checked;
    } else {
      this.showOnlyImportant = (event.target as HTMLInputElement).checked;
    }
    this.getFilteredTasks();
  }

  getFilteredTasks() {
    let filterTasks = this.tasks;

    if (this.showOnlyPending) {
      filterTasks = filterTasks.filter((task) => !task.completed);
    }

    if (this.showOnlyImportant) {
      filterTasks = filterTasks.filter((task) => task.important);
    }
    this.filteredTasks = filterTasks;
  }

  handleSubmit() {
    if (this.formDoable.valid) {
      if (!this.formDoable.value.due_date) {
        this.formDoable.value.due_date = '2023-12-31';
      }
      this.taskService.createTask(this.formDoable.value).subscribe((task) => {
        this.tasks.push(task);
        this.formDoable.reset();
        this.getFilteredTasks();
        this.sortValueOptions(this.sortByValue);
        this.error = false;
      });
    } else {
      this.error = true;
    }
  }

  handleEdit(id: number, update: TaskEdited) {
    this.taskService.editTask(id, update).subscribe(() => {
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, ...update } : task
      );
      this.getFilteredTasks();
    });
  }

  handleDelete(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.getFilteredTasks();
    });
  }

  handleLogout() {
    this.authService.logout$.next();
  }

  handleToggle(id: number, taskStatus: string) {
    const taskFound = this.tasks.find((task) => task.id === id);
    if (taskFound) {
      if (taskStatus === 'important') {
        this.isImportant = !taskFound?.important;
        this.isCompleted = taskFound?.completed;
      } else {
        this.isImportant = taskFound?.important;
        this.isCompleted = !taskFound?.completed;
      }

      this.taskEdited = {
        important: this.isImportant,
        completed: this.isCompleted,
      };
    }
    this.handleEdit(id, this.taskEdited);
  }

  sortBy(event: Event) {
    this.sortByValue = (event.target as HTMLSelectElement).value;
    this.sortValueOptions(this.sortByValue);
  }

  sortValueOptions(sortByValue: string) {
    switch (sortByValue) {
      case 'value1': // Due Date (old first)
        this.filteredTasks.sort(
          (a, b) =>
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        );
        break;
      case 'value2': // Due Date (new first)
        this.filteredTasks.sort(
          (a, b) =>
            new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
        );
        break;
      case 'value3': // Alphabetical (a-z)
        this.filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'value4': // Alphabetical (z-a)
        this.filteredTasks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
  }
}
