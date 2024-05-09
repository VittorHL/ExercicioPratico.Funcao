using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
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
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(string listId, long idCliente)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            daoBeneficiario.Excluir(listId, idCliente);
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
        public List<DML.Beneficiario> Pesquisa(long idCliente)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.Pesquisa(idCliente);
        }

        /// <summary>
        /// Verifica Existencia - quando estiver incluindo o beneficiario
        /// </summary>
        /// <param name="cpf"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string cpf, long idCliente)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.VerificarExistencia(cpf, idCliente);
        }

        /// <summary>
        /// Verifica Existencia - quando estiver alterando o beneficiario
        /// </summary>
        /// <param name="cpf"></param>
        /// <param name="idCliente"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string cpf, long idBeneficiario, long idCliente)
        {
            DAL.DaoBeneficiario daoBeneficiario = new DAL.DaoBeneficiario();
            return daoBeneficiario.VerificarExistencia(cpf, idCliente, idBeneficiario);
        }
    }
}
