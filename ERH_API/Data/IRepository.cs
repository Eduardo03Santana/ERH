using ERH_API.Models;

namespace ERH_API.Data
{
    public interface IRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        public Task<Funcionario[]> GetFuncionariosAsync();
        public Task<Departamento[]> GetDepartamentosAsync(bool includeFuncionarios = true);
    }
}
