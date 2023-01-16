const baseUrl = "https://new-api-cards-yugioh-20-production-ea40.up.railway.app/cards/";

export const api = {
  createNewCard: async (card) => {
    const response = await fetch(baseUrl + "/create-card", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(card),
    });
    const newXmen = await response.json();
    return newXmen;
  },

  getAll: async () => {
    const response = await fetch(baseUrl + "/all-cards");
    const cards = await response.json();
    return cards;
  },

  delete: async (id) => {
    const response = await fetch(baseUrl + "/delete-card/" + id, {
      method: "DELETE",
      headers: new Headers({ "content-type": "application/json" }),
    });
    const cardDeleted = response.json();
    return cardDeleted;
  },

  update: async (card) => {
    const response = await fetch(baseUrl + "/update-card/" + card.id, {
      method: "PATCH",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(card),
    });
    const xmenEdt = await response.json();
    return xmenEdt;
  },
};
