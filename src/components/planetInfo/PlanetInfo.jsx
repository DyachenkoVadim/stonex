import React, { useEffect, useState } from "react";
import "./planetInfo.css";
import { data } from "../../utils/data";
import axios from "axios";

function PlanetInfo({ planetName }) {
  const PRODUCTS_API_URL = import.meta.env.VITE_PRODUCTS_API;
  const CATEGORIES_API_URL = import.meta.env.VITE_CATEGORIES_API;
  const [products, setProducts] = useState([]);
  const [categoryID, setCategoryID] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Отримуємо список категорій
        const categoriesResponse = await axios.get(CATEGORIES_API_URL);

        // Шукаємо категорію за назвою планети
        const planetCategory = categoriesResponse.data.find(
          (category) => category.name.toLowerCase() === planetName.toLowerCase()
        );

        // Якщо знайшли категорію, то зберігаємо її _id
        if (planetCategory) {
          setCategoryID(planetCategory._id);
        }

        // Отримуємо список товарів
        const productsResponse = await axios.get(PRODUCTS_API_URL);

        // Фільтруємо товари за категорією
        const filteredProducts = productsResponse.data.filter(
          (product) => product.category === planetCategory._id
        );

        setProducts(filteredProducts);
        console.log(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Викликаємо функцію для отримання даних
    fetchData();
  }, [planetName]);

  return (
    <div className="planet-info">
      <div className="planet-header">
        {data[planetName?.toLowerCase()]?.planetNameUkr}
      </div>
      <h1>Опис</h1>
      <div className="planet-description">
        <div>{data[planetName?.toLowerCase()]?.description}</div>
        <div className="planet-stats">
          <div>Відстань: </div>
          <div>Приблизний час доставки:</div>
          <div>Можливість попереднього замовлення:</div>
        </div>
      </div>
      <h1>Передогляд</h1>
      <div className="planet-items-container">
        {products.length > 0 ? (
          products.map((item) => (
            <div className="planet-item" key={item._id}>
              {item.title}
            </div>
          ))
        ) : (
          <div>Завантаження товарів...</div>
        )}
      </div>
    </div>
  );
}

export default PlanetInfo;
