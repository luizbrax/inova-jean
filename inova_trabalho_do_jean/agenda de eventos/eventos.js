// === eventos.js ===

// === Inicialização ===
let events = JSON.parse(localStorage.getItem('events')) || [];

// === Funções auxiliares ===
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

// === Modal ===
const modal = document.getElementById('event-modal');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('event-form');
const modalTitle = document.getElementById('modal-title');
let editingIndex = -1;

// === Funções do modal ===
function openModal(event = null) {
    modal.style.display = 'block';

    if (event) {
        modalTitle.textContent = 'Editar Evento';
        document.getElementById('event-title').value = event.title;
        document.getElementById('event-date').value = event.date;
        document.getElementById('event-time').value = event.time;
        document.getElementById('event-category').value = event.category;
        document.getElementById('event-description').value = event.description;
        editingIndex = events.indexOf(event);
    } else {
        modalTitle.textContent = 'Adicionar Evento';
        clearForm();
        editingIndex = -1;
    }
}

function clearForm() {
    document.getElementById('event-title').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-time').value = '';
    document.getElementById('event-category').value = 'Trabalho';
    document.getElementById('event-description').value = '';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// === Salvar evento (novo ou edição) ===
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('event-title').value.trim();
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const category = document.getElementById('event-category').value;
    const description = document.getElementById('event-description').value.trim();

    if (!title || !date || !time) {
        alert('Título, data e hora são obrigatórios!');
        return;
    }

    const eventObj = { title, date, time, category, description, status: 'pendente' };

    if (editingIndex >= 0) {
        events[editingIndex] = eventObj;
    } else {
        events.push(eventObj);
    }

    events.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
    saveEvents();
    renderEvents();
    modal.style.display = 'none';
});

// === Listagem e Filtros ===
document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('event-list');
    if (!lista) return;

    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');

    // Renderização dos eventos
    function renderEvents(filtered = events) {
        lista.innerHTML = '';

        if (filtered.length === 0) {
            lista.innerHTML = '<li class="sem-eventos">Nenhum evento encontrado.</li>';
            return;
        }

        // Ordena cronologicamente
        filtered.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

        filtered.forEach(ev => {
            const li = document.createElement('li');
            li.classList.add('event-item');
            if (ev.status === 'concluido') li.classList.add('concluido');

            li.innerHTML = `
                <div class="evento-header">
                    <h3>${ev.title}</h3>
                    <span class="category ${ev.category}">${ev.category}</span>
                </div>
                <p><strong>Data:</strong> ${ev.date}</p>
                <p><strong>Hora:</strong> ${ev.time}</p>
                <p><strong>Descrição:</strong> ${ev.description || 'Sem descrição'}</p>
                <div class="actions">
                    <button class="edit-btn">Editar</button>
                    <button class="complete-btn">${ev.status === 'pendente' ? 'Concluir' : 'Reabrir'}</button>
                    <button class="delete-btn">Excluir</button>
                </div>
            `;

            // === Botões de ação ===
            li.querySelector('.edit-btn').addEventListener('click', () => openModal(ev));

            li.querySelector('.complete-btn').addEventListener('click', () => {
                ev.status = ev.status === 'pendente' ? 'concluido' : 'pendente';
                saveEvents();
                renderEvents();
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
                const confirmModal = document.getElementById('confirm-modal');
                const confirmYes = document.getElementById('confirm-yes');
                const confirmNo = document.getElementById('confirm-no');

                confirmModal.style.display = 'block';

                confirmYes.onclick = () => {
                    events = events.filter(e => e !== ev);
                    saveEvents();
                    renderEvents();
                    confirmModal.style.display = 'none';
                };

                confirmNo.onclick = () => {
                    confirmModal.style.display = 'none';
                };

                window.onclick = (e) => {
                    if (e.target === confirmModal) confirmModal.style.display = 'none';
                };
            });


            lista.appendChild(li);
        });
    }

    // Aplicar filtros
    function aplicarFiltros() {
        let filtrados = events;

        const busca = searchInput.value.toLowerCase();
        const categoria = categoryFilter.value;
        const status = statusFilter.value;

        filtrados = filtrados.filter(ev => {
            const matchBusca =
                ev.title.toLowerCase().includes(busca) ||
                ev.description.toLowerCase().includes(busca);
            const matchCategoria = categoria ? ev.category === categoria : true;
            const matchStatus = status ? ev.status === status : true;
            return matchBusca && matchCategoria && matchStatus;
        });

        renderEvents(filtrados);
    }

    // Listeners
    searchInput.addEventListener('input', aplicarFiltros);
    categoryFilter.addEventListener('change', aplicarFiltros);
    statusFilter.addEventListener('change', aplicarFiltros);

    // Botão "Adicionar Novo Evento"
    document.getElementById('add-event-link').addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    // Render inicial
    renderEvents();
});
