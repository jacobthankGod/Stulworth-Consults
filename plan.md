# Stulworth × Fresh-Consulting UI/UX Replica — Plan & Status

## Brief
- **Approach:** Full visual/structural replica of Fresh Consulting's UI/UX, with **original Stulworth copy and imagery** (no copied text, logos, or photos).
- **Scope:** Homepage (full replica) + dedicated **Services** and **Contact** pages. About/Insights/Work/Careers dedicated pages deferred (previewed on homepage).
- **Stack:** Static HTML/CSS/JS, CSS/JS split into separate files.
- **Accent:** Fresh's signature green approximated as `--accent: #00b86b` (tweak in `assets/css/tokens.css`).

## Design tokens (derived from Fresh's visual system)
| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #ffffff | page background |
| `--surface` | #ffffff | cards/panels |
| `--surface-2` | #f4f6f5 | subtle fills, logo strip |
| `--ink` | #0c0f0e | primary text |
| `--muted` | #5d6663 | secondary text |
| `--line` | rgba(12,15,14,.10) | hairlines |
| `--accent` | #00b86b | primary CTA / highlights |
| `--accent-deep` | #009159 | hover / text-on-tint |
| Radius | 8 / 14 / 22 / 32 / pill | component rounding |
| Shadow | sm / md / lg | elevation |
| Container | 1280 / 1440 wide | max widths |
| Font | Inter (400–900) | typography |

## File structure
```
index.html          homepage (hero slides, manifesto, approach, capabilities, team, logos, insights, industries, process, work, CTA)
services.html        Services page (Strategy / Brand / Product / Growth categories)
contact.html         Contact page (info + validated form)
assets/css/tokens.css  base.css  components.css  layout.css  pages.css
assets/js/nav.js  hero.js  filters.js  reveal.js  forms.js
```

## 150-Phase Plan (grouped by milestone)

### 0 — Foundations & design audit (1–15) — DONE
1–15. Folder structure, CSS file setup, audit of Fresh's tokens (color/type/spacing/radius/shadow/button/nav), document system, image strategy.

### 1 — Design tokens & base (16–35) — DONE
16–35. Color/spacing/radius/shadow/container tokens, font import, base reset, type scale, button + chip + eyebrow components, reduced-motion guard.

### 2 — Global shell: header & nav (36–60) — DONE
36–60. Sticky blurred header, brand, primary nav, nav-cta, hamburger, Services/Industries mega-menus, active states, keyboard/focus, scroll-state, mobile off-canvas menu, a11y, QA.

### 3 — Global shell: footer (61–72) — DONE
61–72. Multi-column footer (brand, Services, Company, Stages, Offices, social), bottom bar, responsive, links, reveal.

### 4 — Homepage hero slides (73–88) — DONE
73–88. Full-bleed `.hero-slides`, 3 slides w/ Stulworth copy + Unsplash bg, overlay gradient, CTAs, auto-rotate, dots/arrows, pause on hover/focus, crossfade, responsive, a11y (carousel role, reduced-motion).

### 5 — Manifesto & approach (89–98) — DONE
89–98. Large manifesto statement, "Our approach" 3 pillars, CTA, reveal, responsive.

### 6 — Capabilities grid (99–112) — DONE
99–112. Section header, filter chips (All/Strategy/Brand/Product/Growth), 6 capability cards, hover, filter JS, aria-pressed, reveal stagger, responsive.

### 7 — Team, logos, insights (113–124) — DONE
113–124. "Meet the team" 4 cards, partner logo strip (original names), "What we think" 4 insight cards, reveal, responsive.

### 8 — Industries, process, work, CTA (125–138) — DONE
125–138. Industries 4 blocks, process 5 steps, featured work 4 cards, CTA band, reveal, responsive, link check.

### 9 — Services page (139–148) — DONE
139–148. Shell, page hero, 4 category sections (anchors #strategy/#brand/#product/#growth) with sub-service cards, CTA band, reveal, responsive.

### 10 — Contact page (149–150 + closure) — DONE
149. Contact hero, info panels, validated form (name/email/company/message), social links, CTA band.
150. Cross-cutting polish & launch: responsive QA, a11y (contrast/focus/alt/ARIA), reduced-motion, JS syntax check, local preview, write plan to `plan.md`.

## Status
Initial build of all three pages + full CSS/JS is complete and passes syntax/tag-balance checks. Open `index.html` in a browser to preview.

## Deferred (future engagement)
- Dedicated About, Insights (blog), Work (portfolio), Careers pages.
- CMS, analytics, real form backend, favicon/OG images, lighthouse pass.
