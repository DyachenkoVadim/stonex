import { getCometDirection } from "../../utils/utils";

const createRandomComet = () => {
  const comet = document.createElement("div");
  comet.classList.add("comet");

  const edges = ["left", "right", "top"];
  const side = edges[Math.floor(Math.random() * edges.length)];

  let startTop, startLeft;
  if (side === "left") {
    startTop = Math.random() * 100;
    startLeft = -10;
  } else if (side === "right") {
    startTop = Math.random() * 100;
    startLeft = 110;
  } else if (side === "top") {
    startLeft = Math.random() * 100;
    startTop = -10;
  }

  const { x, y } = getCometDirection(side);

  const endTop = y * 100;
  const endLeft = x * 100;

  // Розрахунок кута для хвоста комети
  const dx = endLeft - startLeft;
  const dy = endTop - startTop;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const speed = Math.random() + 1; // Швидкість комети

  comet.style.top = `${startTop}vh`;
  comet.style.left = `${startLeft}vw`;
  comet.style.setProperty("--move-x", `${endLeft}vw`);
  comet.style.setProperty("--move-y", `${endTop}vh`);
  comet.style.setProperty("--comet-tail-rotation", `${angle}deg`);
  comet.style.animation = `randomMove ${speed}s linear forwards`;

  document.querySelector(".comets").appendChild(comet);

  // Видалення комети після завершення анімації
  comet.addEventListener("animationend", () => {
    comet.remove();
  });
};

export default createRandomComet;
