import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from 'src/app/servicos/tarefa.service';
import { Tarefa } from 'src/app/models/tarefa.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cssValidacaoForm } from 'src/app/utils/css.util';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  tarefa: Tarefa = new Tarefa('','', false)
  
  form: FormGroup = this.fb.group({
    nome: ['',[Validators.required, Validators.minLength(5)]]
  });

  constructor(private route: ActivatedRoute,
              private tarefaService: TarefaService,
              private fb: FormBuilder
              ) { }

  ngOnInit(): void {
    const tarefaId = this.route.snapshot.params['id'];
    this.tarefa = this.tarefaService.listarId(tarefaId);
    this.form.controls['nome'].setValue(this.tarefa.nome);

  }
  cssValidacao(campo: string) {
    return cssValidacaoForm(this.form.controls[campo]);
  }
  
  editar(){
    if (this.form.invalid){
      return;
    }
    this.tarefa.nome = this.form.value.nome;
    this.tarefaService.editar(this.tarefa);
  }

}
