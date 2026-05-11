window.onload = function () {

  carregarDisciplinas();

  carregarCards();
};

let contador = 0;

let perfilAtual = '';

function entrarSistema() {

  const usuario =
    document.getElementById('usuario').value;

  const perfil =
    document.getElementById('perfil').value;

  if (usuario === '') {

    alert('Digite seu nome.');

    return;
  }

  perfilAtual = perfil;

  document.getElementById('telaLogin')
    .style.display = 'none';

  document.getElementById('sistema')
    .style.display = 'block';

  if (perfil === 'Aluno') {

    document.querySelector('.disciplina-box')
      .style.display = 'none';

    document.getElementById('areaProfessor')
      .style.display = 'none';

  } else {

    document.querySelector('.disciplina-box')
      .style.display = 'flex';

    document.getElementById('areaProfessor')
      .style.display = 'flex';
  }

  carregarDisciplinas();

  carregarCards();
}

function criarDisciplina() {

  if (perfilAtual !== 'Professor') {

    alert('Somente professores podem criar disciplinas.');

    return;
  }

  const disciplina =
    document.getElementById('disciplina').value;

  if (disciplina === '') {

    alert('Digite o nome da disciplina.');

    return;
  }

  let disciplinas =
    JSON.parse(localStorage.getItem('disciplinas')) || [];

  disciplinas.push(disciplina);

  localStorage.setItem(
    'disciplinas',
    JSON.stringify(disciplinas)
  );

  document.getElementById('disciplina').value = '';

  carregarDisciplinas();
}

function carregarDisciplinas() {

  const select =
    document.getElementById('disciplinaSelect');

  select.innerHTML = `

    <option value="">
      Selecione a disciplina
    </option>

  `;

  let disciplinas =
    JSON.parse(localStorage.getItem('disciplinas')) || [];

  disciplinas.forEach(disciplina => {

    const option =
      document.createElement('option');

    option.value = disciplina;

    option.innerText = disciplina;

    select.appendChild(option);
  });
}

function criarCard() {

  if (perfilAtual !== 'Professor') {

    alert('Somente professores podem criar atividades.');

    return;
  }

  const titulo =
    document.getElementById('titulo').value;

  const descricao =
    document.getElementById('descricao').value;

  const prazo =
    document.getElementById('prazo').value;

  const horario =
    document.getElementById('horario').value;

  const aluno =
    document.getElementById('aluno').value;

  const disciplina =
    document.getElementById('disciplinaSelect').value;

  const responsavel =
    document.getElementById('responsavel').value;

  if (
    titulo === '' ||
    descricao === '' ||
    prazo === '' ||
    horario === '' ||
    aluno === '' ||
    disciplina === ''
  ) {

    alert('Preencha todos os campos.');

    return;
  }

  contador++;

  const tarefa = {

    id: 'card-' + contador,

    titulo,

    descricao,

    prazo,

    horario,

    aluno,

    disciplina,

    responsavel,

    coluna: 'todo'
  };

  salvarCard(tarefa);

  adicionarCardNaTela(tarefa);

  limparCampos();

  verificarPrazos();
}

function adicionarCardNaTela(tarefa) {

  const card =
    document.createElement('div');

  card.classList.add('card');

  card.id = tarefa.id;

  card.draggable = true;

  card.addEventListener('dragstart', drag);

  card.innerHTML = `

    <h3>${tarefa.titulo}</h3>

    <p>${tarefa.descricao}</p>

    <small>
      <strong>Prazo:</strong>
      ${tarefa.prazo}
    </small>

    <small>
      <strong>Horário:</strong>
      ${tarefa.horario}
    </small>

    <small>
      <strong>Disciplina:</strong>
      ${tarefa.disciplina}
    </small>

    <small>
      <strong>Aluno:</strong>
      ${tarefa.aluno}
    </small>

    <small>
      <strong>Responsável:</strong>
      ${tarefa.responsavel}
    </small>

    <textarea class="comentario"
      placeholder="Comentários"></textarea>

    <div class="acoes">

      <button class="editar"
        onclick="editarCard('${tarefa.id}')">

        Editar

      </button>

      <button class="excluir"
        onclick="excluirCard('${tarefa.id}')">

        Excluir

      </button>

    </div>
  `;

  if (perfilAtual === 'Aluno') {

    card.querySelector('.acoes')
      .style.display = 'none';
  }

  document.getElementById(tarefa.coluna)
    .appendChild(card);
}

