function convertToBinary() {
    const textView = document.getElementById('textView');
    const binaryView = document.getElementById('binaryView');

    // Рекурсивная функция для обработки всех узлов
    function processNode(node) {
        let newNode;

        if (node.nodeType === Node.TEXT_NODE) {
            // Преобразуем текстовый узел в бинарный код
            const textContent = node.textContent.trim();
            if (textContent) {
                const binaryText = Array.from(textContent).map(char => 
                    char.charCodeAt(0).toString(2).padStart(8, '0')
                ).join(' ');

                // Создаем новый текстовый узел для бинарного кода
                newNode = document.createElement('span');
                newNode.className = 'fade-in'; // Класс для анимации
                newNode.textContent = binaryText;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Копируем элемент (например, <p>, <h1>, и т.д.)
            newNode = document.createElement(node.tagName);
            newNode.className = node.className; // Сохраняем классы
            newNode.style.cssText = node.style.cssText; // Сохраняем стили

            // Если это изображение, просто копируем его без изменений
            if (node.tagName.toLowerCase() === 'img') {
                newNode.src = node.src;
                newNode.alt = node.alt;
            }

            // Рекурсивно обрабатываем дочерние узлы
            for (const child of node.childNodes) {
                const processedChild = processNode(child);
                if (processedChild) {
                    newNode.appendChild(processedChild);
                }
            }
        }

        return newNode;
    }

    // Очищаем бинарный вид и строим его структуру
    binaryView.innerHTML = ''; 
    for (const child of textView.childNodes) {
        const processedChild = processNode(child);
        if (processedChild) {
            binaryView.appendChild(processedChild);
        }
    }

    // Скрываем текстовый вид и отображаем бинарный
    textView.style.display = 'none'; 
    binaryView.style.display = 'block'; 
}

// Автоматическое выполнение функции при загрузке страницы
window.onload = convertToBinary;
