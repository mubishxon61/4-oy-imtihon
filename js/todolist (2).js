const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Vazifa qo‘shish
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Iltimos, vazifa kiriting!');
    return;
  }

  const li = document.createElement('li');
  li.textContent = text;

  // O‘chirish tugmasi
  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.classList.add('delete-btn');
  li.appendChild(delBtn);

  // Ro‘yxatga qo‘shish
  taskList.appendChild(li);
  taskInput.value = '';

  // Bosilganda chizib qo‘yish
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // O‘chirish tugmasi bosilganda
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    li.remove();
  });
});