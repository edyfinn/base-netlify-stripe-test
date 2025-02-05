import React from 'react';
import { Link } from 'react-router-dom';

function Logeo() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Login components</p>

        <Link to="/">go back</Link>
      </header>
    </div>
  );
}

export default Logeo;