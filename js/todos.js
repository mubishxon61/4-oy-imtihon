import { form, input, todoList, wrapper, itemsLeft, clearCompleted, filterBtns,
         clickSound, click1Sound, successSound, deleteSound,
         modal, modalTitle, modalDesc, modalDate, modalStatus, modalId, closeModal } from "./html-selection.js";
import { isDarkMode } from "./theme.js";

let filter = "all";

function updateCounter() {
  const remaining = [...todoList.querySelectorAll("li input")].filter(ch => !ch.checked).length;
  itemsLeft.textContent = `${remaining} items left`;
}

function buildTask(text) {
  const taskId = Date.now();

  const li = document.createElement("li");
  li.className = `
    flex justify-between items-center px-4 py-5 border-b last:border-b-0
    ${isDarkMode() ? "border-gray-700" : "border-gray-300"}
  `;

  li.innerHTML = `
    <label class="flex items-center space-x-4 cursor-pointer w-full relative">
      <input type="checkbox" class="hidden peer">
      <span class="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center
        peer-checked:bg-blue-500 peer-checked:border-blue-500 relative">
        <svg class="hidden w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
      </span>
      <span class="peer-checked:line-through peer-checked:text-gray-500">${text}</span>
    </label>
    <button class="text-gray-400 delete-btn">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  `;

  // delete
  li.querySelector(".delete-btn").addEventListener("click", () => {
    deleteSound.play();
    li.remove();
    updateCounter();
    if (!todoList.children.length) wrapper.classList.add("hidden");
  });

  // checkbox
  const checkbox = li.querySelector("input");
  const svgIcon = li.querySelector("span svg");
  checkbox.addEventListener("change", e => {
    clickSound.play();
    updateCounter();
    e.target.checked ? svgIcon.classList.remove("hidden") : svgIcon.classList.add("hidden");
  });

  // modal
  const labelText = li.querySelector("label span:last-child");
  labelText.addEventListener("click", e => {
    e.stopPropagation(); 
    modalTitle.textContent = text;
    modalDesc.textContent = `This task created at ${new Date(taskId).toLocaleString()}`;
    modalDate.textContent = new Date(taskId).toLocaleString();
    modalStatus.textContent = checkbox.checked ? "completed" : "active";
    modalId.textContent = taskId;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  return li;
}

function handleFilters() {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      [...todoList.children].forEach(li => {
        const checked = li.querySelector("input").checked;
        li.style.display =
          filter === "active" && checked ? "none" :
          filter === "completed" && !checked ? "none" : "flex";
      });

      filterBtns.forEach(b => b.classList.remove("text-blue-500", "font-bold"));
      btn.classList.add("text-blue-500", "font-bold");
      click1Sound.play();
    });
  });
}

export function startTodos() {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;

    const li = buildTask(val);
    todoList.appendChild(li);
    wrapper.classList.remove("hidden");
    input.value = "";
    updateCounter();
    successSound.play();
  });

  clearCompleted.addEventListener("click", () => {
    todoList.querySelectorAll("input:checked").forEach(ch => ch.closest("li").remove());
    updateCounter();
    if (!todoList.children.length) wrapper.classList.add("hidden");
  });

  handleFilters();

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

