// agenda.js

// Inicialização
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('events')) || [];

// Funções auxiliares
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonth = document.getElementById('current-month');
    calendarGrid.innerHTML = '';

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentMonth.textContent = `${new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(currentDate)} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Dias vazios antes do primeiro dia
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        calendarGrid.appendChild(emptyDay);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElem = document.createElement('div');
        dayElem.classList.add('day');
        dayElem.textContent = day;

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === dateStr);

        if (dayEvents.length > 0) {
            dayElem.classList.add('has-event');
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = dayEvents.map(e => `<p>${e.title} (${e.time})</p>`).join('');
            dayElem.appendChild(tooltip);
        }

        if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayElem.classList.add('current-day');
        }

        dayElem.addEventListener('click', () => openModal(dateStr));
        calendarGrid.appendChild(dayElem);
    }
}

// Modal
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
    renderCalendar();
    modal.style.display = 'none';
});

// Navegação de meses
document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Adicionar evento do rodapé
document.getElementById('add-event-link').addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

// Inicial render
renderCalendar();