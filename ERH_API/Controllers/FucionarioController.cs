using ERH_API.Data;
using ERH_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ERH_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FuncionarioController : ControllerBase
    {
        private readonly IRepository _repo;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _contextAccessor;
        public FuncionarioController(IRepository repo, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor contextAccessor)
        {
            _repo = repo;
            _webHostEnvironment = webHostEnvironment;
            _contextAccessor = contextAccessor;
        }
        /// <summary>
        /// Lista todos os funcionarios
        /// </summary>
        /// <returns>
        /// Retorna todos os funcionarios
        /// </returns>
        [HttpGet]
        [Route("/api/Funcionarios")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetFuncionarios()
        {
            try
            {
                var result = await _repo.GetFuncionariosAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }
        /// <summary>
        /// Adiciona Um Funcionario ao banco de dados
        /// </summary>
        /// <param name="funcionario"></param>
        /// <returns>
        /// Retorno o Funcionario Adicionado
        /// </returns>
        /// <response code="200">Funcionario adicionado com sucesso</response>
        /// <response code="400">Não foi possivel adicionar o funcionario devido a algum erro</response>
        [HttpPost]
        [Route("/api/AddFuncionario")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddFuncionario(Funcionario funcionario)
        {
            try
            {
                _repo.Add(funcionario);
                await _repo.SaveChangesAsync();
            }
            catch (Exception ex) { return BadRequest(ex.Message); }

            return Ok(funcionario);
        }
        [HttpPost]
        [Route("/api/AddFuncionarioPicture")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddFuncionarioPicture(IFormFile file)
        {
            try
            {
                var path = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", file.FileName);
                var folderName = _contextAccessor.HttpContext.Request.Scheme + "://" +
                    _contextAccessor.HttpContext.Request.Host + _contextAccessor.HttpContext.Request.PathBase;
                if (file.Length > 0)
                    {

                        var dbPath = folderName + "/uploads/" + file.FileName;
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        return Ok(new { dbPath } );
                    }
                await _repo.SaveChangesAsync();
                return BadRequest("Erro");
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
        [HttpPut]
        [Route("/api/UpdateFuncionario")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdateFuncionario(Funcionario funcionario)
        {
            try
            {
                _repo.Update(funcionario);
                await _repo.SaveChangesAsync();
            }
            catch (Exception ex) { return BadRequest(ex.Message); }

            return Ok(funcionario);
        }
        [HttpDelete]
        [Route("/api/DeleteFuncionario")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> DeleteFuncionario(Funcionario funcionario){

            try
            {
                _repo.Delete(funcionario);
                await _repo.SaveChangesAsync();
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
            Dictionary<string, string> response = new Dictionary<string, string> { };
            response.Add("mensagem", "Deletado com Sucesso");

            return Ok(response);
        }
    }
}
