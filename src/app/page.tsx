"use client";

import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const categories = [
  {
    name: "PDF",
    description: "Documents and PDF files",
    status: "In progress",
    tools: [
      {
        name: "Compress PDF",
        status: "Ready",
        href: "/Utility-/tools/pdf/compress-pdf",
      },
      {
        name: "Merge PDF",
        status: "Coming soon",
      },
      {
        name: "Split PDF",
        status: "Coming soon",
      },
      {
        name: "PDF to Word",
        status: "Coming soon",
      },
    ],
  },
  {
    name: "Images",
    description: "Resize, convert and optimize",
    status: "Coming soon",
    tools: [
      {
        name: "Compress Image",
        status: "Coming soon",
      },
      {
        name: "Resize Image",
        status: "Coming soon",
      },
      {
        name: "JPG to PNG",
        status: "Coming soon",
      },
      {
        name: "PNG to JPG",
        status: "Coming soon",
      },
    ],
  },
  {
    name: "Text",
    description: "Write, clean and transform text",
    status: "Coming soon",
    tools: [
      {
        name: "Word Counter",
        status: "Coming soon",
      },
      {
        name: "Text Cleaner",
        status: "Coming soon",
      },
      {
        name: "Case Converter",
        status: "Coming soon",
      },
      {
        name: "Text Compare",
        status: "Coming soon",
      },
    ],
  },
  {
    name: "Developer",
    description: "Everyday developer utilities",
    status: "Coming soon",
    tools: [
      {
        name: "JSON Formatter",
        status: "Coming soon",
      },
      {
        name: "JSON Validator",
        status: "Coming soon",
      },
      {
        name: "Base64 Encoder",
        status: "Coming soon",
      },
      {
        name: "UUID Generator",
        status: "Coming soon",
      },
    ],
  },
  {
    name: "Calculators",
    description: "Quick everyday calculations",
    status: "Coming soon",
    tools: [
      {
        name: "Percentage",
        status: "Coming soon",
      },
      {
        name: "VAT Calculator",
        status: "Coming soon",
      },
      {
        name: "Tip Calculator",
        status: "Coming soon",
      },
      {
        name: "Unit Converter",
        status: "Coming soon",
      },
    ],
  },
  {
    name: "Generators",
    description: "Create useful things instantly",
    status: "Coming soon",
    tools: [
      {
        name: "QR Code",
        status: "Coming soon",
      },
      {
        name: "Password Generator",
        status: "Coming soon",
      },
      {
        name: "Lorem Ipsum",
        status: "Coming soon",
      },
      {
        name: "Favicon Generator",
        status: "Coming soon",
      },
    ],
  },
];

