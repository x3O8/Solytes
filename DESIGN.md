---
version: alpha
name: 'Solytes Daylight Studio'
description: 'An architectural solar brand built around daylight, practical engineering and considered outdoor light.'
colors:
  background: '#ffffff'
  surface: '#ffffff'
  foreground: '#1f2c26'
  muted: '#627066'
  primary: '#ccff66'
  primary-hover: '#baef50'
  primary-foreground: '#243321'
  forest: '#4d6a54'
  sky: '#edf2ea'
  stone: '#f1f4ee'
  border: '#dde5da'
  badge-ink: '#45604b'
  badge-surface: '#e7ede5'
  focus-ring: '#4d6a54'
typography:
  display:
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
  body:
    fontFamily: 'Manrope, Arial, sans-serif'
rounded:
  DEFAULT: '12px'
  control: '12px'
  field: '10px'
  panel: '28px'
  navigation: '999px'
spacing:
  page-max: '1180px'
  section-min: '56px'
  section-max: '92px'
components:
  button:
    backgroundColor: '#ccff66'
    textColor: '#243321'
    rounded: '12px'
    height: '48px'
---

# Solytes Design System

## Overview

### Creative North Star

Solar should feel like part of a well-designed place. White page backgrounds and pale sage panels frame architectural photography; botanical ink makes the content clear, and the user's selected solar-lime color identifies primary actions. Helvetica Neue headings restore the original typography; Manrope handles prose and controls. Themely Design+Style Generator rendered this direction as Solytes — Daylight Studio.

The audience is homeowners, facility teams, landscape designers and project decision-makers across Kerala. The public site helps them explore lighting products, estimate rooftop capacity and begin an informed enquiry. English copy and Indian number formatting are canonical. Do not invent claims, project figures or coverage.

The signature is the day/night home scene and an asymmetric services composition: one immersive rooftop feature, with two compact panels for EPC execution and solar lighting. Homepage order: hero, Kerala introduction, products, services, calculator preview, FAQs, enquiry. Products remains third.

Runtime colors and shared rules in app/globals.css are canonical. The final Daylight Studio token block supersedes legacy palette declarations. app/layout.tsx wires font variables, with Helvetica Neue as the shared heading face and Manrope for body copy. Product composition lives in app/products/products.module.css; catalog controls/cards live in components/product-catalog.module.css. These modules consume shared color tokens.

## Colors

Use the frontmatter values. Primary lime has dark ink, including on photographic surfaces. Secondary controls use white, muted sage or simple text. Badges use pale sage with green text. Keep the contact heading black as explicitly requested. A subtle grain connects the surfaces without intercepting input. New controls avoid dark blue, mustard and amber. The original logo artwork and photography retain their colors.

## Typography

Helvetica Neue handles headings at weight 400 with close tracking and balanced line lengths. Manrope handles body text, navigation, fields and buttons. Body text uses comfortable line height. Do not add new external font families. Keep carousel title and description rows stable as products change.

## Layout

The shell caps at 1180px. Editorial sections use 56–92px padding, with smaller gaps between adjacent home sections and 48px on mobile. Preserve the rounded hero and its visible white frame.

The fixed header starts wide and becomes a compact sage pill on scroll without changing document height. On mobile the logo, Shop Now action and menu remain visible. The native modal menu contains focus, closes with Escape and restores scrolling on dismissal.

Use native document scrolling. overscroll-behavior-y: none on html and body prevents bottom-edge rebound while preserving intentional upward scrolling. Do not intercept wheel, touch or keyboard input, or globally disable scroll anchoring. Scrollbars stay visible with green/stone colors; forced colors uses system colors.

## Elevation & Depth

Photography and tonal surfaces provide depth. Product and service panels use restrained borders. Soft shadows are reserved for floating navigation, the day/night control and the calculator panel over photography.

## Shapes

Large panels use a 24–28px radius; controls use 10–12px. Navigation and small tags are deliberate pill exceptions. Services has a large rooftop image with a dark legibility overlay at left, and two image/copy panels at right. At tablet size the feature spans the row; on mobile all offerings stack in reading order.

