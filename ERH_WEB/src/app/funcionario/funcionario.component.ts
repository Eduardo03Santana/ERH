import { NavBarComponent } from './../nav-bar/nav-bar.component';
// ANGULAR-IMPORTS
import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// APP-IMPORTS
import { Funcionario } from '../models/funcionario';
import { FuncionarioService } from '../services/funcionario.service';
import { Departamento } from '../models/departamento';
import { DepartamentosService } from '../services/departamento.service';


// NGX-IMPORTS
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UnaryFunction } from 'rxjs';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  public alerts: any[] = [];
  public file: File | any;
  @Input() public dpSelecionado: any;
  public departamentos: Departamento[];
  public modalRef?: BsModalRef;
  public funcionarios: Funcionario[];
  public funcionarioForm: FormGroup;
  public funcionarioForm2: FormGroup;
  public funcionarioModal: Funcionario;
  public tpModal: string | null | undefined;
  funcionarioService: FuncionarioService;

  constructor(
    private funcionario: FuncionarioService,
    private title: Title,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private dpService: DepartamentosService  ) {
    this.departamentos = [];
    dpService.getAll().subscribe(result => {
      this.departamentos = result;
    }, error => console.error(error));
    this.file = '';
    this.funcionarios = [];
    funcionario.getAll().subscribe(result => {
      this.funcionarios = result;
    }, error => console.error(error));

    title.setTitle("Funcionarios");

    this.funcionarioService = funcionario;

    this.funcionarioForm = this.fb.group({
      id: 0,
      nmFuncionario: ["", Validators.required],
      departamentoId: [0, Validators.required],
      rg: [Date, Validators.required],
      foto: ""
    });
    this.funcionarioForm2 = this.fb.group({
      id: 0,
      nmFuncionario: ["", Validators.required],
      departamentoId: 0,
      rg: "",
      foto: ""
    });
    this.funcionarioModal = { nmFuncionario: "", foto: "", id: 0, departamentoId:0, rg:"" };
  }

  openModal(template: TemplateRef<any>, tpModal: string, funcionario?: Funcionario) {
    this.modalRef = this.modalService.show(template);
    if (funcionario != undefined) {
      this.funcionarioModal = funcionario;
      this.funcionarioForm.setValue(funcionario);
      this.funcionarioForm2.setValue(funcionario);
      //this.funcionarioForm.controls["id"].setValue(funcionario.id);
      //this.funcionarioForm.controls["nmFuncionario"].setValue(funcionario.nmFuncionario);
      //this.funcionarioForm.controls["foto"].setValue(funcionario.foto);
      //this.funcionarioForm.controls["rg"].setValue(funcionario.rg);
      //this.funcionarioForm.controls["departamentoId"].setValue(funcionario.departamentoId);
      //this.funcionarioForm2.controls["id"].setValue(funcionario.id);
      //this.funcionarioForm2.controls["nmFuncionario"].setValue(funcionario.nmFuncionario);
      //this.funcionarioForm2.controls["foto"].setValue(funcionario.foto);
      //this.funcionarioForm2.controls["rg"].setValue(funcionario.rg);
      //this.funcionarioForm2.controls["departamentoId"].setValue(funcionario.departamentoId);

    } else {
      this.funcionarioForm.controls["id"].setValue(0);
      this.funcionarioForm.controls["nmFuncionario"].setValue("");
      this.funcionarioForm.controls["foto"].setValue("");
      this.funcionarioForm.controls["rg"].setValue("");
      this.funcionarioForm.controls["departamentoId"].setValue(this.dpSelecionado);
    }
    this.tpModal = tpModal;
    this.file = ''
  }

  getNmDepartamento(id: Number): string {
    for (let dp of this.departamentos) {
      if (dp.id === id) { return dp.nmDepartamento }
    }
    return "Não atribuido"
  }

  hasChange(): boolean {
    return (this.funcionarioForm.controls["nmFuncionario"].value == this.funcionarioForm2.controls["nmFuncionario"].value &&
      this.funcionarioForm.controls["rg"].value == this.funcionarioForm2.controls["rg"].value &&
      this.funcionarioForm.controls["departamentoId"].value == this.funcionarioForm2.controls["departamentoId"].value && this.file == '')
  }

  selectFile(e: any) {
    this.file = e.target.files[0];
  }
  addFuncionario(): void {
    let fileNameArr = this.file.name.split('.');
    let fileFormat = fileNameArr[fileNameArr.length - 1];
    let newFile = new File([this.file], this.funcionarioForm.controls["id"].value + "." + fileFormat, {type: this.file.type});
    this.funcionarioService.uploadPicture(newFile).subscribe({
      next: (response) => {
        this.funcionarioForm.controls["foto"].setValue(Object(response).dbPath.toString());
        this.funcionarioService.add(this.funcionarioForm.value).subscribe({
          next: (response) => {
            this.funcionarios?.push(response);
            this.addAlert('success', 'Funcionario Adicionado Com Sucesso');
          },
          error: (response) => {
            this.addAlert('danger', 'Ops, ocorreu um problema, tente novamente mais tarde.');
          }
        });
      },
      error: (response) => {
        console.warn(response);
        this.addAlert('danger', 'Ops, ocorreu um problema, tente novamente mais tarde.');
      }
    })
  }

  updateFuncionarioBD(): void {
    this.funcionarioService.update(this.funcionarioForm.value).subscribe({
      next: (response) => {
        this.funcionarioService.getAll().subscribe(result => {
          this.funcionarios = result;
          this.addAlert('success', 'Funcionario Atualizado Com Sucesso');
        }, error => console.error(error));
      },
      error: (response) => {
        this.addAlert('danger', 'Ops, ocorreu um problema, tente novamente mais tarde.');
      }
    });
  }

  updateFuncionario(): void {
    let fileNameArr = this.file.name.split('.');
    let fileFormat = fileNameArr[fileNameArr.length - 1];
    let newFile = new File([this.file], this.funcionarioForm.controls["id"].value + "." + fileFormat, {type: this.file.type})
    if (this.file != '') {
      this.funcionarioService.uploadPicture(newFile).subscribe({
        next: (response) => {
          this.funcionarioForm.controls["foto"].setValue(Object(response).dbPath.toString());
          this.updateFuncionarioBD();
        }
      })
    }
    else { this.updateFuncionarioBD() }

  }
  deleteFuncionario(): void {
    this.funcionarioService.delete(this.funcionarioForm.value).subscribe({
      next: (response) => {
        this.funcionarioService.getAll().subscribe(result => {
          this.funcionarios = result;
          this.addAlert('success', 'Funcionario Deletado');
        }, error => console.error(error));
      },
      error: (response) => {
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
