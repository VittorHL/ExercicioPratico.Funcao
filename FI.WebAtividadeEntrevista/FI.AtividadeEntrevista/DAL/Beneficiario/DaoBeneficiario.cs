using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace FI.AtividadeEntrevista.DAL
{
    /// <summary>
    /// Classe de acesso a dados do Beneficiario do cliente
    /// </summary>
    internal class DaoBeneficiario : AcessoDados
    {
        /// <summary>
        /// Altera Beneficiario
        /// </summary>
        /// <param name="beneficiario"></param>
        internal void Alterar(DML.Beneficiario beneficiario)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();
            
            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", beneficiario.Id));
            parametros.Add(new System.Data.SqlClient.SqlParameter("NOME", beneficiario.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", beneficiario.CPF));

            base.Executar("FI_SP_AltBeneficiario", parametros);
        }

        /// <summary>
        /// Converter o Dataset em uma Lista parametrizada
        /// </summary>
        /// <param name="ds"></param>
        /// <returns>List<DML.Beneficiario></returns>
        private List<DML.Beneficiario> Converter(DataSet ds)
        {
            List<DML.Beneficiario> lista = new List<DML.Beneficiario>();

            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                lista.AddRange(ds.Tables[0].AsEnumerable().Select(row =>
                {
                    DML.Beneficiario beneficiario = new DML.Beneficiario();
                    beneficiario.Id = row.Field<long>("Id");
                    beneficiario.IdCliente = row.Field<long>("IdCliente");
                    beneficiario.CPF = row.Field<string>("CPF");
                    beneficiario.Nome = row.Field<string>("Nome");

                    return beneficiario;
                }).ToList());
            }
            return lista;
        }

        /// <summary>
        /// Excluir beneficiario
        /// </summary>
        /// <param name="Id"></param>
        internal void Excluir(string listId, long idCliente)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", listId));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", idCliente));

            base.Executar("FI_SP_DelBeneficiario", parametros);
        }

        /// <summary>
        /// Inclui novo beneficiario
        /// </summary>
        /// <param name="beneficiario"></param>
        /// <returns>Retornar o id do beneficiario cadastrado</returns>
        internal long Incluir(DML.Beneficiario beneficiario)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("NOME", beneficiario.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", beneficiario.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", beneficiario.IdCliente));

            DataSet ds = base.Consultar("FI_SP_IncBeneficiario", parametros);
            long ret = 0;
            if (ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);
            return ret;
        }

        /// <summary>
        /// Pesquisar a lista de beneficiario do cliente cadastrados no sistema
        /// </summary>
        /// <param name="idCliente"></param>
        /// <returns></returns>
        internal List<DML.Beneficiario> Pesquisa(long idCliente)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", idCliente));

            DataSet ds = base.Consultar("FI_SP_PesqBeneficiario", parametros);
            List<DML.Beneficiario> beneficiarios = Converter(ds);

            return beneficiarios;
        }

        /// <summary>
        /// Validar se já existe beneficiario com o Cpf informado
        /// </summary>
        /// <param name="cpf"></param>
        /// <param name="idCliente"></param>
        /// <param name="idBeneficiario"></param>
        /// <returns></returns>
        internal bool VerificarExistencia(string cpf, long idCliente, long idBeneficiario = 0)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", cpf));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", idCliente));
            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", idBeneficiario));

            DataSet ds = base.Consultar("FI_SP_VerificaBeneficiario", parametros);

            return ds.Tables[0].Rows.Count > 0;
        }
    }
}
