import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiHtmlPage } from './api-html.page';
import { ServiceApiService } from '../service-api.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ApiHtmlPage', () => {
  let component: ApiHtmlPage;
  let fixture: ComponentFixture<ApiHtmlPage>;
  let apiService: ServiceApiService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule, // Proveedor para HttpClient
        ApiHtmlPage // Importa el componente standalone
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiHtmlPage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ServiceApiService); // Inyecta el servicio
    httpMock = TestBed.inject(HttpTestingController); // Inyecta el mock para HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes pendientes
  });

  it('P5 - Verificar la creación del componente', () => {
    expect(component).toBeTruthy();
  });

  it('P6 - Debería cargar datos al iniciar', async () => {
    // Llamar a ngOnInit
    component.ngOnInit();

    // Interceptar la solicitud HTTP 
    const request = httpMock.expectOne('https://rickandmortyapi.com/api/character');
    expect(request.request.method).toBe('GET'); // Validar que el método es GET

    // Responder con datos simulados
    request.flush({
      info: { count: 826 },
      results: [
        { name: 'Rick Sanchez' },
        { name: 'Morty Smith' },
      ],
    });

    // Verificar las propiedades del componente
    expect(component.cantidad_personajes).toBe(826); 
    expect(component.personajes.length).toBe(2); 
    expect(component.personajes[0].name).toBe('Rick Sanchez'); 
    expect(component.personajes[1].name).toBe('Morty Smith'); 
  });


});
