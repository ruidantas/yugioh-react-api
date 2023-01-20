import "./form.css";
import { useState } from "react";
import { api } from "../../helpers/Api.js";

export function FormCreate({ closeModal, createCard }) {
  const [newCard, setNewCard] = useState([]);

  async function formsSubmit(event) {
    event.preventDefault();

    const renameImage = (img) => img.split("\\").pop();
    const { name, typing, level, category, atributte, effect, image, atk, def } = newCard;

    const card = {
      name,
      typing,
      level,
      category,
      atributte,
      effect,
      image: `${renameImage(image)}`,
      atk,
      def
    };  

    const response = await api.createNewCard(card);
    createCard(response);
    closeModal();
  }

  return (
    <div className="form">
      <form autoComplete="off" onSubmit={formsSubmit} className="form__card">
        <section>
          <span>Name: </span>
          <input
            type="text"
            name="name"
            required
            onChange={(event) => {
              setNewCard({ ...newCard, name: event.target.value });
            }}
          ></input>
        </section>

        <section>
          <span>Typing: </span>
          <input
            type="text"
            name="name"
            required
            onChange={(event) => {
              setNewCard({ ...newCard, typing: event.target.value });
            }}
          ></input>
        </section>

        <section>
          <span>Level: </span>
          <input
            type="number"
            name="level"
            required
            onChange={(event) => {
              setNewCard({ ...newCard, level: event.target.value });
            }}
          ></input>
        </section>

        <section>
          <span>Category: </span>
          <input
            type="text"
            name="category"
            required
            onChange={(event) => {
              setNewCard({ ...newCard, category: event.target.value });
            }}
          ></input>
        </section>
        <section>
          <span>Atributte: </span>
          <input
            type="text"
            name="category"
            required
            onChange={(event) => {
              setNewCard({ ...newCard, atributte: event.target.value });
            }}
          ></input>
        </section>

        <section>
          <span>Effect: </span>
          <input
            type="text"
            name="category"
            required
            onChange={(event) => {
              setNewCard({ ...newCard, effect: event.target.value });
            }}
          ></input>
        </section>

        <section>
          <span>Image: </span>
          <input
            type="link"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            alt="image"
            onChange={(event) => {
              setNewCard({
                ...newCard,
                image: event.target.value,
              });
            }}
          ></input>
        </section>

        <section>
          <span>ATK: </span>
          <input
            type="text"
            name="category"
            required
            onChange={(event) => {
              setNewCard({ ...newCard, atk: event.target.value });
            }}
          ></input>
        </section>

        <section>
          <span>DEF: </span>
          <input
            type="text"
            name="category"
            required
            onChange={(event) => {
              setNewCard({ ...newCard, def: event.target.value });
            }}
          ></input>
        </section>


        <button type="submit" className="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
