import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticatedComponent } from './authenticated.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskResponse } from '../../shared/interfaces';
import { By } from '@angular/platform-browser';

describe('AuthenticatedComponent', () => {
  let component: AuthenticatedComponent;
  let fixture: ComponentFixture<AuthenticatedComponent>;

  const mockTasks: TaskResponse[] = [
    {
      id: 889,
      title: 'tomar agua',
      due_date: '2023-12-31',
      important: false,
      completed: false,
      user_id: 99,
      created_at: '2024-06-10T22:01:33.107Z',
      updated_at: '2024-06-10T22:01:33.107Z',
    },
    {
      id: 863,
      title: 'adiós',
      due_date: '2023-12-31',
      important: false,
      completed: true,
      user_id: 99,
      created_at: '2024-06-10T20:39:06.691Z',
      updated_at: '2024-06-10T22:42:38.478Z',
    },
    {
      id: 769,
      title: 'cenar',
      due_date: '2024-06-06',
      important: true,
      completed: true,
      user_id: 99,
      created_at: '2024-06-10T01:12:40.930Z',
      updated_at: '2024-06-10T20:50:58.599Z',
    },
    {
      id: 857,
      title: 'Instalar C#',
      due_date: '2024-06-06',
      important: true,
      completed: true,
      user_id: 99,
      created_at: '2024-06-10T16:38:09.540Z',
      updated_at: '2024-06-10T21:04:23.597Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedComponent, HttpClientTestingModule], // Importa HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedComponent);
    component = fixture.componentInstance;
    component.filteredTasks = mockTasks;
    fixture.detectChanges();
  });

  it('should render as many elements as tasks', () => {
    const tasks = fixture.debugElement.queryAll(By.css('[data-testid="task"]'));
    expect(tasks.length).toBe(mockTasks.length);
  });

  it('should render task title and date', () => {
    const tasks = fixture.debugElement.queryAll(By.css('[data-testid="task"]'));

    tasks.forEach((task, i) => {
      // Verifica que el contenido de texto incluye el título y la fecha de la tarea
      expect(task.nativeElement.textContent).toContain(mockTasks[i].title);
      expect(task.nativeElement.textContent).toContain(mockTasks[i].due_date);

    });
  });
  
  it('should render task status', () => {
    const tasks = fixture.debugElement.queryAll(By.css('[data-testid="task"]'));

    tasks.forEach((task, i) => {
      // Verifica el status del checkbox
      const checkbox = task.query(By.css('input'));
      expect(checkbox.nativeElement.checked).toBe(mockTasks[i].completed);
    
      // Verifica la propiedad del componente botón
      const button = task.query(By.css('app-button'));
      expect(button.componentInstance.buttonSecondary).toBe(mockTasks[i].important);
      
    })
  })

});
