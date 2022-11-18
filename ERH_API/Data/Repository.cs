using ERH_API.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ERH_API.Data
{
    public class Repository : IRepository
    {
        private readonly ERHContext _context;

        public Repository(ERHContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }


        #region GetFuncionarios
        public async Task<Funcionario[]> GetFuncionariosAsync()
        {
            IQueryable<Funcionario> query = _context.Funcionarios;

            query = query.AsNoTracking()
                         .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        #endregion

        #region GetDepartamentos
        public async Task<Departamento[]> GetDepartamentosAsync(bool includeFuncionarios = true)
        {
            IQueryable<Departamento> query = _context.Departamentos;

            if (includeFuncionarios) query = query.Include(c => c.Funcionarios); 

            query = query.AsNoTracking()
                         .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        #endregion




    }
}
