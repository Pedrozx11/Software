let contador = 0;

function criarCard() {

  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const prazo = document.getElementById('prazo').value;
  const responsavel = document.getElementById('responsavel').value;

  if (titulo === '' || descricao === '' || prazo === '') {
    alert('Preencha todos os campos.');
    return;
  }

  contador++;

  const card = document.createElement('div');

  card.classList.add('card');
  card.id = 'card-' + contador;
  card.draggable = true;

  card.addEventListener('dragstart', drag);

  card.innerHTML = `

    <h3>${titulo}</h3>

    <p>${descricao}</p>

    <small>
      <strong>Prazo:</strong> ${prazo}
    </small>

    <small>
      <strong>Responsável:</strong> ${responsavel}
    </small>

    <div class="acoes">

      <button class="editar"
        onclick="editarCard('${card.id}')">

        Editar

      </button>

      <button class="excluir"
        onclick="excluirCard('${card.id}')">

        Excluir

      </button>

    </div>
  `;

  document.getElementById('todo').appendChild(card);

  limparCampos();
}

function limparCampos() {

  document.getElementById('titulo').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('prazo').value = '';
}

function excluirCard(id) {

  const card = document.getElementById(id);

  card.remove();
}

function editarCard(id) {

  const card = document.getElementById(id);

  const novoTitulo = prompt('Novo título da atividade:');
  const novaDescricao = prompt('Nova descrição da atividade:');

  if (novoTitulo && novaDescricao) {

    card.querySelector('h3').innerText = novoTitulo;

    card.querySelector('p').innerText = novaDescricao;
  }
}

function allowDrop(event) {

  event.preventDefault();
}

function drag(event) {

  event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {

  event.preventDefault();

  const id = event.dataTransfer.getData('text');

  const card = document.getElementById(id);

  const coluna = event.target.closest('.column');

  coluna.appendChild(card);
}