import { PersonService } from './../../servicos/person.service';
import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa.module';
import { TarefaService } from 'src/app/servicos/tarefa.service';
import { Ordenacao } from 'src/app/utils/ordenacao.enum';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  tarefas:Tarefa[]=[];
  usuarios=[{nome:'alison', sobrenome:'avelino', data: new Date(Date.now()), ativo: true}, 
  {nome:'alison', sobrenome:'avelino', data: new Date(Date.now()), ativo: true}];
  tarefa: Tarefa = new Tarefa('', '', false);
  ordem: Ordenacao = Ordenacao.ASC;
  filtro: string= '';
  pagina: number= 0;
  constructor(private tarefaService: TarefaService, private personService: PersonService) { }

  ngOnInit(): void {
    this.carregarTarefas();
    this.personService.getAll();
  }

  getAll(): void{
    this.personService.getAll().subscribe((data:any) => {
      this.usuarios = data
    });
  }

  create(): void{

  }

  concluir(id: string) {
    this.tarefaService.concluir(id);
    this.carregarTarefas();
  }

  removerId(tarefaId: string){
    this.tarefa = this.tarefaService.listarId(tarefaId);
  }

  remover() {
    this.pagina=0;
    this.tarefaService.remover(this.tarefa.id);
    this.carregarTarefas();
  }

  ordenar() {
    if (this.ordem === Ordenacao.ASC) {
      this.ordem = Ordenacao.DESC;
    } else {
      this.ordem = Ordenacao.ASC;
    }
    this.carregarTarefas();
  }

  ascendente() {
    return this.ordem === Ordenacao.ASC;
  }

  pesquisar($event: any) {
    this.filtro = $event.target.value;
    this.carregarTarefas();
  }
  
  paginar(pagina: number) {
    this.pagina = pagina;
    this.carregarTarefas();
  }

  numeroPaginas(){
    return this.tarefaService.numeroPaginas(this.filtro);
  }

  obterPaginas() {
    return [...Array(this.numeroPaginas() + 1).keys()];
  }

  private carregarTarefas() {
    this.tarefas = this.tarefaService.listarPaginado(this.ordem, this.filtro, this.pagina);
  }



}