const popularTools = [
  {
    name: "Compress PDF",
    status: "Ready",
    href: "/Utility-/tools/pdf/compress-pdf",
  },
  {
    name: "Compress Image",
    status: "Coming soon",
  },
  {
    name: "Word Counter",
    status: "Coming soon",
  },
  {
    name: "JSON Formatter",
    status: "Coming soon",
  },
  {
    name: "QR Code Generator",
    status: "Coming soon",
  },
  {
    name: "Password Generator",
    status: "Coming soon",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      tools: category.tools.filter((tool) =>
        tool.name.toLowerCase().includes(query)
      ),
    }))
    .filter(
      (category) =>
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.tools.length > 0
    );

  return (
    <main className="site">
      <Header />

      <section className="hero">
        <div className="eyebrow">
          <span className="status-dot" />
          Free online tools
        </div>

        <h1>
          The little tools
          <br />
          <span>you need, all in one place.</span>
        </h1>

        <p className="hero-description">
          Simple utilities for files, images, text, calculations and more.
          No account. No unnecessary complexity.
        </p>

        <div className="search-box">
          <span className="search-icon">
            <SearchIcon />
          </span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="What are you trying to do?"
            aria-label="Search tools"
          />

          <span className="search-key">? K</span>
        </div>

        <div className="suggestions">
          <span>Popular:</span>

          <button onClick={() => setSearch("Compress PDF")}>
            Compress a PDF
          </button>

          <button onClick={() => setSearch("Compress Image")}>
            Resize an image
          </button>

          <button onClick={() => setSearch("JSON")}>
            Format JSON
          </button>

          <button onClick={() => setSearch("VAT")}>
            Calculate VAT
          </button>
        </div>
      </section>

      <section id="popular" className="content-section popular-section">
        <div className="section-heading">
          <div>
            <span className="section-label">POPULAR</span>
            <h2>What people use Utility for</h2>
          </div>

          <p>Quick access to the most useful everyday tools.</p>
        </div>

        <div className="popular-grid">
          {popularTools.map((tool, index) =>
            tool.href ? (
              <a
                key={tool.name}
                href={tool.href}
                className="popular-item"
              >
                <span className="popular-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="popular-name">{tool.name}</span>

                <span className="popular-arrow">
                  <ArrowIcon />
                </span>
              </a>
            ) : (
              <button
                key={tool.name}
                className="popular-item"
                onClick={() => setSearch(tool.name)}
              >
                <span className="popular-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="popular-name">{tool.name}</span>

                <span className="popular-arrow">
                  <ArrowIcon />
                </span>
              </button>
            )
          )}
        </div>
      </section>

      <section id="tools" className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>All tools</h2>
          </div>

          <p>Everything is designed to do one thing well.</p>
        </div>

        <div className="category-grid">
          {filteredCategories.map((category, index) => (
            <article className="category-card" key={category.name}>
              <div className="category-top">
                <span className="category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="category-arrow">
                  <ArrowIcon />
                </span>
              </div>

              <div className="category-title-row">
                <h3>{category.name}</h3>

                <span
                  className={`category-status ${
                    category.status === "In progress"
                      ? "category-status-active"
                      : "category-status-soon"
                  }`}
                >
                  {category.status}
                </span>
              </div>

              <p>{category.description}</p>

              <div className="tool-list">
                {category.tools.map((tool) =>
                  tool.href ? (
                    <a
                      key={tool.name}
                      href={tool.href}
                      className="tool"
                    >
                      <span>{tool.name}</span>

                      <span className="tool-status-ready">
                        {tool.status}
                      </span>

                      <span>
                        <ArrowIcon />
                      </span>
                    </a>
                  ) : (
                    <div key={tool.name} className="tool">
                      <span>{tool.name}</span>

                      <span className="tool-status-soon">
                        {tool.status}
                      </span>

                      <span>
                        <ArrowIcon />
                      </span>
                    </div>
                  )
                )}
              </div>

              <button className="view-all">
                View all {category.name} tools

                <span>
                  <ArrowIcon />
                </span>
              </button>
            </article>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="empty-state">
            <h3>No tool found</h3>

            <p>
              Try another search. We are constantly adding new utilities.
            </p>
          </div>
        )}
      </section>

      <section className="idea-section">
        <div className="idea-content">
          <span className="section-label">BUILT AROUND YOU</span>

          <h2>
            Can&apos;t find the tool
            <br />
            you&apos;re looking for?
          </h2>

          <p>
            Utility is meant to grow with the things people actually need.
            Tell us what you wish existed and we may build it next.
          </p>

          <button className="dark-button">
            Suggest a tool

            <span>
              <ArrowIcon />
            </span>
          </button>
        </div>

        <div className="idea-visual">
          <div className="idea-card idea-card-one">
            <span>+</span>
            Image compressor
          </div>

          <div className="idea-card idea-card-two">
            <span>+</span>
            Markdown converter
          </div>

          <div className="idea-card idea-card-three">
            <span>+</span>
            CSV cleaner
          </div>

          <div className="idea-circle">?</div>
        </div>
      </section>

      <section id="support" className="support-section">
        <div>
          <span className="section-label">COMMUNITY POWERED</span>

          <h2>Keep useful things free.</h2>

          <p>
            Utility is free to use. If it saves you time, you can help us
            maintain the project and build more tools.
          </p>
        </div>

        <button className="dark-button">
          Support Utility

          <span>
            <ArrowIcon />
          </span>
        </button>
      </section>

      <Footer />
    </main>
  );
}
