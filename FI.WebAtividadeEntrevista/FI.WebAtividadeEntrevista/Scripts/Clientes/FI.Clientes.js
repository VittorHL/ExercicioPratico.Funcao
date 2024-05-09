
$(document).ready(function () {
    ValidaCPF();
    PreparaInputs();
    SubmitForm();

    let link = document.getElementById('btnModalBeneficiario');
    link.href = urlBeneficiario;
})

function SubmitForm() {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "CPF": $(this).find("#CPF").val().replace(/\D/g, ''),
                "CEP": $(this).find("#CEP").val().replace(/\D/g, ''),
                "Email": $(this).find("#Email").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val().replace(/\D/g, '')
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    let beneficiarios = BuscaBeneficiariosIncluidos(r);
                    SubmitBeneficiarios(beneficiarios);
                }
        });
    })
}

function SubmitBeneficiarios(param) {
    $.ajax({
        url: urlPostBeneficiario,
        method: "POST",
        data: { "Beneficiario": param },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                let msg = r.sucesso + '</br>' + r.mensagens;
                ModalDialog("Sucesso!", msg);
                $("#formCadastro")[0].reset();
                $("#beneficiariosTable tbody").append("");
            }
    });
}

function BuscaBeneficiariosIncluidos(_Id) {
    let dadosBeneficiarios = [];

    $('#beneficiariosTable tbody tr').each(function () {
        let cpf = $(this).find('td:eq(0)').text().trim().replace(/\D/g, '');
        let nome = $(this).find('td:eq(1)').text().trim();
        let idCliente = _Id;
        dadosBeneficiarios.push({ Nome: nome, CPF: cpf, idCliente: idCliente});
    });

    return dadosBeneficiarios;
}

function PreparaInputs() {
    $('#CPF').mask('000.000.000-00');
    $("#CEP").mask("99.999-999");

    var maskTelefone = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
        Options = {
            onKeyPress: function (val, e, field, options) {
                field.mask(maskTelefone.apply({}, arguments), options);
            }
        };

    $('#Telefone').mask(maskTelefone, Options);
}

function ValidaCPF() {
    const input = $("#CPF");

    input.on("change", function () {
        let cpf = input.val();

        if (!ValidarCPF(cpf)) {
            ModalDialog("Ocorreu um erro", "CPF Inválido!");
            input.val("");
        }
    });
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
