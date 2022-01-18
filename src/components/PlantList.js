import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plantsArray, search, onPriceChange, onPlantDelete }) {
  const plantsList = plantsArray
    .filter((plant) => plant.name.toLowerCase().includes(search))
    .map((plant) => {
      return (
        <PlantCard
          key={plant.id}
          id={plant.id}
          name={plant.name}
          image={plant.image}
          price={plant.price}
          onPriceChange={onPriceChange}
          onPlantDelete={onPlantDelete}
        />
      );
    });

  return <ul className="cards">{plantsList}</ul>;
}

export default PlantList;
