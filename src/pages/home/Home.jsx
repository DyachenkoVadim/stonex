import React, { useState, useEffect } from "react";
import "./home.css";
import Header from "../../components/header/Header";

function Home({ onNavigate }) {
  const [currentText, setCurrentText] = useState(""); // Текст, що відображається
  const [textIndex, setTextIndex] = useState(0); // Індекс поточного слогана
  const [isDeleting, setIsDeleting] = useState(false); // Режим стирання тексту
  const [typingSpeed, setTypingSpeed] = useState(100); // Швидкість друку/стирання

  const slogans = [
    "Доторкнись до зірок.",
    "Твій шматочок космосу.",
    "Магія Всесвіту у твоїх руках.",
    "Принеси частинку космосу додому.",
    "Космос ближче, ніж здається.",
  ];

  // Анімація друку та стирання тексту
  useEffect(() => {
    const handleTyping = () => {
      const currentSlogan = slogans[textIndex];
      const isComplete = currentText === currentSlogan; // Перевірка завершення друку

      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1)); // Видаляємо останній символ
        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % slogans.length); // Переходимо до наступного слогана
        }
      } else {
        setCurrentText((prev) => currentSlogan.slice(0, prev.length + 1)); // Додаємо символ
        if (isComplete) {
          setTimeout(() => setIsDeleting(true), 1500); // Пауза перед стиранням
        }
      }
    };

    const interval = setTimeout(handleTyping, isDeleting ? 50 : typingSpeed);
    return () => clearTimeout(interval); // Очищення інтервалу
  }, [currentText, isDeleting, textIndex, typingSpeed, slogans]);

  return (
    <div className="page">
      <div className="home-body">
        <div className="description-container">
          <p className="description">{currentText}</p>
        </div>
        <div className="button-container">
          <button
            className="glow-on-hover"
            onClick={(e) => {
              onNavigate("map", e);
            }}
          >
            Зробити замовлення
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
