import React, { useEffect, useRef, useState } from "react";
import createRandomStar from "./background/stars/stars";
import createRandomComet from "./background/comets/comets";
import Home from "./pages/home/Home";
import Map from "./pages/map/Map";
import "./index.css";
import "./App.css";
import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";
import About from "./pages/about/About";
import Contacts from "./pages/contacts/Contacts";

function App() {
  const [wheelActive, setWheelActive] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = ["home", "map", "about", "contacts"];
  // const [starCount, setStarCount] = useState(0);
  // const [cometCount, setCometCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // if (starCount < 2 || cometCount < 2) {
      //   const createStarOrComet = Math.random();
      //   if (createStarOrComet > 0.7 && cometCount < 2) {
      //     createRandomComet();
      //     setCometCount((prevCount) => prevCount + 1);
      //   } else if (createStarOrComet > 0.3 && starCount < 2) {
      //     createRandomStar();
      //     setStarCount((prevCount) => prevCount + 1);
      //   }
      // }

      const createStarOrComet = Math.random();
      if (createStarOrComet > 0.5) {
        createRandomComet();
      } else if (createStarOrComet > 0) {
        createRandomStar();
      }
    }, Math.random() * 30000 + 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current.scrollTop;
      const parallaxElement = document.querySelector(".parallax-background");

      parallaxElement.style.backgroundPosition = `center ${-scrollTop * 0.1}px`;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (!wheelActive) return;

      setWheelActive(false);

      setCurrentPageIndex((prevIndex) => {
        const newIndex =
          e.deltaY > 0
            ? (prevIndex + 1) % currentPage.length // Прокрутка вниз
            : (prevIndex - 1 + currentPage.length) % currentPage.length; // Прокрутка вгору

        // Прокрутка до відповідного розділу
        const section = document.getElementById(currentPage[newIndex]);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }

        // Оновлення активного класу кнопки
        document.querySelector(".link.active")?.classList.remove("active");
        document
          .querySelector(`.link:nth-child(${newIndex + 1})`)
          ?.classList.add("active");

        return newIndex;
      });

      setTimeout(() => setWheelActive(true), 500);
    };

    const container = scrollContainerRef.current;
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [wheelActive, currentPage]);

  const scrollContainerRef = useRef();

  const handleNavigation = (id, e) => {
    const section = document.getElementById(id);

    if (section) {
      // Прокручуємо до потрібного розділу
      section.scrollIntoView({
        behavior: "smooth",
      });

      // Знаходимо поточну активну кнопку
      const activeLink = document.querySelector(".link.active");

      // Знімаємо активний клас з попереднього посилання
      if (activeLink) {
        activeLink.classList.remove("active");
      }

      // Додаємо активний клас новому посиланню
      setCurrentPageIndex(currentPage.indexOf(id));
      document
        .querySelector(`.link[data-section=${id}]`)
        ?.classList.add("active");
    }
  };

  return (
    <div className="app">
      <div className="parallax-background"></div>
      <div className="stars"></div>
      <div className="comets"></div>

      <SideBar onNavigate={handleNavigation} />
      <div className="flex flex-col h-screen">
        <Header onNavigate={handleNavigation} />
        <div className="scroll-container h-[80%]" ref={scrollContainerRef}>
          <section id="home" className="page ">
            <Home onNavigate={handleNavigation} />
          </section>
          <section id="map" className="page">
            <Map />
          </section>
          <section id="about" className="page">
            <About />
          </section>
          <section id="contacts" className="page">
            <Contacts />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
