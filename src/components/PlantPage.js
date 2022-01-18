import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // States
  const [plantsArray, setPlantsArray] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // Initital GET
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((plants) => setPlantsArray(plants));
  }, []);

  // Functions
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleFormData(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(parseFloat(formData.price).toFixed(2));
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        price: parseFloat(formData.price).toFixed(2),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setPlantsArray([...plantsArray, data]);
        setFormData({
          name: "",
          image: "",
          price: "",
        });
      });
  }

  function handlePriceChange(updatedPlant) {
    const updatedArray = plantsArray.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      }
      return plant;
    });
    setPlantsArray(updatedArray);
  }

  function handleDeletePlant(id) {
    const updatedArray = plantsArray.filter((plant) => plant.id !== id);
    setPlantsArray(updatedArray);
  }

  return (
    <main>
      <NewPlantForm
        name={formData.name}
        image={formData.image}
        price={formData.price}
        onFormUpdate={handleFormData}
        onFormSubmit={handleFormSubmit}
      />
      <Search search={search} onSearch={handleSearch} />
      <PlantList
        plantsArray={plantsArray}
        search={search}
        onPriceChange={handlePriceChange}
        onPlantDelete={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
