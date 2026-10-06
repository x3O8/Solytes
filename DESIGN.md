---
version: alpha
name: 'Solytes Solar Field Guide'
description: 'A daylight-led brand system that makes solar lighting and EPC planning feel architectural, practical, and accountable.'
colors:
  background: '#fffcf3'
  surface: '#fff'
  foreground: '#3e4930'
  muted: '#727662'
  primary: '#d6df9d'
  primary-hover: '#c8d58a'
  daylight-accent: '#d6df9d'
  sky-accent: '#edf0e0'
  border: '#e4e2cf'
  focus-ring: '#7c8748'
typography:
  display:
    fontFamily: 'Bodoni Moda, Georgia, serif'
  body:
    fontFamily: 'Manrope, Arial, sans-serif'
  logo:
    fontFamily: 'Space Grotesk, Arial Narrow, Arial, sans-serif'
rounded:
  DEFAULT: '10px'
  control: '9px'
  field: '13px'
  navigation: '22px'
spacing:
  page-max: '1240px'
  section-min: '104px'
  section-max: '160px'
components:
  header:
    backgroundColor: '#fff'
    textColor: '#3e4930'
    rounded: '0px'
    height: '84px, 56px when scrolled'
  button:
    backgroundColor: '#d6df9d'
    textColor: '#3e4930'
    rounded: '9px'
    height: '48px'
  product-card:
    backgroundColor: 'oklch(1 0 0)'
    textColor: 'oklch(0.22 0.035 155)'
    rounded: '18px'
  form-field:
    backgroundColor: 'oklch(1 0 0)'
    textColor: 'oklch(0.22 0.035 155)'
    rounded: '13px'
    height: '58px'
---

# Solytes Design System

## Overview

### Creative North Star

The site should feel like a quiet solar atelier: daylight, roof planes, fixture silhouettes, specification notes and disciplined site photography. Warm ivory and pale butter keep the interface light around the photography. Fresh olive carries primary actions, links, and badges, with dark leaf ink for readable contrast.

The homepage opens with the full-viewport day/night home scene, introduces Solytes through its Kerala service context, then follows a practical decision path: choose lighting or projects, see the site-first method, plan a rooftop system and begin a conversation. Every route uses aligned editorial planes, real photography and warm neutral space. The final navigation becomes a full-bleed white-sky solar meadow, while its content remains aligned to the shared page grid.

### Product context and register

- **Audience and primary job:** Homeowners, facility teams, landscape designers, and project decision-makers need to understand Solytes products, estimate a rooftop system, and begin an informed enquiry.
- **Target market and evidence:** Indian customers are evidenced by INR calculator values and the Kerala project context. The site does not claim wider regional coverage.
- **Locale and language policy:** English UI with Indian number formatting where money and energy values appear.
- **Usage scene:** Brand discovery and project research across mobile and desktop; generous marketing layouts transition into compact, practical forms and specifications.
- **Register:** Brand-led marketing on public routes, with product-like clarity for the calculator and enquiry form.
- **Memorable signature:** The home hero's fully rounded morning/night control demonstrates the actual solar story: the same home captures energy in daylight and glows after dark. A precise Kerala silhouette with city markers grounds the company locally, and the footer closes the story with an illustrated solar field whose white sky dissolves into the navigation surface.
- **Restraint:** Forms, specifications, navigation, and calculator controls stay familiar, semantic, and quiet.
- **Anti-references:** Avoid generic eco leaves, sunburst gradients, neon-tech dashboards, excessive rounded cards, and decorative motion that is unrelated to energy or light.
- **Token ownership/runtime mapping:** Shared runtime values in `app/globals.css` are canonical. Route-specific composition lives in colocated CSS modules; `app/products/products.module.css` owns the catalog hero and guidance layout, while `components/product-catalog.module.css` owns filters and product cards. This document records their roles and rationale; font variables are wired in `app/layout.tsx`.

## Colors

Fresh olive is the primary action color, with dark leaf text for contrast. Pale butter supports navigation and utility panels, warm ivory grounds the page, and olive defines links and badges. The primary page and section canvas is pure white, giving product photography and dark fixtures room to read clearly. Focus rings remain visible in all surfaces. Forced-colors mode returns control to the system.

## Typography

