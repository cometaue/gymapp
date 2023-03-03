import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/User.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  public user: User;
  /**
   *
   *
   */
  constructor(private _as: ApiService, private route: ActivatedRoute) {
    this.user = {
      nombre: '',
      mobile: 0,
      apellido: '',
      email: '',
      weight: 0,
      height: 0,
      bmi: 0,
      bmiResult: '',
      trainer: '',
      gender: '',
      tiempoPago: '',
      objetivos: [],
      firstTimeGym: '',
      fechaInicio: '',
    };
  }
  ngOnDestroy(): void {
    console.log('se destruyo el componente');
  }
  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this._as.obtenerCliente(id).subscribe((user: User) => {
          this.user = user;
        });
      }
    });
  }
}
