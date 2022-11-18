using Microsoft.AspNetCore.Mvc.Formatters;

namespace ERH_API.Models
{
    public class Funcionario
    {
        public int Id { get; set; }
        public string NmFuncionario { get; set; }
        public int DepartamentoId { get; set; }
        public string Foto { get; set; }
        public string Rg { get; set; }



        public Funcionario(int id, string nmFuncionario, int departamentoId, string foto, string rg)
        {
            Id = id;
            NmFuncionario = nmFuncionario;
            DepartamentoId = departamentoId;
            Foto = foto;
            Rg = rg;

        }
        public Funcionario()
        {

        }


    }
}
