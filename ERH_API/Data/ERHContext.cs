using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ERH_API.Models;

namespace ERH_API.Data

{
    public class ERHContext: DbContext
    {
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Password=SenhaMuitoDificil;Persist Security Info=True;User ID=admin;Initial Catalog=ERH;Data Source=(LocalDb)\\MSSQLLocalDB");
        }
    }
}
