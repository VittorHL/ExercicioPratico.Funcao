function ValidarCPF(cpf) {
    // Remover caracteres não numéricos
    var strCPF = cpf.replace(/[^\d]/g, '');
    
    // Verificar se o CPF possui 11 dígitos
    if (strCPF.length !== 11)
      return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(strCPF))
      return false;
    
    // Calcular o primeiro dígito verificador
    var Soma = 0;
    for (var i = 0; i < 9; i++)
      Soma += parseInt(strCPF.charAt(i)) * (10 - i);
    var Resto = 11 - (Soma % 11);
    var digitoVerificador1 = Resto === 10 || Resto === 11 ? 0 : Resto;
  
    // Verificar o primeiro dígito verificador
    if (digitoVerificador1 !== parseInt(strCPF.charAt(9)))
      return false;
  
    // Calcular o segundo dígito verificador
    Soma = 0;
    for (var i = 0; i < 10; i++)
      Soma += parseInt(strCPF.charAt(i)) * (11 - i);
    Resto = 11 - (Soma % 11);
    var digitoVerificador2 = Resto === 10 || Resto === 11 ? 0 : Resto;
  
    // Verificar o segundo dígito verificador
    if (digitoVerificador2 !== parseInt(strCPF.charAt(10)))
      return false;
  
    return true;
  }
  