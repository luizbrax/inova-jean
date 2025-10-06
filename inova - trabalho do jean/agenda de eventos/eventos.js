// eventos.js

// Inicialização
let events = JSON.parse(localStorage.getItem('events')) || [];

// Funções auxiliares
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function renderEvents(filteredEvents = events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    filteredEvents.forEach((event, index) => {
        const li = document.createElement('li');
        li.classList.add('event-item');
        if (event.status === 'concluido') li.classList.add('concluido');

        li.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.date} às ${event.time}</p>
            <span class="category ${event.category}">${event.category}</span>
            <p class="description">${event.description.substring(0, 100)}... <span class="full" style="display:none;">${event.description}</span></p>
            <div class="actions">
                <button class="edit-btn" onclick="editEvent(${index})"><i class="fas fa-edit"></i> Editar</button>
                <button class="delete-btn" onclick="deleteEvent(${index})"><i class="fas fa-trash"></i> Excluir</button>
                <button class="complete-btn" onclick="completeEvent(${index})"><i class="fas fa-check"></i> Concluir</button>
            </div>
        `;

        // Expansão de descrição
        const desc = li.querySelector('.description');
        desc.addEventListener('click', () => {
            const full = desc.querySelector('.full');
            full.style.display = full.style.display === 'none' ? 'inline' : 'none';
            desc.textContent = full.style.display === 'none' ? `${event.description.substring(0, 100)}...` : event.description;
        });

        eventList.appendChild(li);
    });
}

// Filtros e Pesquisa
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const statusFilter = document.getElementById('status-filter');

function applyFilters() {
    let filtered = events;

    const search = searchInput.value.toLowerCase();
    if (search) {
        filtered = filtered.filter(e => e.title.toLowerCase().includes(search) || e.description.toLowerCase().includes(search));
    }

    const category = categoryFilter.value;
    if (category) {
        filtered = filtered.filter(e => e.category === category);
    }

    const status = statusFilter.value;
    if (status) {
        filtered = filtered.filter(e => e.status === status);
    }

    renderEvents(filtered);
}

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
statusFilter.addEventListener('change', applyFilters);

// Funções de ações
window.editEvent = function(index) {
    openModal(events[index].date, events[index]);
};

window.deleteEvent = function(index) {
    if (confirm('Excluir evento?')) {
        events.splice(index, 1);
        saveEvents();
        renderEvents();
    }
};

window.completeEvent = function(index) {
    events[index].status = events[index].status === 'concluido' ? 'pendente' : 'concluido';
    saveEvents();
    renderEvents();
};

// Modal (similar ao agenda.js)
const modal = document.getElementById('event-modal');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('event-form');
const modalTitle = document.getElementById('modal-title');
let editingIndex = -1;

function openModal(date, event = null) {
    modal.style.display = 'block';
    document.getElementById('event-date').value = date || '';
    if (event) {
        modalTitle.textContent = 'Editar Evento';
        document.getElementById('event-title').value = event.title;
        document.getElementById('event-time').value = event.time;
        document.getElementById('event-category').value = event.category;
        document.getElementById('event-description').value = event.description;
        editingIndex = index;
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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const category = document.getElementById('event-category').value;
    const description = document.getElementById('event-description').value;

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

// Adicionar evento do rodapé
document.getElementById('add-event-link').addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

// Inicial render
events.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
renderEvents();