
$(document).ready(function () {
    $('#txtCpf').mask('000.000.000-00');
    VerificaDivTemporaria();
    ValidaCPF();
    SubmitForm();
    RemoveFooter();
})

function SubmitForm() {

    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();

        let html = '';
        let div = $('#divSaveTempBeneficiario');
        let table = $('#beneficiariosTable tbody');
        let hideIdBeneficiario = $('#hideIdBeneficiario');
        let hideIdCliente = $('#hideIdCliente');

        let valorCPF = $('#txtCpf').val().replace(/\D/g, '');
        let valorNome = $('#txtNome').val();
        let valorIdBeneficiario = 0;
        let valorIdCliente = 0;

        if (VerificaInclusao(valorCPF)) {
            return;
        }

        if (hideIdBeneficiario.val() != 0) {
            valorIdBeneficiario = hideIdBeneficiario.val();
        }

        if (hideIdCliente.val() != 0) {
            valorIdCliente = hideIdCliente.val();
        }

        html += '<tr id=\'' + valorIdBeneficiario + '\' idCliente=\'' + valorIdCliente + '\'>';
        html += '<td>' + valorCPF + '</td>';
        html += '<td>' + valorNome + '</td>';
        html += '<td> <button class="btn btn-info btn-sm" onclick="AlteraBeneficiario(this)">Editar</button> <button class="btn btn-danger btn-sm" onclick="ExcluiBeneficiario(this)">Excluir</button> </td>';
        html += '</tr>'; ` `

        table.append(html);
        div.html(table.html());
        LimpaCampos();
    })
}

function VerificaDivTemporaria() {
    let div = $("#divSaveTempBeneficiario tr");
    
    if (div.length > 0) {
        $('#beneficiariosTable tbody').append($("#divSaveTempBeneficiario").html());
    }
}

function VerificaInclusao(cpf) {
    var existeCpf = false;

    $('#beneficiariosTable tbody tr').each(function () {
        let cpfCadastrado = $(this).find('td:eq(0)').text().trim().replace(/\D/g, '');
        
        if (cpfCadastrado == cpf) {
            ModalDialog("Ocorreu um erro", "CPF já incluído!");
            existeCpf = true;
        }
    });

    return existeCpf;
}

function AlteraBeneficiario(el) {
    let row = el.closest("tr");
    
    let txCpf = document.getElementById("txtCpf");
    let txtNome = document.getElementById("txtNome");
    let hideIdCliente = document.getElementById("hideIdCliente");
    let hideIdBeneficiario = document.getElementById("hideIdBeneficiario");

    if (txCpf && txtNome) {
        var cpf = row.cells[0].textContent.trim(); 
        var nome = row.cells[1].textContent.trim();
        
        txCpf.value = cpf;
        txtNome.value = nome;
        hideIdCliente.value = row.getAttribute("idcliente");
        hideIdBeneficiario.value = row.getAttribute("id");;
        el.closest("tr").remove();
    } else {
        console.log("Elementos não encontrados.");
    }
}

function ExcluiBeneficiario(el) {
    var row = el.closest("tr");

    if (row) {
        row.remove();
        $('#divSaveTempBeneficiario').html($('#beneficiariosTable tbody').html());
    } else {
        console.log("Linha não encontrada.");
    }
}

function LimpaCampos() {
    $("#txtCpf").val("");
    $("#txtNome").val("");
    $('#hideIdBeneficiario').val("0");
    $('#hideIdCliente').val("0");
}

function ValidaCPF() {
    const input = $("#txtCpf");

    input.on("change", function () {
        let cpf = input.val();

        if (!ValidarCPF(cpf)) {
            ModalDialog("Ocorreu um erro", "CPF Inválido!");
            input.val("");
        }
    });
}

function RemoveFooter() {
    document.querySelector("hr").remove();
    document.querySelector("footer").remove();
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
