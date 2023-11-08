import React from "react";
import HeaderMenu from "./HeaderMenu.jsx";
import FooterMenu from "./FooterMenu.jsx";

function ReviewFlashCards({username}) {
  return (
    <div className="reviewFlashCards">
      <HeaderMenu username={username} />
      <section className="reviewFlashCardsPage">
        <h1>Feature Coming Soon!</h1>
      </section>
      <FooterMenu />
    </div>
  )
}

export default ReviewFlashCards;