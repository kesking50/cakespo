document.addEventListener("DOMContentLoaded", function() {
    
    const projectList = document.getElementById('project-list');
    const addProjectBtn = document.getElementById('add-project-btn');
    const contactForm = document.getElementById('contact-form');

   

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            alert('Mesajınız başarıyla gönderildi!');
            contactForm.reset();
        } else {
            alert('Lütfen tüm alanları doldurun.');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.getElementById('projects');
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    function renderProjects() {
        projectsSection.innerHTML = projects.map(project => `
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

