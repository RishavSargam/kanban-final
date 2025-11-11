# Kanban Component — Final Submission

[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-teal)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-8.6.14-ff69b4)](https://storybook.js.org/)

---

##  Overview
This project contains a **from-scratch Kanban Board component** built using **React**, **TypeScript**, **Tailwind CSS**, and **Storybook**.  
It demonstrates a functional Kanban UI with HTML5 drag-and-drop, clean TypeScript types, and Storybook stories for easy component review.

---

##  How to Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run Storybook** 
   ```bash
   npm run storybook
   ```

3. Run the demo app locally
   ```bash
   npm run dev
   ```

---

##  What’s Included

| Folder | Description |
|--------|--------------|
| `src/components/KanbanBoard` | KanbanBoard, KanbanColumn, KanbanCard + story files |
| `src/hooks` | `useDragAndDrop`, `useKanbanBoard` — internal state + drag helpers |
| `src/utils` | Utility helpers (date/priority formatting, classNames, etc.) |
| `.storybook` | Storybook configuration (React-Vite setup, preview, addons) |
| `tailwind.config.js` / `postcss.config.js` | Tailwind CSS setup |
| `README.md` | You’re reading it  |

---

##  Compliance Notes

✅ **All code written manually** — no UI libraries or AI builders (e.g. Material UI, Radix, Chakra, etc.)  
✅ Uses **React + TypeScript + Tailwind + Storybook only**  
✅ Accessibility-aware: ARIA roles + focus-visible outlines  
✅ HTML5 drag-and-drop implemented manually


---



##  Tech Stack

-  **React 18**  
-  **TypeScript**  
-  **Tailwind CSS**  
-  **Storybook 8.6.14**  
-  **Jest + React Testing Library**

---

##  Running Tests

Install dependencies and run:
```bash
npm run test
```

Current tests:
- Basic render/smoke tests  
- Keyboard drag interaction simulation  


---

## 📎 Submission Notes

- GitHub repo: [https://github.com/RishavSargam/kanban-final](https://github.com/RishavSargam/kanban-final)
- Reviewer can clone and run `npm install && npm run storybook`


---

## 💬 Author
**Rishav Raj**  
📧 [rishavani24@gmail.com](mailto:rishavani24@gmail.com)  
🌐 [github.com/RishavSargam](https://github.com/RishavSargam)
