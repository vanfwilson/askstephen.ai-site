# Pick One Strategy – Long-Form Funnel Landing Page

## Overview
This repository contains the full source for the **PickOneStrategy.com** marketing website.
It was designed to mirror the messaging structure and offer progression from Alex Hormozi-style funnels, integrating both business and faith-based themes for small- to mid-size business owners.

Unlike the `askstephen.ai` SaaS web app (built in React/TypeScript with `.tsx` files), this landing page is a **single, self-contained HTML file** intended for high-conversion storytelling and WordPress compatibility.

---

## Features

- 🟡 **Single-file architecture** – All HTML, CSS, and JS inline for easy import into WordPress or GitHub Pages.
- 🌟 **Animated gold star background** – Subtle hero-section animation symbolizing clarity and enlightenment.
- 🌓 **Light/Dark alternating sections** – “Pain in the dark, solution in the light” visual metaphor.
- 🎥 **WordPress-friendly YouTube embed** – Thumbnail overlay replaced by live player on click.
- 💬 **Fade-in animations** – Triggered by Intersection Observer as users scroll.
- 🙏 **Faith-based optional section** – Integrates Biblical principles of stewardship and purpose.
- 💳 **Live CTAs** – Checkout and resource links to `askstephen.ai` WooCommerce endpoints.

---

## Folder / File Structure

📁 pickonestrategy/
│
├── index.html # Complete long-form page with inline CSS & JS
├── README.md # This documentation file
└── assets/ # (Optional) Thumbnail and book/workbook images


## Usage

### WordPress Deployment
1. Create or edit a new page in WordPress.
2. Add a **Custom HTML** block (or use Neve’s custom section).
3. Paste the full contents of `index.html`.
4. Replace placeholder assets and the YouTube video ID.

### Local Testing
Open `index.html` directly in a browser.  
All effects (fade-ins, background animation, and video placeholder) will run without any build tools.

### GitHub Pages Hosting
If you’d like to publish as a static site:
1. Commit `index.html` and `README.md` to a repo.
2. Enable **GitHub Pages** → Source: `main` branch.
3. Your page will be live at `https://<username>.github.io/pickonestrategy/`.

---

## Customization Notes

| Feature | Where to Edit | Description |
|----------|---------------|-------------|
| Hero background | Inline CSS (`.hero`) | Light gold gradient and star animation. |
| YouTube video | `.video-wrapper` `data-video` attribute | Replace placeholder ID with your YouTube video ID. |
| Thumbnail image | `<img class="video-thumbnail">` | Update to the correct path for Stephen’s image. |
| Section order or copy | `<section>` blocks | Each section clearly marked with `<!-- comments -->`. |
| CTA links | `<a href>` tags | Update WooCommerce links as needed. |

---

## Design Philosophy

This page uses a **story-driven funnel structure**:
1. Problem awareness (dark)
2. Solution revelation (light)
3. Proof and credibility
4. Call-to-action (webinar / toolkit)
5. Faith integration
6. Final CTA

The hero’s light-gold palette symbolizes the clarity and purpose business owners find when they “Pick One” strategy.

---

## Credits

- **Concept & Copy** – Stephen E. Wright & Van Wilson  
- **Development** – AI-assisted (ChatGPT-5 / Website Generator GPT)  
- **Company** – New View Innovation Financial LLC + 3A Automation Authority  
- **SaaS Integration** – [AskStephen.ai](https://askstephen.ai)

---

## License
© 2026 New View Innovation Financial LLC.  
All rights reserved. Content and structure are proprietary; reproduction without written consent is prohibited.
