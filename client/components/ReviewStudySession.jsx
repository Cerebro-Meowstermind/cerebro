import React from 'react';
import HeaderMenu from './HeaderMenu.jsx';
import FooterMenu from './FooterMenu.jsx';

function ReviewStudySession({ username }) {
  return (
    <div className="reviewStudySession">
      <HeaderMenu username={username} />
      <section className="reviewPage">
        <h1>Feature Coming Soon!</h1>
      </section>
      <FooterMenu />
    </div>
  );
}

export default ReviewStudySession;
