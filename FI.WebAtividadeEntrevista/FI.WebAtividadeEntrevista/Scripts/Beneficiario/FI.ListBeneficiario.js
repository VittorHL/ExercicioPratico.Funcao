
$(document).ready(function () {
    var html = '';

    if (obj && $("#divSaveTempBeneficiario tr").length == 0) {
        obj.Data.forEach(function (element) {
            let id = element.Id;
            let idCliente = element.IdCliente;
            let cpf = element.CPF.trim();
            let nome = element.Nome.trim();

            html += '<tr id=\'' + id + '\' idCliente=\'' + idCliente + '\'>';
            html += '<td>' + cpf + '</td>';
            html += '<td>' + nome + '</td>';
            html += '<td> <button class="btn btn-info btn-sm" onclick="AlteraBeneficiario(this)">Editar</button> <button class="btn btn-danger btn-sm" onclick="ExcluiBeneficiario(this)">Excluir</button> </td>';
            html += '</tr>';
        });
        $('#divSaveTempBeneficiario').append(html);
    }
})