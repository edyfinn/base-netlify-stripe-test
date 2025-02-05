import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Dashboard</p>

        <Link to="/">go back</Link>
      </header>
    </div>
  );
}

export default Dashboard;