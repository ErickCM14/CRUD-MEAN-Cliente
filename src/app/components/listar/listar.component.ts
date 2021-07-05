import { Usuarios } from '../../models/usuarios';
import { ObjetoService } from './../../services/objeto.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  listUsuarios: any;
  longitud: any;

  constructor(private usuarioService: ObjetoService, 
    private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuarioService.getUsuarios().subscribe(resp => {
      console.log(resp);
      this.listUsuarios = resp;
      console.log(this.listUsuarios, "kkdkdk");
      this.longitud = this.listUsuarios.length;
      
    }, (error) => {
      console.log(error);
      
    })
  }

  eliminarUsuario(id: string){
    console.log(id);
    this.usuarioService.deleteUsuario(id).subscribe(resp => {
      this.toastr.error('El usuario fue eliminado con exito!', 'Usuario eliminado!');
      this.obtenerUsuarios();
    }, (error) => {
      console.log(error);
    })
  }

}
