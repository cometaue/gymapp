import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public update: boolean = false;
  private param!: number;
  generOption: string[] = ['Masculino', 'Femenino'];
  trainerOption: string[] = ['Si', 'No'];
  pagosOption: string[] = [' Pago semanal', ' Pago mensual', 'Pago anual'];
  objetivos: string[] = [
    'Reducción de grasas',
    'Reducir el Sedentarismo',
    'Generar masa moscular',
    'Estar mas saludable',
    'Lograr un cuerpo Escultural',
    'Mantenerse Fitness',
  ];
  gymOption: string[] = ['Si', 'No'];
  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)], []],
    apellido: [, [Validators.required, Validators.minLength(4)], []],
    email: [
      ,
      [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.email,
      ],
      [],
    ],
    mobile: [, [Validators.required], []],
    weight: [, [Validators.required], []],
    height: [, [Validators.required], []],
    bmi: [, [], []],
    bmiResult: [, [], []],
    trainer: [, [Validators.required], []],
    gender: [, [Validators.required], []],
    tiempoPago: [, [Validators.required], []],
    objetivos: [, [Validators.required], []],
    firstTimeGym: [, [Validators.required], []],
    fechaInicio: [, [Validators.required], []],
  });

  constructor(
    private fb: FormBuilder,
    private _as: ApiService,
    private _toastService: NgToastService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.miFormulario
      .get('height')
      ?.valueChanges.subscribe((res) => this.calcularBMI(res));
  }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      if (id) {
        this.update = true;
        this.param = id;
        this._as
          .obtenerCliente(id)
          .subscribe((user) => this.miFormulario.patchValue(user));
      } else {
        this.update = false;
      }
    });
  }
  postear() {
    if (this.miFormulario.valid && !this.update) {
      this._as.registrarCliente(this.miFormulario.value).subscribe((res) => {
        this._toastService.success({
          detail: 'Se añadio 1 nuevo cliente',
          summary: 'nuevo cliente',
          duration: 3000,
        });
        this.router.navigateByUrl('list');
      });
    }
    if (this.miFormulario.valid && this.update) {
      this._as
        .editarCliente(this.param, this.miFormulario.value)
        .subscribe((res) => {
          this._toastService.success({
            detail: 'Se modificaron los datos del cliente',
            summary: 'edicion correcta',
            duration: 3000,
          });
          this.router.navigateByUrl('list');
          this.update = false;
        });
    } else {
      return;
    }
  }

  calcularBMI(heightValue: number) {
    const weight: number = this.miFormulario.get('weight')?.value;
    const bmi: number = weight / heightValue ** 2;

    this.miFormulario.get('bmi')?.patchValue(Math.round(bmi));
    switch (true) {
      case bmi < 18.5:
        this.miFormulario.get('bmiResult')?.patchValue('Bajo de peso');
        break;

      case bmi >= 18.5 && bmi < 25:
        this.miFormulario.get('bmiResult')?.patchValue('Normal');
        break;

      case bmi >= 25 && bmi < 30:
        this.miFormulario.get('bmiResult')?.patchValue('Sobrepeso');
        break;

      default:
        this.miFormulario.get('bmiResult')?.patchValue('Obesidad');
        break;
    }
  }
}