function salvarCard(tarefa) {

  let tarefas =
    JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.push(tarefa);

  localStorage.setItem(
    'tarefas',
    JSON.stringify(tarefas)
  );
}

function carregarCards() {

  document.getElementById('todo')
    .innerHTML = '<h2>A Fazer</h2>';

  document.getElementById('doing')
    .innerHTML = '<h2>Em Andamento</h2>';

  document.getElementById('done')
    .innerHTML = '<h2>Concluído</h2>';

  let tarefas =
    JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.forEach(tarefa => {

    adicionarCardNaTela(tarefa);
  });
}

function limparCampos() {

  document.getElementById('titulo').value = '';

  document.getElementById('descricao').value = '';

  document.getElementById('prazo').value = '';

  document.getElementById('horario').value = '';

  document.getElementById('aluno').value = '';

  document.getElementById('disciplinaSelect').value = '';
}

function excluirCard(id) {

  if (perfilAtual !== 'Professor') {

    alert('Somente professores podem excluir.');

    return;
  }

  let tarefas =
    JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas =
    tarefas.filter(tarefa => tarefa.id !== id);

  localStorage.setItem(
    'tarefas',
    JSON.stringify(tarefas)
  );

  carregarCards();
}

function editarCard(id) {

  if (perfilAtual !== 'Professor') {

    alert('Somente professores podem editar.');

    return;
  }

  let tarefas =
    JSON.parse(localStorage.getItem('tarefas')) || [];

  const tarefa =
    tarefas.find(t => t.id === id);

  const novoTitulo =
    prompt('Novo título:', tarefa.titulo);

  const novaDescricao =
    prompt('Nova descrição:', tarefa.descricao);

  if (novoTitulo && novaDescricao) {

    tarefa.titulo = novoTitulo;

    tarefa.descricao = novaDescricao;

    localStorage.setItem(
      'tarefas',
      JSON.stringify(tarefas)
    );

    carregarCards();
  }
}

function filtrarCards() {

  const filtro =
    document.getElementById('filtroStatus').value;

  const cards =
    document.querySelectorAll('.card');

  cards.forEach(card => {

    if (filtro === 'todos') {

      card.style.display = 'block';
    }

    else if (filtro === 'pendente') {

      if (card.parentElement.id !== 'done') {

        card.style.display = 'block';

      } else {

        card.style.display = 'none';
      }
    }

    else if (filtro === 'concluido') {

      if (card.parentElement.id === 'done') {

        card.style.display = 'block';

      } else {

        card.style.display = 'none';
      }
    }
  });
}

function verificarPrazos() {

  const hoje = new Date();

  let tarefas =
    JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.forEach(tarefa => {

    const prazo =
      new Date(tarefa.prazo);

    const diferenca =
      prazo - hoje;

    const dias =
      diferenca / (1000 * 60 * 60 * 24);

    if (dias <= 1 && dias >= 0) {

      console.log(
        'Tarefa próxima do vencimento:',
        tarefa.titulo
      );
    }
  });
}

function allowDrop(event) {

  event.preventDefault();
}

function drag(event) {

  event.dataTransfer.setData(
    'text',
    event.target.id
  );
}

function drop(event) {

  event.preventDefault();

  const id =
    event.dataTransfer.getData('text');

  const coluna =
    event.target.closest('.column');

  const card =
    document.getElementById(id);

  coluna.appendChild(card);

  let tarefas =
    JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.forEach(tarefa => {

    if (tarefa.id === id) {

      tarefa.coluna = coluna.id;
    }
  });

  localStorage.setItem(
    'tarefas',
    JSON.stringify(tarefas)
  );
}
