import { bgBlock, block, themeIcon, input, wrapper, todoFooter, todoList, toggleBtn } from "./html-selection.js";

let darkMode = true;

export function initThemeToggle() {
  toggleBtn.addEventListener("click", () => {
    if (darkMode) {
      bgBlock.style.backgroundImage = "url('./images/light/image.png')";
      themeIcon.src = "./images/icons/dark/Combined Shape (1).svg";
      block.classList.replace("bg-black", "bg-white");
      input.classList.replace("text-white", "text-black");
      input.classList.remove("bg-[#0d1a41]");
      input.classList.add("bg-white");

      wrapper.classList.remove("bg-[#0d1a41]");
      wrapper.classList.add("bg-white");
      wrapper.classList.replace("text-white", "text-black");

      todoFooter.classList.replace("border-gray-700", "border-gray-300");

      document.querySelectorAll("#todoList li").forEach(li => {
        li.classList.replace("border-gray-700", "border-gray-300");
      });
    } else {
      bgBlock.style.backgroundImage = "url('./images/dark/image.png')";
      themeIcon.src = "./images/icons/light/Combined Shape.svg";
      block.classList.replace("bg-white", "bg-black");
      input.classList.replace("text-black", "text-white");
      input.classList.remove("bg-white");
      input.classList.add("bg-[#0d1a41]");

      wrapper.classList.remove("bg-white");
      wrapper.classList.add("bg-[#0d1a41]");
      wrapper.classList.replace("text-black", "text-white");

      todoFooter.classList.replace("border-gray-300", "border-gray-700");

      document.querySelectorAll("#todoList li").forEach(li => {
        li.classList.replace("border-gray-300", "border-gray-700");
      });
    }
    darkMode = !darkMode;
  });
}

export function isDarkMode() {
  return darkMode;
}
