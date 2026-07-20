import React from 'react';
import '../styles/gradientMesh.css';

const GradientMesh = ({ scene }) => {
  // If scene is provided, fade in when scene becomes 'dashboard'
  // If no scene is provided (making it highly reusable), default to opacity 1
  const opacity = scene ? (scene === 'dashboard' ? 1 : 0) : 1;

  return (
    <div
      className="gradient-mesh-container"
      style={{
        opacity,
        transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="gradient-mesh-wrapper">
        <div className="mesh-blob blob-1" />
        <div className="mesh-blob blob-2" />
        <div className="mesh-blob blob-3" />
        <div className="mesh-blob blob-4" />
        <div className="mesh-blob blob-5" />
        <div className="mesh-blob blob-6" />
        <div className="mesh-blob blob-7" />
        <div className="mesh-blob blob-8" />
      </div>
      <div className="gradient-mesh-overlay" />
    </div>
  );
};

export default GradientMesh;
