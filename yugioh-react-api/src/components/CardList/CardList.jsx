import "./CardList.css";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { CardData } from "../CardData/CardData";
import { api } from "../../helpers/Api";
import { CgCloseO } from "react-icons/cg";

let customStyle = {
  overlay: {
    background: "rgba(0, 0, 0, 0.4)",
  },
};

Modal.setAppElement("#root");

function Card ({ createNewCard }) {
  const [cards, setCard] = useState([]);
  const [cardModal, setcardModal] = useState(false);
  const [cardUnique, setCardUnique] = useState({});
  const [cardEdited, setCardEdited] = useState(false);
  const [cardUpdate, setCardUpdate] = useState([]);
  const [itensPage, setItensPage] = useState(8);
  const [correntPage, setCorrentPage] = useState(0);

  const pages = Math.ceil(cards.length / itensPage);
  const startIndex = correntPage * itensPage;
  const endIndex = startIndex + itensPage;
  const cardPages = cards.slice(startIndex, endIndex);

  const newCard = (card) => {
    const result = [...cards, card];
    setCard(result);
  };

  useEffect(() => {
    if (createNewCard) newCard(createNewCard);
  }, [createNewCard]);

  const getAll = async () => {
    const response = await api.getAll();
    setCard(response);
  };

  const deleteCard = (id) => {
    api.delete(id);
    const card = cards;
    card.map((el, index) => {
      if (el.id === id) {
        card.splice(index, 1);
        setCard(card);
      }
      modalState();
    });
  };

  function cardUpdat(event) {
    event.preventDefault();

    const renameImage = (img) => img.split("\\").pop();
    const {
      name,
      typing,
      level,
      category,
      atributte,
      effect,
      image,
      atk,
      def,
    } = cardUpdate;

    const cardEdt = {
      id: cardUnique.id,
      name,
      typing,
      level,
      category,
      atributte,
      effect,
      image: `assets/images/${renameImage(image)}`,
      atk,
      def,
    };

    const card = cards;

    card.map((el, index) => {
      if (el.id === cardEdt.id) {
        card.splice(index, 1, cardEdt);
      }
      modalState();
    });

    customStyle = {
      content: {
        width: "30rem",
        height: "550px",
      },
      overlay: {
        background: "rgba(0, 0, 0, 0.4)",
      },
    };

    setCard(card);
    setCardEdited(false);
    api.update(cardEdt);
  }

  function modalState() {
    setcardModal(!cardModal);
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="div__geral">
      <div className="cardList">
        {cardPages.map((card, index) => (
          <div className="cardListData">
            <div>
              <div className="cardListData__name">{card.name}</div>

              <section className="container">
                <div class="card">
                  <div class="front">
                    <img src={card.image} alt="" />
                  </div>
                  <div class="back">
                    <img
                      src="https://i.pinimg.com/736x/90/86/29/908629db5279219c2065a9060bace2c3--card-ui-trading-cards.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </section>
              <div className="cardListaData__button">
                <button
                  className="button__ver--mais"
                  onClick={() => {
                    setCardUnique(card);
                    modalState();
                  }}
                  key={index}
                >
                  Ver Mais
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="div__modal">
        <Modal
          className="modalStyle"
          isOpen={cardModal}
          onRequestClose={modalState}
          contentLabel="card__details"
          style={customStyle}
        >
          <div className="div_geral-modal">
            {cardEdited ? (
              <>
                <div>
                  <button
                    className="close__update"
                    onClick={() => {
                      setCardEdited(false);
                      modalState();
                      customStyle = {
                        content: {
                          width: "30rem",
                          height: "600px",
                        },
                        overlay: {
                          background: "rgba(0, 0, 0, 0.4)",
                        },
                      };
                    }}
                  >
                    <CgCloseO size={15} color="black" />
                  </button>
                  <form
                    autoComplete="off"
                    onSubmit={cardUpdat}
                    className="forms__Update"
                  >
                    <section>
                      <span>Name: </span>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={(event) => {
                          setCardUpdate({
                            ...cardUpdate,
                            name: event.target.value,
                          });
                        }}
                      ></input>
                    </section>

                    <section>
                      <span>Image: </span>
                      <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/gig, image/png, image/webp"
                        alt="image"
                        required
                        onChange={(event) => {
                          setCardUpdate({
                            ...cardUpdate,
                            image: event.target.value,
                          });
                        }}
                      ></input>
                    </section>

                    <section>
                      <span>Typing: </span>
                      <input
                        type="text"
                        name="level"
                        required
                        onChange={(event) => {
                          setCardUpdate({
                            ...cardUpdate,
                            typing: event.target.value,
                          });
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
                          setCardUpdate({
                            ...cardUpdate,
                            category: event.target.value,
                          });
                        }}
                      ></input>
                    </section>

                    <section>
                      <span>Level: </span>
                      <input
                        type="text"
                        name="category"
                        required
                        onChange={(event) => {
                          setCardUpdate({
                            ...cardUpdate,
                            level: event.target.value,
                          });
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
                          setCardUpdate({
                            ...cardUpdate,
                            atributte: event.target.value,
                          });
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
                          setCardUpdate({
                            ...cardUpdate,
                            effect: event.target.value,
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
                          setCardUpdate({
                            ...cardUpdate,
                            atk: event.target.value,
                          });
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
                          setCardUpdate({
                            ...cardUpdate,
                            def : event.target.value,
                          });
                        }}
                      ></input>
                    </section>


                    <div className="div_submit-update">
                      <button type="submit" className="submit__update">
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <section className="section__modal">
                  <div className="div__button--modal">
                    <button className="button__modal" onClick={modalState}>
                      <CgCloseO size={15} color="red" />
                    </button>
                  </div>
                  <div className="div__itens--modal">
                    <CardData />
                    <h2 className="modal-info">Typing: {cardUnique.typing}</h2>
                    <h2 className="modal-info">Level: {cardUnique.level}</h2>
                    <h2 className="modal-info">
                      Category: {cardUnique.category}
                    </h2>
                    <h2 className="modal-info">
                      Atributte: {cardUnique.atributte}
                    </h2>
                    <h2 className="modal-info">Effect: {cardUnique.effect}</h2>
                    <div className="img-flex">
                      <img className="imageModal" src={cardUnique.image} />
                    </div>
                    <div className="div-atk-def">
                      <h2 className="modal-info">ATK: {cardUnique.atk}</h2>
                      <h2 className="modal-info">DEF: {cardUnique.def}</h2>
                    </div>
                  </div>
                </section>
                <div className="div_update-delete">
                  <button
                    className="button_update"
                    onClick={() => {
                      setCardEdited(true);
                      customStyle = {
                        content: {
                          top: "12rem",
                          width: "15rem",
                          height: "15rem",
                        },
                        overlay: {
                          background: "rgba(0, 0, 0, 0.4)",
                        },
                      };
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="button_delete"
                    onClick={() => {
                      deleteCard(cardUnique.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>

      <div className="button__next">
        {Array.from(Array(pages), (itens, index) => {
          return (
            <button
              value={index}
              onClick={(event) => setCorrentPage(Number(event.target.value))}
              className="button__next--button"
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { Card };
