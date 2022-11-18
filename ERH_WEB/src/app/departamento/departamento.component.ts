// ANGULAR IMPORTS
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';


//APP-IMPORTS
import { Departamento } from '../models/departamento';
import { DepartamentosService } from '../services/departamento.service';
import { Observable, Subscription } from 'rxjs';


// NGX IMPORTS
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  public dpEscolhido: Number = -10;
  p: number = 1;
  alerts: any[] = [];
  public modalRef?: BsModalRef;
  public departamentos: Departamento[];
  public departamentoForm: FormGroup;
  public tpModal: string | null | undefined;
  setorService: DepartamentosService;
  constructor(
    private departamento: DepartamentosService,
    private title: Title,
    private fb: FormBuilder,
    private modalService: BsModalService) {
    this.departamentos = [];
    departamento.getAll().subscribe(result => {
      this.departamentos = result;
    }, error => console.error(error));

    title.setTitle("Departamentos");

    this.setorService = departamento;

    this.departamentoForm = this.fb.group({
      id: [],
      nmDepartamento: ["", Validators.required],
      funcionarios: [],
      sigla: ["", Validators.required],
    });



  }

  openModal(template: TemplateRef<any>, departamento: Departamento, tpModal: string) {
    this.dpEscolhido = departamento.id;
    if(tpModal == 'editFuncs'){
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }
    else { this.modalRef = this.modalService.show(template); }
    this.departamentoForm.controls["id"].setValue(departamento.id);
    this.departamentoForm.controls["nmDepartamento"].setValue(departamento.nmDepartamento);
    this.departamentoForm.controls["sigla"].setValue(departamento.sigla);
    this.tpModal = tpModal;
  }

  genSigla() {
    if (this.departamentoForm.controls["nmDepartamento"].value == '') return '';

    if (this.departamentoForm.controls["nmDepartamento"].value[1] == undefined) {
      return this.departamentoForm.controls["nmDepartamento"].value[0];
    }
    else if (this.departamentoForm.controls["nmDepartamento"].value.split(' ')[1] == undefined || this.departamentoForm.controls["nmDepartamento"].value.split(' ')[1] == '') {
      return this.departamentoForm.controls["nmDepartamento"].value[0] + this.departamentoForm.controls["nmDepartamento"].value[1].toUpperCase();
    }
    let retorno = '';
    this.departamentoForm.controls["nmDepartamento"].value.split(' ').forEach(function (palavra: string) {
      if (palavra.length > 2) { retorno += palavra[0].toUpperCase(); }
    })
    return retorno;
  }


  //closeModal() {
  //  this.modalRef.hide();
  //}
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  addDepartamento(): void {
    this.departamento.add(this.departamentoForm.value).subscribe({
      next: (response) => {
        response.funcionarios = [];
        this.departamentos?.push(response)
        this.addAlert('success', 'Departamento Adicionado Com Sucesso');
      },
      error: (response) => {
        this.addAlert('danger', 'Ops, ocorreu um problema, tente novamente mais tarde.');
      }

    });
  }
  updateDepartamento(): void {

    this.departamento.update(this.departamentoForm.value).subscribe({
      next: (result) => {
        this.departamento.getAll().subscribe(result => {
          this.departamentos = result;
          this.addAlert('success', 'Departamento Atualizado Com Sucesso');
        }, error => console.error(error));

      },
      error: () => {
        this.addAlert('danger', 'Ops, ocorreu um problema, tente novamente mais tarde.');
      }
    });
  }
  deleteDepartamento(): void {
    this.departamento.delete(this.departamentoForm.value).subscribe({
      next: (result) => {
        this.departamento.getAll().subscribe(result => {
          this.departamentos = result;
          this.addAlert('success', 'Departamento Deletado');
        }, error => console.error(error));
      },
      error: () => {
        this.addAlert('danger', 'Ops, ocorreu um problema, tente novamente mais tarde.');
      }
    });
  }

  addAlert(type: string, msg: string): void {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 7000
    });
  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  ngOnInit(): void {
  }

}
