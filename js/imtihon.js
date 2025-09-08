const body = document.body;
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoSection = document.getElementById('todoSection');
const itemsCount = document.getElementById('itemsCount');
const clearCompleted = document.getElementById('clearCompleted');
const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');
const tpl = document.getElementById('todoItemTpl');
const themeToggle = document.getElementById('themeToggle');
const taskModal = document.getElementById('taskModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let darkMode = localStorage.getItem('darkMode') === 'true';
let currentFilter = 'all';

    function renderThemeIcon() {
      if (darkMode) {
        themeToggle.innerHTML = '<svg class="w-[30px] h-[30px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      } else {
        themeToggle.innerHTML = '<svg class="w-[35px] h-[35px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l1.414 1.414M6.05 6.05 4.636 4.636"/></svg>';
      }
    }
    function applyTheme() {
      body.classList.remove('light', 'dark');
      body.classList.add(darkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', darkMode);
      renderThemeIcon();
      localStorage.setItem('darkMode', darkMode);
    }
    themeToggle.addEventListener('click', () => {
      darkMode = !darkMode;
      applyTheme();
    });
    filterAll.addEventListener('click', () => {
      currentFilter = 'all';
      updateFilterButtons();
      renderTodos();
    });
    filterActive.addEventListener('click', () => {
      currentFilter = 'active';
      updateFilterButtons();
      renderTodos();
    });
    filterCompleted.addEventListener('click', () => {
      currentFilter = 'completed';
      updateFilterButtons();
      renderTodos();
    });

    function updateFilterButtons() {
      [filterAll, filterActive, filterCompleted].forEach(btn => btn.classList.remove('underline', 'text-blue-500'));
      const activeBtn = {all: filterAll, active: filterActive, completed: filterCompleted}[currentFilter];
      if (activeBtn) {
        activeBtn.classList.add('underline', 'text-blue-500');
      }
    }

    // add todo
    todoForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = todoInput.value.trim();
      if (!text) {
        alert("Iltimos, todo yozing!");
        return;
      }
      const now = new Date();
      const taskId = Math.floor(Math.random() * 9000000000000) + 1000000000000; 
      todos.push({id: Date.now(), text, done: false, taskId: taskId.toString(), createdDate: now.toISOString()});
      todoInput.value = '';
      saveTodos();
      renderTodos();
    });

    function getFilteredTodos() {
      switch (currentFilter) {
        case 'active': return todos.filter(t => !t.done);
        case 'completed': return todos.filter(t => t.done);
        default: return todos;
      }
    }

    function renderTodos() {
      todoList.innerHTML = '';
      const filteredTodos = getFilteredTodos();
      if (todos.length === 0) {
        todoSection.classList.add('hidden');
        return;
      }
      todoSection.classList.remove('hidden');
      for (const t of filteredTodos) {
        const node = tpl.content.cloneNode(true);
        const toggleBtn = node.querySelector('.toggleBtn');
        const textSpan = node.querySelector('.todoText');
        const delBtn = node.querySelector('.deleteBtn');

if (t.done) {
  toggleBtn.classList.add('bg-gradient-to-r','from-indigo-500','to-purple-500');
  if (darkMode) {
    toggleBtn.classList.add('text-white');
    toggleBtn.classList.remove('text-black');
  } else {
    toggleBtn.classList.add('text-black');
    toggleBtn.classList.remove('text-white');
  }
  textSpan.classList.add('line-through','opacity-60');
  toggleBtn.innerHTML = '✓';
} else {
  toggleBtn.classList.remove('bg-gradient-to-r','from-indigo-500','to-purple-500','text-white','text-black');
  textSpan.classList.remove('line-through','opacity-60');
  toggleBtn.innerHTML = '';
}

        textSpan.textContent = t.text;
        textSpan.dataset.id = t.taskId; 
        if (t.done) {
          toggleBtn.classList.add('bg-gradient-to-r','from-indigo-500','to-purple-500','text-white');
          textSpan.classList.add('line-through','opacity-60');
          toggleBtn.innerHTML = '✓';
        }
        toggleBtn.addEventListener('click', () => {
          t.done = !t.done;
          saveTodos();
          renderTodos();
        });
        delBtn.addEventListener('click', () => {
          todos = todos.filter(x => x.id !== t.id);
          saveTodos();
          renderTodos();
        });
        textSpan.addEventListener('click', (e) => {
          e.stopPropagation();
          showTaskDetails(t);
        });
        todoList.appendChild(node);
      }
      const left = todos.filter(t => !t.done).length;
      itemsCount.textContent = `${left} item${left !== 1 ? 's' : ''} left`;
    }
    function showTaskDetails(task) {
      const now = new Date(task.createdDate);
      const formattedDate = now.toLocaleDateString('uz-Uz', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
      });
      const formattedTime = now.toLocaleTimeString('uz-Uz', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });

      modalContent.innerHTML = `
        <p><strong>Title:</strong> ${task.text}</p>
        <p><strong>Description:</strong> This task created at ${formattedDate}.</p>
        <p><strong>Created date:</strong> ${formattedDate}, ${formattedTime} ...</p>
        <p><strong>Status:</strong> ${task.done ? 'completed' : 'active'}</p>
        <p><strong>Task ID:</strong> ${task.taskId}</p>
      `;
      taskModal.classList.remove('hidden');
    }
    closeModal.addEventListener('click', () => {
      taskModal.classList.add('hidden');
    });

    taskModal.addEventListener('click', (e) => {
      if (e.target === taskModal) {
        taskModal.classList.add('hidden');
      }
    });
    clearCompleted.addEventListener('click', () => {
      todos = todos.filter(t => !t.done);
      saveTodos();
      renderTodos();
    });
    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    applyTheme();
    updateFilterButtons();
    renderTodos();