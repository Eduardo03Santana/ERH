import { Funcionario } from "./funcionario";

export interface Departamento {
  id: Number;
  nmDepartamento: string;
  sigla: string;
  funcionarios: Funcionario[];
}
