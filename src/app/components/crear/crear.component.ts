import { ObjetoService } from './../../services/objeto.service';
import { Usuarios } from './../../models/usuarios';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  usuarioForm: FormGroup;
  titulo: string = 'Crear usuario';
  ID: string | null;

  constructor(private fb: FormBuilder,
    private usuarioService: ObjetoService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required]
    })

    this.ID = this.route.snapshot.paramMap.get('id');
    console.log(this.ID);

  }

  ngOnInit(): void {

    this.editarUsuario();


  }

  agregarUsuario() {
    // console.log(this.usuarioForm);

    // console.log(this.usuarioForm.get('nombre')?.value);

    const USUARIO: Usuarios = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      sexo: this.usuarioForm.get('sexo')?.value,
      edad: this.usuarioForm.get('edad')?.value
    }

    if (this.ID !== null) {

      this.usuarioService.putUsuario(this.ID, USUARIO).subscribe(next => {
        console.log(next);
        this.toastr.info('El usuario fue editado con exito!', 'Usuario editado!');
        this.router.navigate(['/']);
      }, (error) => {
        console.log(error);
      })

    } else {

      this.usuarioService.guadarUsuario(USUARIO).subscribe(next => {
        console.log(next);
        console.log(USUARIO);
        this.toastr.success('El usuario fue registrado con exito!', 'Usuario agregado!');
        this.router.navigate(['/']);
      }, (error) => {
        console.log(error);
        this.usuarioForm.reset;
      })

    }


  }

  editarUsuario() {

    if (this.ID !== null) {
      this.titulo = "Editar usuario";
      this.usuarioService.getUsuario(this.ID).subscribe(next => {
        console.log(next);
        this.usuarioForm.setValue({
          nombre: next.nombre,
          apellido: next.apellido,
          sexo: next.sexo,
          edad: next.edad
        })
      })
    }

  }


}
