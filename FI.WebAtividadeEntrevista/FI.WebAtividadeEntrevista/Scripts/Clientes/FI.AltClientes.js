
$(document).ready(function () {
    ValidaCPF();
    LoadInput();
    SubmitForm();
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
                "CPF": $(this).find("#CPF").unmask().val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
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
                    let beneficiarios = BuscaBeneficiariosIncluidos();
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
            }
    });
}

function BuscaBeneficiariosIncluidos() {
    let dadosBeneficiarios = [];

    $('#beneficiariosTable tbody tr').each(function () {
        let id = $(this).attr("id");
        let idCliente = $(this).attr("idcliente");
        let cpf = $(this).find('td:eq(0)').text().trim().replace(/\D/g, '');
        let nome = $(this).find('td:eq(1)').text().trim();
        dadosBeneficiarios.push({ Id: id, Nome: nome, CPF: cpf, idCliente: idCliente });
    });
    
    return dadosBeneficiarios;
}

function LoadInput() {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #CPF').val(obj.CPF).mask('000.000.000-00');
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);

        let link = document.getElementById('btnModalBeneficiario');
        link.href = urlBeneficiario + "/" + obj.Id;
    }
}

function ValidaCPF() {
    const input = $("#CPF");

    input.on("change", function () {
        let cpf = input.unmask().val();

        if (!ValidarCPF(cpf)) {
            ModalDialog("Ocorreu um erro", "CPF Inválido!");
            input.val("");
        }

        input.mask('000.000.000-00');
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
