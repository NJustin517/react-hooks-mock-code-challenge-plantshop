import React from "react";

function NewPlantForm({ name, image, price, onFormUpdate, onFormSubmit }) {
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={onFormSubmit}>
        <input
          onChange={onFormUpdate}
          value={name}
          type="text"
          name="name"
          placeholder="Plant name"
        />
        <input
          onChange={onFormUpdate}
          value={image}
          type="text"
          name="image"
          placeholder="Image URL"
        />
        <input
          onChange={onFormUpdate}
          value={price}
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
