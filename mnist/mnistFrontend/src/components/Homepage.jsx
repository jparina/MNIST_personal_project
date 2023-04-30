import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage">
        <h1 className="homepage-title">Welcome to My Machine Learning Site</h1>
        <p className="homepage-text">
          Welcome to my machine learning journey. Here you'll the projects I've been working on to study machine learning.
          I've been exploring various aspects of machine learning starting with image recognition using the mnist dataset. I'll continue to game development with an AI tic-tac-toe game using GANs.
          Use the menu to navigate through the projects. 
        </p>
      </div>
    </div>
  );
}

export default HomePage;
