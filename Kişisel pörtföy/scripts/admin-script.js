// admin.js

document.addEventListener('DOMContentLoaded', function() {
    const projectForm = document.getElementById('project-form');
    const projectsList = document.getElementById('projects');
    const imageInput = document.getElementById('project-image');
    const imagePreview = document.getElementById('image-preview');
    const linkInput = document.getElementById('project-link');
    const adminPassword = 'admin123'; // Güvenlik için daha güçlü bir şifre kullanılmalıdır

    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    function renderProjects() {
        projectsList.innerHTML = '';
        projects.forEach((project, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <img src="${project.image}" alt="${project.title}" style="max-width: 200px;">
            <p><a href="${project.link}" target="_blank">${project.link}</a></p>
            <button class="edit-btn" data-index="${index}">Düzenle</button>
            <button class="delete-btn" data-index="${index}">Sil</button>
            `;
            projectsList.appendChild(li);
        });
        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                projects.splice(index, 1);
                localStorage.setItem('projects', JSON.stringify(projects));
                renderProjects();
                updateHomePage();
            });
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const project = projects[index];
                document.getElementById('project-title').value = project.title;
                document.getElementById('project-description').value = project.description;
                imagePreview.src = project.image;
                imagePreview.style.display = 'block';
                linkInput.value = project.link;
                projectForm.setAttribute('data-edit-index', index);
            });
        });
    }

    projectForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const image = imagePreview.src;
        const link = linkInput.value;

        const index = projectForm.getAttribute('data-edit-index');
        if (index !== null) {
            projects[index] = { title, description, image, link };
            projectForm.removeAttribute('data-edit-index');
        } else {
            projects.push({ title, description, image, link });
        }

        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
        projectForm.reset();
        imagePreview.style.display = 'none';
        linkInput.value = '';
        updateHomePage();
    });

    document.getElementById('logout-btn').addEventListener('click', function() {
        window.location.href = 'index.html'; // Giriş sayfasına yönlendirme
    });

    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });

    function updateHomePage() {
       // Burada ana sayfada projeleri güncellemek için gereken işlemleri yapacağız.
        // Basit bir örnek:
        fetch('index.html')
            .then(response => response.text())
            .then(text => {
                const updatedContent = text.replace(/<!-- PROJECTS_PLACEHOLDER -->/, renderProjectsHtml());
                const blob = new Blob([updatedContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                window.location.href = url;
            });
    }

    function renderProjectsHtml() {
        return projects.map(project => `
            <div class="project">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <img src="${project.image}" alt="${project.title}" style="max-width: 200px;">
                <p><a href="${project.link}" target="_blank">${project.link}</a></p>
            </div>
        `).join('');
    }
    renderProjects();
});
