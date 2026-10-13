import React from "react";

/**
 * Tech stack data
 * - icon: inline SVG (w-8 h-8), koi external package nahi
 * - tags: row me chhote chips ke roop me dikhte hain (max 3), apne hisaab se badlo
 */
export const techStackData = [
  {
    id: "react",
    name: "REACT",
    category: "frontend",
    categoryLabel: "Frontend",
    description: "Where I build modern web apps, reactive interfaces, and scalable component systems.",
    tags: ["Hooks", "Components", "Vite"],
    icon: (
      <svg viewBox="0 0 115.3 100" className="w-8 h-8" fill="none" aria-label="React logo">
        <ellipse cx="57.65" cy="50" rx="16.5" ry="46.5" transform="rotate(30 57.65 50)" stroke="#00D8FF" strokeWidth="6.5" />
        <ellipse cx="57.65" cy="50" rx="16.5" ry="46.5" transform="rotate(90 57.65 50)" stroke="#00D8FF" strokeWidth="6.5" />
        <ellipse cx="57.65" cy="50" rx="16.5" ry="46.5" transform="rotate(150 57.65 50)" stroke="#00D8FF" strokeWidth="6.5" />
        <circle cx="57.65" cy="50" r="9.5" fill="#00D8FF" />
      </svg>
    ),
  },
  {
    id: "javascript",
    name: "JAVASCRIPT",
    category: "frontend",
    categoryLabel: "Language",
    description: "Clean ES6+ modern code that runs fast and reliably across all browsers.",
    tags: ["ES6+", "Async/Await", "DOM"],
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8 rounded-lg overflow-hidden" aria-label="JavaScript logo">
        <rect width="100" height="100" fill="#F7DF1E" />
        <path
          d="M62.6 77.2c2.4 4 5.7 6.6 11.5 6.6 5.8 0 9.5-2.9 9.5-7 0-4.8-3.9-6.6-10.4-9.5l-3.6-1.5c-10.2-4.4-17-10-17-21.7 0-10.8 8.3-19 21.2-19 9.3 0 16 3.6 20.6 11.8l-10.6 6.8c-2.3-4.1-4.8-5.8-10-5.8-4.3 0-7.3 2.7-7.3 6.2 0 4.3 2.7 6.1 8.9 8.8l3.6 1.5c12.2 5.2 19 10.7 19 22.8 0 13-10.2 20.3-23.7 20.3-13.1 0-21.7-6.2-25.7-15.1l14-9.4zM22.5 76.5c2 3.4 3.8 6.2 8.3 6.2 4.2 0 6.9-1.7 6.9-8.1V26.2h15.2v48.6c0 14.6-8.6 21-21.6 21-11.3 0-17.8-5.8-21.4-14.4l12.6-4.9z"
          fill="#111111"
        />
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "NODE.JS",
    category: "backend",
    categoryLabel: "Backend",
    description: "High-throughput asynchronous runtime connecting frontends to servers and databases.",
    tags: ["Runtime", "npm", "APIs"],
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" aria-label="Node.js logo">
        <path d="M16 2.5L28.5 9.7V24.3L16 31.5L3.5 24.3V9.7L16 2.5Z" fill="#5FA04E" />
        <path d="M13 12.2v7.6h2.1v-4.3l3 4.3h2.4v-7.6h-2.1v4.3l-3-4.3H13z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "express",
    name: "EXPRESS.JS",
    category: "backend",
    categoryLabel: "Server Routes",
    description: "Fast, minimal RESTful APIs, secure middleware, and server-side route architecture.",
    tags: ["REST", "Middleware", "Routing"],
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8 rounded-lg overflow-hidden" aria-label="Express.js logo">
        <rect width="40" height="40" fill="#111111" rx="8" />
        <path
          d="M10 20h7m6 0h7M20 13v14M15 16l5-5 5 5M15 24l5 5 5-5"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="20" r="3" fill="var(--brand-primary)" />
      </svg>
    ),
  },
  {
    id: "mongodb",
    name: "MONGODB",
    category: "backend",
    categoryLabel: "Database",
    description: "Scalable NoSQL database for managing document collections, schemas, and queries.",
    tags: ["NoSQL", "Mongoose", "Atlas"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-label="MongoDB logo">
        <path
          d="M12 1.5c0 0-6 6.5-6 13.2 0 3.6 2.4 6.2 5.3 6.8V23h1.4v-1.5c2.9-.6 5.3-3.2 5.3-6.8C18 8 12 1.5 12 1.5z"
          fill="#47A248"
        />
        <path d="M12 3.5c-1 2-3.2 6-3.2 11 0 3 1.4 5.2 3.2 6.2V3.5z" fill="#00ED64" opacity="0.55" />
        <rect x="11.5" y="19" width="1" height="4" fill="#B8C4C2" />
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "TAILWIND CSS",
    category: "frontend",
    categoryLabel: "Design & Styling",
    description: "Utility-first CSS architecture for custom responsive layouts and rapid design iteration.",
    tags: ["Responsive", "Utility-first", "Fast UI"],
    icon: (
      <svg viewBox="0 0 24 24" fill="#38BDF8" className="w-8 h-8" aria-label="Tailwind CSS logo">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    id: "git",
    name: "GIT",
    category: "tools",
    categoryLabel: "Version Control",
    description: "Distributed version control keeping code history organized with branches and tags.",
    tags: ["Branches", "Commits", "Merge"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#F05032" aria-label="Git logo">
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.122 0L8.837 2.56l3.056 3.056a1.782 1.782 0 0 1 2.26 2.26l3.037 3.038a1.78 1.78 0 0 1 1.942 2.766 1.78 1.78 0 0 1-2.766-1.942l-2.82-2.82a1.776 1.776 0 0 1-.926.257c-.7 0-1.332-.405-1.62-1.03l-2.84 2.84v6.86a1.782 1.782 0 1 1-1.5 0v-7.14a1.78 1.78 0 0 1-.84-2.34L3.65 6.088.454 9.284a1.5 1.5 0 0 0 0 2.122l10.48 10.48a1.5 1.5 0 0 0 2.121 0l10.49-10.48a1.5 1.5 0 0 0 0-2.476z" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GITHUB",
    category: "tools",
    categoryLabel: "Collaboration",
    description: "Code hosting, continuous integration, pull requests, and automated deployment.",
    tags: ["Pull Requests", "Actions", "Hosting"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#181717" aria-label="GitHub logo">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    id: "vscode",
    name: "VS CODE",
    category: "tools",
    categoryLabel: "Editor",
    description: "Daily editor configured with linters, Git graph, debugger, and fast workspace productivity.",
    tags: ["Extensions", "Debugger", "Snippets"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#007ACC" aria-label="VS Code logo">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    ),
  },
];