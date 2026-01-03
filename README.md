# 🧸 SmileSunshine Toy-Store Suite | ITP4506

Lightweight, static web suite for a fictional toy shop. Built with HTML, CSS, and vanilla JS (plus a little jQuery). No build step, no backend services—just open the HTML files in a browser.

## Project Layout
- Root site: entry pages, login/register, shared JS/CSS, and quotation form data in `data/quotations.json`.
- `OrderSystem_Phase1/`: shopping flow (browse, wishlist, checkout), order tracking, invoice/confirmation, and profile update screens with toy/order seed data.
- `QuotationSystem_Phase1/`: sales-side dashboard for handling quotations, statuses, and toy templates.

## Features (high level)
- Browse toys, create wishlists, and simulate checkout with static JSON data.
- Submit and track quotation requests; view statuses and sales dashboards.
- Basic account screens for profile updates (front-end only; no real auth persistence).

## Running Locally
1) Clone the repo.
2) Open any HTML file directly in your browser (e.g., `index.html`, `OrderSystem_Phase1/browse_toys.html`, or `QuotationSystem_Phase1/sales_dashboard.html`).
	- For smoother XHR to local JSON, you can run a tiny server such as `python -m http.server 8000` from the project root and browse to `http://localhost:8000`.

## Data & Storage
- Static datasets live in `data/` (quotations), `OrderSystem_Phase1/data/` (orders, toys), and `QuotationSystem_Phase1/data/` (toy templates).
- User info in `USERS.TXT` files is plain text and for demo only—do not use for real credentials.

## Tech Stack
- HTML5, CSS3, JavaScript, jQuery
- No build tools, databases, or external APIs

## Notes
- Media captures (e.g., `.mkv/.mp4`) are ignored via `.gitignore` to keep the repo lean.
