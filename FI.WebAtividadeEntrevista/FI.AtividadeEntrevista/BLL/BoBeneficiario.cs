using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    class BoBeneficiario
    {
        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="beneficiario"></param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            daoBeneficiario.Alterar(beneficiario);
        }

        /// <summary>
        /// Consulta o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public DML.Beneficiario Consultar(long id)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.Consultar(id);
        }

        /// <summary>
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            daoBeneficiario.Excluir(id);
        }

        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario"></param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.Incluir(beneficiario);
        }

        /// <summary>
        /// Lista os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Listar()
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.Listar();
        }

        /// <summary>
        /// Lista os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.Pesquisa(iniciarEm, quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// Verifica Existencia
        /// </summary>
        /// <param name="cpf"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string cpf)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.VerificarExistencia(cpf);
        }
        /// <summary>
        /// Verifica Existencia
        /// </summary>
        /// <param name="cpf"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string cpf, long id)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.VerificarExistencia(cpf, id);
        }
    }
}
