import "./CardData.css";

function CardData({ typing, level, category, atributte, effect, image, atk, def }) {
  return (
    <div className="modal-info">
      <div className="modal-info">{typing}</div>
      <div className="modal-info">{level}</div>
      <div className="modal-info">{category}</div>
      <div className="modal-info">{atributte}</div>
      <div className="modal-info">{effect}</div>
      <img className="modal-info" src={image}/>
      <div className="modal-info">{atk}</div>
      <div className="modal-info">{def}</div>

    </div>
  );
}

export { CardData };
