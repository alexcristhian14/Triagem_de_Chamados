const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chamados = [];

function mostrarMenu() {
  console.log("----------------------------");
  console.log("Sistema de Triagem de Chamados");
  console.log("----------------------------");
  console.log("1 - Cadastrar novo chamado");
  console.log("2 - Listar chamados cadastrados");
  console.log("3 - Sair do Sistema de Triagem de Chamados");
  console.log("----------------------------");
}

function classificarPrioridade(impacto, urgencia) {
  let prioridade;

  if (impacto === 3 && urgencia === 3) {
    prioridade = "CRÍTICA";
  } else if (impacto === 3 || urgencia === 3) {
    prioridade = "ALTA";
  } else if (impacto === 2 || urgencia === 2) {
    prioridade = "MÉDIA";
  } else {
    prioridade = "BAIXA";
  }

  return prioridade;
}
async function cadastrarChamado() {
  const nomeSolicitante = await rl.question("Digite o nome do solicitante: ");
  const descricaoProblema = await rl.question(
    "Digite a descrição do problema: ",
  );

  let impacto = Number(
    await rl.question(
      "Digite o impacto do chamado (1 - Baixo, 2 - Médio, 3 - Alto): ",
    ),
  );
  while (impacto !== 1 && impacto !== 2 && impacto !== 3) {
    console.log("Valor inválido! Digite 1, 2 ou 3.");
    impacto = Number(
      await rl.question(
        "Digite o impacto do chamado (1 - Baixo, 2 - Médio, 3 - Alto): ",
      ),
    );
  }

  let urgencia = Number(
    await rl.question(
      "Digite a urgência do chamado (1 - Baixa, 2 - Média, 3 - Alta): ",
    ),
  );
  while (urgencia !== 1 && urgencia !== 2 && urgencia !== 3) {
    console.log("Valor inválido! Digite 1, 2 ou 3.");
    urgencia = Number(
      await rl.question(
        "Digite a urgência do chamado (1 - Baixa, 2 - Média, 3 - Alta): ",
      ),
    );
  }

  const prioridade = classificarPrioridade(impacto, urgencia);

  const chamado = {
    nomeSolicitante,
    descricaoProblema,
    impacto,
    urgencia,
    prioridade,
  };

  chamados.push(chamado);
  
  console.log("----------------------------");
  console.log("Chamado cadastrado com sucesso!");
  console.log(`Solicitante: ${nomeSolicitante}`);
  console.log(`Prioridade: ${prioridade}`);
  console.log("----------------------------");
}

function listarChamados() {
  if (chamados.length === 0) {
    console.log("Nenhum chamado cadastrado.");
  } else {
    for (const chamado of chamados) {
      console.log("----------------------------");
      console.log(`Nome do Solicitante: ${chamado.nomeSolicitante}`);
      console.log(`Descrição do Problema: ${chamado.descricaoProblema}`);
      console.log(`Impacto: ${chamado.impacto}`);
      console.log(`Urgência: ${chamado.urgencia}`);
      console.log(`Prioridade: ${chamado.prioridade}`);
      console.log("----------------------------");
    }
  }
}

async function principal() {
  let continuar = true;

  while (continuar) {
    mostrarMenu();
    const opcao = Number(await rl.question("Digite a opção desejada: "));

    switch (opcao) {
      case 1:
        await cadastrarChamado();
        break;
      case 2:
        listarChamados();
        break;
      case 3:
        console.log("Saindo do Sistema de Triagem de Chamados...");
        continuar = false;
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
        break;
    }
  }

  rl.close();
}

principal();
