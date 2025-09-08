    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      html.classList.toggle('dark', savedTheme === 'dark');
      sunIcon.classList.toggle('hidden', savedTheme !== 'dark');
      moonIcon.classList.toggle('hidden', savedTheme === 'dark');
    }

    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      html.classList.toggle('dark');
      sunIcon.classList.toggle('hidden', !html.classList.contains('dark'));
      moonIcon.classList.toggle('hidden', html.classList.contains('dark'));
      localStorage.setItem('theme', newTheme);
    });

    initTheme();


    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const input = document.getElementById('new-todo-input');
    const errorMsg = document.getElementById('error-message');
    const listContainer = document.getElementById('todo-list-container');

    function renderTodos() {
      listContainer.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-purple-300 transition-all duration-200';
        li.innerHTML = `
          <div class="flex items-center flex-1">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 mr-3" onchange="toggleTodo(${index})">
            <span class="text-lg ${todo.completed ? 'line-through text-gray-500' : ''}" ondblclick="editTodo(${index})">${todo.text}</span>
          </div>
          <button onclick="deleteTodo(${index})" class="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        `;
        listContainer.appendChild(li);
      });
    }

    function addTodo() {
      const text = input.value.trim();
      if (!text) {
        errorMsg.classList.remove('hidden');
        setTimeout(() => errorMsg.classList.add('hidden'), 3000);
        return;
      }
      todos.push({ text, completed: false });
      input.value = '';
      saveAndRender();
    }

    function toggleTodo(index) {
      todos[index].completed = !todos[index].completed;
      saveAndRender();
    }

    function deleteTodo(index) {
      todos.splice(index, 1);
      saveAndRender();
    }

    function editTodo(index) {
      const newText = prompt('Todo ni tahrirlang:', todos[index].text);
      if (newText !== null && newText.trim()) {
        todos[index].text = newText.trim();
        saveAndRender();
      }
    }

    function saveAndRender() {
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    }

  
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });

    renderTodos();
