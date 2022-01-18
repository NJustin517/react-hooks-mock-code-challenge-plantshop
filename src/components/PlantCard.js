import React, { useState } from "react";

function PlantCard({ id, name, image, price, onPriceChange, onPlantDelete }) {
  const [inStock, setInStock] = useState(true);
  const [newPrice, setNewPrice] = useState("");

  function handlePriceChange(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice).toFixed(2) }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onPriceChange(updatedPlant);
        setNewPrice("");
      });
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((data) => onPlantDelete(id));
  }

  return (
    <li className="card">
      <img src={image} alt={{ name }} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      <div>
        <form onSubmit={handlePriceChange}>
          <input
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            type="number"
            name="price"
            step="0.01"
            placeholder="Edit Price"
          />
          <button type="submit">Submit Price</button>
        </form>
      </div>
      {inStock ? (
        <button onClick={() => setInStock(!inStock)} className="primary">
          In Stock
        </button>
      ) : (
        <button onClick={() => setInStock(!inStock)}>Out of Stock</button>
      )}
      <button onClick={handleDelete} style={{ background: "red" }}>
        DELETE PLANT
      </button>
    </li>
  );
}

export default PlantCard;
