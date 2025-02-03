import { getStarDirection } from "../../utils/utils";

const createRandomStar = () => {
  const star = document.createElement("div");
  star.classList.add("star");

  // Випадковий край для старту
  const edges = ["left", "right", "top"];
  const side = edges[Math.floor(Math.random() * edges.length)];

  let startTop, startLeft;
  if (side === "left") {
    startTop = Math.random() * 100;
    startLeft = -5; // Початок зліва
  } else if (side === "right") {
    startTop = Math.random() * 100;
    startLeft = 105; // Початок справа
  } else if (side === "top") {
    startTop = -5;
    startLeft = Math.random() * 100; // Початок зверху
  }

  const { x, y } = getStarDirection(side); // Отримуємо напрямок

  // Випадкова швидкість
  const speed = Math.random() * 3 + 1;

  star.style.top = `${startTop}vh`;
  star.style.left = `${startLeft}vw`;

  // Встановлюємо CSS змінні для руху
  star.style.setProperty("--move-x", `${x * 100}vw`);
  star.style.setProperty("--move-y", `${y * 100}vh`);
  star.style.animation = `randomMove ${speed}s linear forwards`;

  document.querySelector(".stars").appendChild(star);

  // Видаляємо зірку після завершення анімації
  star.addEventListener("animationend", () => {
    star.remove();
  });
};

export default createRandomStar;