## Components

### Buttons and actions

Primary actions use solar lime and dark ink with clear destination labels. Secondary actions are white or text. Existing primary-button arrow tiles remain white. The homepage View Products button has no arrow, as requested. Service links expose meaningful action labels, hover and visible keyboard-focus states. All links use real destinations.

### Navigation and data display

components/site-header.tsx owns navigation; components/site-link.tsx owns route-aware links. The product catalog retains URL-backed filters, clear search and accessible native sort. Use links for navigation and buttons for actions. Name icon-only controls.

### Forms and overlays

Home and contact share sage sections, white form panels, dark labels, pale fields and green focus. Native select popups are intentionally platform-owned. Preserve labels, inline validation and entered values. Enquiry opens the visitor's email app for review; it does not imply a completed submission. Email is info@solytes.com. The homepage phone +91 7561028248 sits after email and before the response window.

### Iconography

Use Lucide React 14–18px strokes paired with labels. Directional icons reinforce navigation. Do not use decorative numbering to suggest a sequence among unrelated offerings.

### Motion

Motion explains state changes and small image emphasis. Shared easing is cubic-bezier(0.25, 1, 0.5, 1). Reduced motion disables nonessential transitions, carousel autoplay and the logo marquee. Hover never reveals otherwise inaccessible content.

### Loading and delivery

Reserve media geometry. components/optimized-image.tsx and lib/image-manifest.json deliver responsive images. Regenerate variants only when source artwork changes. Request the night scene on demand and keep daylight visible until loaded. Carousel autoplay pauses while hidden, hovered or focused. Route feedback adds no artificial wait.

### Content and data visualization

Describe actual applications: rooftops, outdoor light, energy use and project scope. Calculator results are early planning estimates, not final engineering proposals. Do not fabricate metrics, accreditations or testimonials.

## Do's and Don'ts

- Keep typography, palette, spacing, focus and action treatments consistent across routes.
- Preserve the user's light palette, lime buttons, contact details and product-section order.
- Use site and product photography as evidence.
- Avoid generic leaves, gradients, excessive shadows and unrelated motion.
- Preserve mobile reading order, keyboard access, legibility and layout stability.

### Storefront and quote basket

The products route is a shopping-first catalogue: a compact heading/search/basket bar, category navigation, desktop filter sidebar, mobile filter disclosure, sorting and a three-column product grid (two columns on narrow screens). Product photography uses the original clean catalogue images rather than lifestyle scenes or artwork with baked checkerboards.

The owner explicitly requested initial estimated prices displayed as normal shop prices and intends to replace them later. Every Product.price in lib/products.ts is an editable integer number of rupees; formatPrice owns Indian currency formatting. Initial values range from 1299 to 7499, informed by Indian retailer comparisons (Hardoll and Tapetum, checked 19 October 2026). These are owner-authorized draft prices, not a claim that the retailer's products and specifications are identical. Do not invent crossed-out MRPs, discount percentages, ratings, stock or shipping promises.

Catalog search, category, installation, feature and sort choices use the URL. Filtering is local and immediate. Sorting includes alphabetical and price order. A no-results state offers a full reset. Native radios, checkboxes and the native sort select intentionally retain platform-owned behavior.

lib/quote-basket-store.ts owns the saved basket through useSyncExternalStore and browser localStorage. It stores product slugs and integer quantities from 1 to 999; it validates stored values and synchronizes changes between tabs and after navigation. Storage failures retain an in-memory session. components/quote-basket.tsx owns one native modal drawer shared by the catalogue and product detail purchase control. Escape/backdrop/close restore focus and document scrolling; quantity and removal controls have accessible names.

Cards, detail pages, basket lines and product totals read the same price field. There is no payment processor or order backend. Request a quote prepares an email with the selected products, quantities, prices and product links for the visitor to review and send. Shipping and final pricing are confirmed by the team. Do not present an unimplemented checkout, a completed order or an email-success claim.

The FAQ card now uses the site-assessment photograph home-process-read-site.png. The footer brand area uses the compact 190px official wordmark with its original caption beneath it.
