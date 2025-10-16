// Fireflies
function createFireflies() {
    const firefliesContainer = document.querySelector('.fireflies');
    const numFireflies = 20;
    for (let i = 0; i < numFireflies; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.left = `${Math.random() * 100}vw`;
        firefly.style.top = `${Math.random() * 100}vh`;
        firefly.style.setProperty('--dx', Math.random() * 2 - 1);
        firefly.style.setProperty('--dy', Math.random() * 2 - 1);
        firefly.style.animationDelay = `${Math.random() * 5}s`;
        firefliesContainer.appendChild(firefly);
    }
}
createFireflies();

// Smooth scroll
document.querySelectorAll('nav a, footer a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            const overlay = document.getElementById('overlay');
            overlay.style.opacity = 1;
            setTimeout(() => {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
                setTimeout(() => { overlay.style.opacity = 0; }, 500);
            }, 500);
        }
    });
});
// Fireflies fixos no fundo
function createFireflies(num = 20) {
    const firefliesContainer = document.querySelector('.fireflies');
    for (let i = 0; i < num; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.left = `${Math.random() * 100}vw`;
        firefly.style.top = `${Math.random() * 100}vh`;
        firefly.style.setProperty('--dx', Math.random() * 2 - 1);
        firefly.style.setProperty('--dy', Math.random() * 2 - 1);
        firefly.style.animationDelay = `${Math.random() * 5}s`;
        firefliesContainer.appendChild(firefly);
    }
}
createFireflies();

// Pegar todos os fireflies (incluindo os que surgem ao clicar)
function getAllFireflies() {
    return document.querySelectorAll('.firefly');
}

// Fireflies fugindo do mouse
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const repelDistance = 100; // distância de repulsão em px

    getAllFireflies().forEach(firefly => {
        const rect = firefly.getBoundingClientRect();
        const fx = rect.left + rect.width / 2;
        const fy = rect.top + rect.height / 2;

        const dx = fx - mouseX;
        const dy = fy - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repelDistance) {
            const angle = Math.atan2(dy, dx);
            const moveX = Math.cos(angle) * (repelDistance - distance) * 0.3; // suavizar movimento
            const moveY = Math.sin(angle) * (repelDistance - distance) * 0.3;

            firefly.style.left = `${firefly.offsetLeft + moveX}px`;
            firefly.style.top = `${firefly.offsetTop + moveY}px`;
        }
    });
});

// Criar fireflies ao clicar
document.addEventListener('click', (e) => {
    const firefliesContainer = document.querySelector('.fireflies');
    const numClickFireflies = 5;

    for (let i = 0; i < numClickFireflies; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');

        // Posição inicial: onde o mouse clicou
        firefly.style.left = `${e.clientX}px`;
        firefly.style.top = `${e.clientY}px`;

        // Movimento aleatório
        firefly.style.setProperty('--dx', Math.random() * 2 - 1);
        firefly.style.setProperty('--dy', Math.random() * 2 - 1);
        firefly.style.animationDelay = `${Math.random() * 5}s`;

        firefliesContainer.appendChild(firefly);

        // Remover firefly depois de um tempo
        setTimeout(() => firefly.remove(), 8000);
    }
});

// Fetch GitHub data
async function fetchGitHubData() {
    const username = 'luizbrax';

    // Profile picture
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();
    document.getElementById('profile-pic').src = userData.avatar_url;

    // Profile name
    const nameElement = document.getElementById('profile-name');
    nameElement.textContent = userData.name || username;

    // Projects
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await reposResponse.json();
    const projectsGrid = document.getElementById('projects-grid');

    repos.forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Sem descrição'}</p>
            <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
        `;
        projectsGrid.appendChild(card);
    });
}
fetchGitHubData();

// Smooth scroll
document.querySelectorAll('nav a, footer a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            const overlay = document.getElementById('overlay');
            overlay.style.opacity = 1;
            setTimeout(() => {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
                setTimeout(() => { overlay.style.opacity = 0; }, 500);
            }, 500);
        }
    });
});
