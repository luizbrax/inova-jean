// Estado
let dataAtual = new Date();
let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
let feriados = [];
let indexEditando = -1;

// Elementos
const gradeCalendario = document.getElementById('grade-calendario');
const mesAtual = document.getElementById('mes-atual');
const modal = document.getElementById('modal-evento');
const form = document.getElementById('form-evento');
const btnFechar = document.querySelector('.fechar');
const btnMesAnterior = document.getElementById('btn-mes-anterior');
const btnProximoMes = document.getElementById('btn-proximo-mes');
const btnAdicionarEvento = document.getElementById('btn-adicionar-evento');

// Funções auxiliares
function salvarEventos() {
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

async function carregarFeriados(ano) {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
        if (response.ok) {
            feriados = await response.json();
        }
    } catch (erro) {
        console.error('Erro ao carregar feriados:', erro);
    }
    renderizarCalendario();
}

function renderizarCalendario() {
    if (!gradeCalendario) return;
    
    gradeCalendario.innerHTML = '';
    
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    
    mesAtual.textContent = new Intl.DateTimeFormat('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
    }).format(dataAtual);
    
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    
    // Dias vazios
    for (let i = 0; i < primeiroDia; i++) {
        const diaVazio = document.createElement('div');
        diaVazio.className = 'dia vazio';
        gradeCalendario.appendChild(diaVazio);
    }
    
    // Dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const dataStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const diaElement = document.createElement('div');
        diaElement.className = 'dia';
        diaElement.textContent = dia;
        
        // Dia atual
        const hoje = new Date();
        if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
            diaElement.classList.add('atual');
        }
        
        // Eventos do dia
        const eventosNoDia = eventos.filter(e => e.data === dataStr);
        if (eventosNoDia.length > 0) {
            diaElement.classList.add('tem-evento');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerHTML = eventosNoDia.map(e => `${e.titulo} (${e.hora})`).join('<br>');
            diaElement.appendChild(tooltip);
        }
        
        // Feriado
        const feriado = feriados.find(f => f.date === dataStr);
        if (feriado) {
            diaElement.classList.add('feriado');
            const tooltipFeriado = document.createElement('div');
            tooltipFeriado.className = 'tooltip';
            tooltipFeriado.textContent = feriado.name;
            diaElement.appendChild(tooltipFeriado);
        }
        
        // Clique no dia
        diaElement.addEventListener('click', () => abrirModal(dataStr));
        
        gradeCalendario.appendChild(diaElement);
    }
}

function abrirModal(data = '', evento = null) {
    modal.classList.add('active');
    document.getElementById('data-evento').value = data;
    
    if (evento) {
        document.getElementById('titulo-modal').textContent = 'Editar Evento';
        document.getElementById('titulo-evento').value = evento.titulo;
        document.getElementById('hora-evento').value = evento.hora;
        document.getElementById('categoria-evento').value = evento.categoria;
        document.getElementById('descricao-evento').value = evento.descricao || '';
        indexEditando = eventos.indexOf(evento);
    } else {
        document.getElementById('titulo-modal').textContent = 'Adicionar Evento';
        form.reset();
        document.getElementById('data-evento').value = data;
        indexEditando = -1;
    }
}

function fecharModal() {
    modal.classList.remove('active');
    form.reset();
    indexEditando = -1;
}

// Event Listeners
btnMesAnterior.addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    carregarFeriados(dataAtual.getFullYear());
});

btnProximoMes.addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    carregarFeriados(dataAtual.getFullYear());
});

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
    renderizarCalendario();
    fecharModal();
});

// Inicialização
carregarFeriados(dataAtual.getFullYear());