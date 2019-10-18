import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth"
import AddColorForm from "./AddColorForm"

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // Step 2B: 
  // Complete saveEdit && deleteColor functions
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(colors.map(color => 
          color.id === colorToEdit.id ? res.data : color))
          setEditing(false)
        })
      .catch(err => console.log("Your .PUT request failed dude!", err))
      
    setColorToEdit({
      color: "",
      code: { hex: "" }
    })
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`colors/${color.id}`)
      .then(res => updateColors(res.data))
      .catch(err => console.log('Your .DELETE request failed!', err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      // STRETCH
      // Implement form to add a new color
      <AddColorForm updateColors={updateColors} />
    </div>
  );
};

export default ColorList;
