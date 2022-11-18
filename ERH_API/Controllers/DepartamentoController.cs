using ERH_API.Data;
using ERH_API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ERH_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartamentoController : ControllerBase
    {
        private readonly IRepository _repo;
        public DepartamentoController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("/api/Departamentos")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetDepartamentos()
        {
            try {
                var result = await _repo.GetDepartamentosAsync();
                return Ok(result);
            }
            catch (Exception ex){
                return BadRequest($"Erro: {ex.Message}");
            }
        }
        [HttpPost]
        [Route("/api/AddDepartamento")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Adddepartamento(Departamento departamento){
            try
            {
                _repo.Add(departamento);
                await _repo.SaveChangesAsync();
            }
            catch(Exception ex){ 
                return BadRequest(ex.Message); 
                }

            return Ok(departamento);
        }

        [HttpPut]
        [Route("/api/UpdateDepartamento")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Updatedepartamento(Departamento departamento){
            try
            {
                _repo.Update(departamento);
                await _repo.SaveChangesAsync();
            }
            catch (Exception ex) { return BadRequest(ex.Message); }

            return Ok(departamento);
        }
        [HttpDelete]
        [Route("/api/DeleteDepartamento")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Deletedepartamento(Departamento departamento){

            try
            {
                _repo.Delete(departamento);
                await _repo.SaveChangesAsync();
            }
            catch (Exception ex) { return BadRequest(ex.Message); }

            Dictionary<string, string> response = new Dictionary<string, string>();
            response.Add(key: "status", value: "success");
            response.Add(key: "message", value: "Departamento deletado com sucesso");
            return Ok(response);
        }

    }
}
