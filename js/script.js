// Мобильное меню
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрыть мобильное меню
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Анимация появления элементов
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Проверка при загрузке и прокрутке
window.addEventListener('load', checkFade);
window.addEventListener('scroll', checkFade);

// Обработка формы
const form = document.getElementById('inquiry-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получение данных из формы
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Здесь будет код для отправки формы на сервер
    // Например, с использованием fetch API
    
    // Пример: 
    /*
    fetch('https://your-server.com/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name, 
            company,
            email,
            phone,
            service,
            message
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Показать уведомление об успешной отправке
    })
    .catch((error) => {
        console.error('Error:', error);
        // Показать уведомление об ошибке
    });
    */
    
    // Временное решение: просто показать уведомление
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    form.reset();
});

// Неоновые эффекты при наведении
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('neon-border');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('neon-border');
    });
});

// Обработка загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    console.log('Страница полностью загружена');
    
    // Проверяем, есть ли якорь в URL
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            setTimeout(() => {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});

// Дополнительная функция для обработки прокрутки страницы
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Изменение навигационной панели при прокрутке
    if (scrollPosition > 100) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Функция для определения видимости элемента в области просмотра
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}