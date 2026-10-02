"use client";


export default function Header() {
  return (
    <header className="header">
      <a href="/" className="brand">
        Utility
      </a>

      <nav className="nav">
        <a href="#tools">Tools</a>
        <a href="#popular">Popular</a>
        <a href="#about">About</a>
        <a href="/documentation/index.html">Documentation</a>
      </nav>

      <a href="#support" className="header-button">
        Support Utility
      </a>
    </header>
  );
}

