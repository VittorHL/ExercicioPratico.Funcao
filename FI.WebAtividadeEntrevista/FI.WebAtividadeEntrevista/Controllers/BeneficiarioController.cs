using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(List<BeneficiarioModel> beneficiario)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();
            string mensagemRetorno = string.Empty;

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (beneficiario != null)
                {
                    beneficiario.Select(o =>
                    {
                        if (boBeneficiario.VerificarExistencia(o.CPF, o.IdCliente))
                        {
                            mensagemRetorno = $"O Beneficiário com CPF: {o.CPF} já está cadastrado para o cliente! </br>";
                            return false;
                        }
                        else
                        {
                            boBeneficiario.Incluir(new Beneficiario()
                            {
                                IdCliente = o.IdCliente,
                                Nome = o.Nome,
                                CPF = o.CPF
                            });
                            return true;
                        }
                    }).ToArray();
                }

                return Json(new { sucesso = "Cadastro efetuado com sucesso!", mensagens = mensagemRetorno });
            }
        }

        [HttpPost]
        public JsonResult Alterar(List<BeneficiarioModel> beneficiario)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();
            string mensagemRetorno = string.Empty;

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (beneficiario != null)
                {
                    string verificaId = string.Join("," , beneficiario.Where(o => o.Id != 0).Select(o => o.Id).ToArray());
                    long idCliente = beneficiario.Where(o => o.IdCliente != 0).Select(o => o.IdCliente).First();
                    //Vamos verificar se teve algum Delete:
                    boBeneficiario.Excluir(verificaId, idCliente);

                    beneficiario.Select(o =>
                    {
                        if (o.IdCliente != 0)
                        {
                            if (boBeneficiario.VerificarExistencia(o.CPF, o.Id, o.IdCliente))
                            {
                                mensagemRetorno = $"O Beneficiário com CPF: {o.CPF} já está cadastrado para o cliente! </br>";
                                return false;
                            }
                            else
                            {
                                boBeneficiario.Alterar(new Beneficiario()
                                {
                                    Id = o.Id,
                                    IdCliente = o.IdCliente,
                                    Nome = o.Nome,
                                    CPF = o.CPF
                                });
                                return true;
                            }
                        }
                        else
                        {
                            if (boBeneficiario.VerificarExistencia(o.CPF, o.IdCliente))
                            {
                                mensagemRetorno = $"O Beneficiário com CPF: {o.CPF} já está cadastrado para o cliente! </br>";
                                return false;
                            }
                            else
                            {
                                boBeneficiario.Incluir(new Beneficiario()
                                {
                                    IdCliente = idCliente,
                                    Nome = o.Nome,
                                    CPF = o.CPF
                                });
                                return true;
                            }
                        }
                    }).ToArray();
                }

                return Json(new { sucesso = "Cadastro efetuado com sucesso!", mensagens = mensagemRetorno });
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            return View(ListarBeneficiario(id));
        }

        [HttpGet]
        public JsonResult ListarBeneficiario(long idCliente)
        {
            try
            {
                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa(idCliente);

                //Return result to jTable
                return Json(beneficiarios);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}