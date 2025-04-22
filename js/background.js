// Анимированный фон с движущимися точками и линиями
function initBackgroundAnimation() {
    // Создаем canvas элемент
    const canvas = document.createElement('canvas');
    canvas.id = 'background-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    
    // Массивы для хранения точек и линий
    let points = [];
    let connectionsCount = 0;
    
    // Настройки анимации
    const pointsCount = 80; // Количество точек
    const pointSize = 1.5; // Размер точек
    const connectionDistance = 150; // Максимальное расстояние для соединения точек
    const movementSpeed = 0.3; // Скорость движения точек
    const primaryColor = [0, 102, 255]; // Синий цвет (#0066ff)
    const secondaryColor = [0, 238, 255]; // Голубой цвет (#00eeff)
    
    // Инициализация canvas
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Создаем точки
        points = [];
        for(let i = 0; i < pointsCount; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * movementSpeed,
                vy: (Math.random() - 0.5) * movementSpeed,
                size: Math.random() * pointSize + 0.5,
                color: Math.random() > 0.5 ? primaryColor : secondaryColor
            });
        }
    }
    
    // Отрисовка анимации
    function drawBackground() {
        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Полупрозрачный фон
        ctx.fillStyle = 'rgba(5, 13, 26, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем соединения между точками
        connectionsCount = 0;
        ctx.lineWidth = 0.3;
        
        for(let i = 0; i < points.length; i++) {
            for(let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if(distance < connectionDistance) {
                    connectionsCount++;
                    const opacity = 1 - (distance / connectionDistance);
                    
                    // Градиент между двумя точками
                    const gradient = ctx.createLinearGradient(
                        points[i].x, points[i].y, 
                        points[j].x, points[j].y
                    );
                    gradient.addColorStop(0, `rgba(${points[i].color[0]}, ${points[i].color[1]}, ${points[i].color[2]}, ${opacity * 0.15})`);
                    gradient.addColorStop(1, `rgba(${points[j].color[0]}, ${points[j].color[1]}, ${points[j].color[2]}, ${opacity * 0.15})`);
                    
                    ctx.strokeStyle = gradient;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Рисуем точки
        for(let i = 0; i < points.length; i++) {
            const point = points[i];
            
            // Перемещаем точки
            point.x += point.vx;
            point.y += point.vy;
            
            // Отражаем от краев
            if(point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if(point.y < 0 || point.y > canvas.height) point.vy *= -1;
            
            // Рисуем точку
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0.6)`;
            ctx.fill();
            
            // Добавляем свечение
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0.1)`;
            ctx.fill();
        }
        
        // Запрашиваем следующий кадр
        requestAnimationFrame(drawBackground);
    }
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        initCanvas();
    });
    
    // Запуск анимации
    initCanvas();
    drawBackground();
}

// Запускаем анимацию фона при загрузке страницы
document.addEventListener('DOMContentLoaded', initBackgroundAnimation);