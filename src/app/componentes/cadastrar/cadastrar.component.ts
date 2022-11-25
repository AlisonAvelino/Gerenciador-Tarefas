import { PersonService } from './../../servicos/person.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from 'src/app/models/tarefa.module';
import { TarefaService } from 'src/app/servicos/tarefa.service';
import { cssValidacaoForm } from 'src/app/utils/css.util';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nome: ['',[Validators.required, Validators.minLength(2)]],
    sobrenome: ['',[Validators.required, Validators.minLength(2)]]

  });

  constructor(private fb:FormBuilder,
              private tarefaService: TarefaService, 
              private personService: PersonService) { }

  ngOnInit(): void {
  }

  cadastrar(){
    if(this.form.invalid){
      return;
    }
    const user = {firstName: this.form.controls['nome'].value, lastName: this.form.controls['sobrenome'].value, 
                  email: 'teste@teste.com', createdAt: new Date(Date.now()), isActive: false}

    this.personService.create(user);
    console.log(user);
    this.form.reset();

  }

  cssValidacao(campo: string) {
    return cssValidacaoForm(this.form.controls[campo]);
  }

}
