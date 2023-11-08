import React from "react";
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";

function CreateFlashCards({username}) {
  return (
    <div className="createFlashCards">
      <HeaderMenu username={username} />
      <section className="createFlashCardsPage">
        <h1>Feature Coming Soon!</h1>
      </section>
      <FooterMenu />
    </div>
  )
}

export default CreateFlashCards;