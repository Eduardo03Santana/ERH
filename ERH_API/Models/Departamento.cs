namespace ERH_API.Models
{
    public class Departamento
    {
        public int Id { get; set; }
        public string NmDepartamento { get; set; }
        public string Sigla { get; set; }

        public List<Funcionario>? Funcionarios { get; set; }
        public Departamento(int id, string nmDepartamento, List<Funcionario> funcionarios, string sigla)
        {
            Id = id;
            NmDepartamento = nmDepartamento;
            Funcionarios = funcionarios;
            Sigla = sigla;
        }
        public Departamento()
        {
        }

    }
    
}
