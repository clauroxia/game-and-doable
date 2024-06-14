import { HttpClient } from "@angular/common/http";
import { TaskService } from "./task.service";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";


describe('TaskService', () => {
  let service: TaskService;

	const httpClientMock = {
		get: jest.fn(),
	}
	
	const taskListMock = [
		{
			id: 889,
			title: "tomar agua",
			due_date: "2023-12-31",
			important: false,
			completed: false,
			user_id: 99,
			created_at: "2024-06-10T22:01:33.107Z",
			updated_at: "2024-06-10T22:01:33.107Z"
		},
		{
			id: 863,
			title: "adiós",
			due_date: "2023-12-31",
			important: false,
			completed: true,
			user_id: 99,
			created_at: "2024-06-10T20:39:06.691Z",
			updated_at: "2024-06-10T22:42:38.478Z"
		},
		{
			id: 769,
			title: "cenar",
			due_date: "2024-06-06",
			important: true,
			completed: true,
			user_id: 99,
			created_at: "2024-06-10T01:12:40.930Z",
			updated_at: "2024-06-10T20:50:58.599Z"
		},
		{
			id: 857,
			title: "Instalar C#",
			due_date: "2024-06-06",
			important: true,
			completed: true,
			user_id: 99,
			created_at: "2024-06-10T16:38:09.540Z",
			updated_at: "2024-06-10T21:04:23.597Z"
		}
	]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: HttpClient, useValue: httpClientMock }]
    });
    service = TestBed.inject(TaskService);
    httpClientMock.get.mockReturnValue(of(taskListMock));
  });

	afterEach(() => {
    TestBed.resetTestingModule(); // Restablece el módulo de prueba
  });

	it('should have been called', () => {
		service.listTasks();
		expect(httpClientMock.get).toHaveBeenCalled();
	})

	it('should return the size of TaskList', (done) => {
		service.listTasks().subscribe((res) => {
			expect(res.length).toBe(taskListMock.length);
			done();
		})
	});
});