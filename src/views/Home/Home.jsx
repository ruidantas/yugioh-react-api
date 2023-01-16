import "./Home.css";
import { Header } from "../../components/Header/Header";
import { Card } from "../../components/CardList/CardList";
import { Navbar } from "../../components/Navbar/Navbar";
import { useState } from "react";

function Home() {
  const [create, setCreate] = useState();

  return (
    <div className="Home">
      <header className="Header">
        <Header />
      </header>
      <nav>
        <Navbar createCard={(card) => setCreate(card)} />
      </nav>
      <div className="Home__container">
        <Card createNewCard={create} />
      </div>
    </div>
  );
}

export { Home };
