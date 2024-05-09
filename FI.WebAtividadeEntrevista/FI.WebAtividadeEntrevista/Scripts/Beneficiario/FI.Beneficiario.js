
$(document).ready(function () {
    $('#txtCpf').mask('000.000.000-00');
    ValidaCPF();
    SubmitForm();
    RemoveFooter();
})

function SubmitForm() {

    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();

        var html = '';
        html += '<tr id=\'0\' idCliente=\'0\'>';
        html += '<td>' + $('#txtCpf').val() + '</td>';
        html += '<td>' + $('#txtNome').val() + '</td>';
        html += '<td> <button class="btn btn-info btn-sm" onclick="AlteraBeneficiario(this)">Editar</button> <button class="btn btn-danger btn-sm" onclick="ExcluiBeneficiario(this)">Excluir</button> </td>';
        html += '</tr>';` `
        $('#beneficiariosTable tbody').append(html);
        LimpaCampos();
    })
}

function AlteraBeneficiario(el) {
    var row = el.closest("tr");

    var txCpf = document.getElementById("txtCpf");
    var txtNome = document.getElementById("txtNome");

    if (txCpf && txtNome) {
        var cpf = row.cells[0].textContent.trim(); 
        var nome = row.cells[1].textContent.trim();
        
        txCpf.value = cpf;
        txtNome.value = nome;
        ExcluiBeneficiario(el);
    } else {
        console.log("Elementos não encontrados.");
    }
}

function ExcluiBeneficiario(el) {
    var row = el.closest("tr");

    if (row) {
        row.remove();
    } else {
        console.log("Linha não encontrada.");
    }
}

function LimpaCampos() {
    $("#txtCpf").val("");
    $("#txtNome").val("");
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