Bodoni Moda carries display headlines, including the home hero, bringing a considered editorial contrast to the site’s architectural solar field-guide voice. Manrope handles prose, controls, and specifications for legibility. Headlines use restrained weights, close tracking, and balanced line breaks; body copy remains sentence case with comfortable line height. Numeric outputs use the body family and Indian number formatting rather than a decorative data font.

## Layout

The main canvas is capped at 1180px with wide editorial breathing room. Pages alternate between immersive full-bleed imagery and aligned content planes. The full-width white header follows the Superpower reference: links on the left, a centered wordmark, and enquiry, Shop Now and a nine-dot menu on the right. Scrolling turns the header into a centered 56px floating pale-butter pill with a separate circular dot menu. The hero has rounded corners on all sides and an 8px white frame, with its height sized to show the lower corners in the initial viewport. The dot menu opens a native modal side panel with grouped navigation, keyboard focus containment, Escape and backdrop dismissal. On mobile the wordmark sits left and the CTA and menu sit right. On narrow screens, navigation becomes a compact disclosure, product navigation gains explicit horizontal scrolling, and actions remain at least 44px high. Images reserve their geometry, and page-level horizontal overflow is not allowed.

## Elevation & Depth

Depth comes from photography, tonal layering, and translucent navigation rather than a stack of card shadows. Static content stays mostly flat with borders and background shifts. Shadows are reserved for the floating header, the day/night control, and compact glass panels over photography such as the calculator preflight list.

## Shapes

The system uses compact softened rectangles, not pills. Controls sit near a 9-13px radius; the floating navigation is the deliberate large-radius exception. Product collections and information sections prefer large planes with crisp dividers, while the footer landscape runs edge to edge. Lucide icons use consistent strokes and stay secondary to text labels.

## Components

### Foundational visual states

All enabled controls have visible hover, focus-visible, and pressed states. Focus uses the shared ring token with an offset. Selected states combine color with position, underline, or `aria-pressed`; they never rely on color alone. Reduced-motion preferences collapse transitions and stop the logo marquee.

### Buttons and actions

Primary actions use olive with dark leaf text on pale surfaces and off-white on dark photographic surfaces. Secondary actions are text links with directional icons. Labels describe the destination or result: “View product,” “Open solar calculator,” and “Prepare enquiry email.” Button dimensions remain stable across interaction states.

### Navigation and data display

The shared header is rendered by `components/site-header.tsx`. The homepage treatment uses a light sunrise mark and white navigation over the hero, balanced by a compact white Enquire pill. Inner pages swap to the dark wordmark and ink text on a restrained translucent white surface. Mobile uses a semantic menu disclosure with Escape and outside-press closing. The products route uses a two-column browsing grid, real-use imagery where available, compact URL-backed filters and restrained application tags. Product indexes and project stage numbers are used only where the sequence or collection order is meaningful.

### Forms and overlays

The homepage and contact page share a pale butter section and white form surface, with olive text and actions, bordered light fields and a restrained olive kicker. The --enquiry-* variables in app/globals.css own this shared palette. Forms use real labels, native fields, owned focus styling, inline text errors, and `noValidate`. The contact and newsletter actions honestly open the visitor's email application for review rather than implying a completed server submission. Native selects are acceptable because no custom popup geometry is required.

### Iconography

Lucide React is the shared icon family. Icons are normally 14-18px, stroke-based, optically aligned with text, and paired with labels except for universally understood menu controls that have accessible names.

### Motion

Motion explains a state change: the fixed-scale day-to-night hero crossfade, product-image emphasis, or directional hover feedback. Ambient motion is limited to the partner-logo drift. The shared easing is `cubic-bezier(0.25, 1, 0.5, 1)`; reduced-motion disables nonessential transitions and animation.

### Content and data visualization

Copy is direct and site-specific. It starts with the space, load, site, or application instead of vague sustainability claims. Technical estimates are explicitly framed as planning guidance, never final engineering or financial proposals.

## Do's and Don'ts

- **Do:** Use real product and site imagery as the primary visual evidence.
- **Do:** Keep the same typography, action hierarchy, focus treatment, and spacing rhythm on every route.
- **Don't:** add generic green gradients, leaf motifs, or sustainability claims that are not supported by the product content. Reserve glass surfaces for the floating navigation and the newsletter panel over photography.
- **Don't:** trade legibility, semantic controls, reduced-motion support, or mobile reading order for visual novelty.
