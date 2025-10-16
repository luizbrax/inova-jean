// Estado
let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
let indexEditando = -1;

// Elementos
const containerEventos = document.getElementById('container-eventos');
const inputPesquisar = document.getElementById('pesquisar');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroStatus = document.getElementById('filtro-status');
const modal = document.getElementById('modal-evento');
const form = document.getElementById('form-evento');
const btnFechar = document.querySelector('.fechar');
const btnAdicionarEvento = document.getElementById('btn-adicionar-evento');

// Funções
function salvarEventos() {
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

function renderizarLista(eventosFiltrados = eventos) {
    if (!containerEventos) return;
    
    containerEventos.innerHTML = '';
    
    if (eventosFiltrados.length === 0) {
        containerEventos.innerHTML = `
            <div class="lista-vazia">
                <i class="fas fa-calendar-times"></i>
                <p>Nenhum evento encontrado</p>
            </div>
        `;
        return;
    }
    
    const eventosOrdenados = [...eventosFiltrados].sort((a, b) => {
        return new Date(`${a.data}T${a.hora}`) - new Date(`${b.data}T${b.hora}`);
    });
    
    eventosOrdenados.forEach((evento) => {
        const index = eventos.indexOf(evento);
        const dataFormatada = new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR');
        const categoriaClass = evento.categoria.toLowerCase().replace('ã', 'a').replace('ç', 'c');
        
        const card = document.createElement('div');
        card.className = `card-evento ${categoriaClass}`;
        card.innerHTML = `
            <div class="evento-topo">
                <h3>${evento.titulo}</h3>
                <span class="badge-categoria ${categoriaClass}">${evento.categoria}</span>
            </div>
            <div class="evento-info">
                <p><i class="fas fa-calendar"></i> ${dataFormatada}</p>
                <p><i class="fas fa-clock"></i> ${evento.hora}</p>
                ${evento.descricao ? `<p><i class="fas fa-align-left"></i> ${evento.descricao}</p>` : ''}
                <p><i class="fas fa-tasks"></i> Status: <strong>${evento.status === 'concluido' ? '✅ Concluído' : '⏳ Pendente'}</strong></p>
            </div>
            <div class="evento-acoes">
                <button class="btn-editar" onclick="editarEvento(${index})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-excluir" onclick="excluirEvento(${index})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        
        containerEventos.appendChild(card);
    });
}

function aplicarFiltros() {
    const textoPesquisa = inputPesquisar.value.toLowerCase();
    const categoria = filtroCategoria.value;
    const status = filtroStatus.value;
    
    const eventosFiltrados = eventos.filter(evento => {
        const matchTexto = evento.titulo.toLowerCase().includes(textoPesquisa) ||
                          (evento.descricao && evento.descricao.toLowerCase().includes(textoPesquisa));
        const matchCategoria = !categoria || evento.categoria === categoria;
        const matchStatus = !status || evento.status === status;
        
        return matchTexto && matchCategoria && matchStatus;
    });
    
    renderizarLista(eventosFiltrados);
}

function abrirModal(evento = null) {
    modal.classList.add('active');
    
    if (evento) {
        document.getElementById('titulo-modal').textContent = 'Editar Evento';
        document.getElementById('titulo-evento').value = evento.titulo;
        document.getElementById('data-evento').value = evento.data;
        document.getElementById('hora-evento').value = evento.hora;
        document.getElementById('categoria-evento').value = evento.categoria;
        document.getElementById('descricao-evento').value = evento.descricao || '';
        indexEditando = eventos.indexOf(evento);
    } else {
        document.getElementById('titulo-modal').textContent = 'Adicionar Evento';
        form.reset();
        indexEditando = -1;
    }
}

function fecharModal() {
    modal.classList.remove('active');
    form.reset();
    indexEditando = -1;
}

function editarEvento(index) {
    const evento = eventos[index];
    abrirModal(evento);
}

function excluirEvento(index) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
        eventos.splice(index, 1);
        salvarEventos();
        renderizarLista();
    }
}

// Event Listeners
inputPesquisar.addEventListener('input', aplicarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);
filtroStatus.addEventListener('change', aplicarFiltros);

btnAdicionarEvento.addEventListener('click', () => abrirModal());

btnFechar.addEventListener('click', fecharModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const novoEvento = {
        titulo: document.getElementById('titulo-evento').value,
        data: document.getElementById('data-evento').value,
        hora: document.getElementById('hora-evento').value,
        categoria: document.getElementById('categoria-evento').value,
        descricao: document.getElementById('descricao-evento').value,
        status: 'pendente'
    };
    
    if (indexEditando >= 0) {
        eventos[indexEditando] = novoEvento;
    } else {
        eventos.push(novoEvento);
    }
    
    eventos.sort((a, b) => new Date(`${a.data}T${a.hora}`) - new Date(`${b.data}T${b.hora}`));
    salvarEventos();
    renderizarLista();
    fecharModal();
});

// Inicialização
renderizarLista();