---
version: alpha
name: 'Solytes Solar Field Guide'
description: 'A daylight-led brand system that makes solar lighting and EPC planning feel architectural, practical, and accountable.'
colors:
  background: 'oklch(0.985 0.006 153)'
  surface: 'oklch(1 0 0)'
  foreground: 'oklch(0.22 0.035 155)'
  muted: 'oklch(0.47 0.025 155)'
  primary: 'oklch(0.30 0.082 153)'
  primary-hover: 'oklch(0.39 0.092 153)'
  daylight-accent: 'oklch(0.91 0.155 113)'
  sky-accent: 'oklch(0.88 0.065 225)'
  border: 'oklch(0.87 0.012 153)'
  focus-ring: 'oklch(0.58 0.09 153)'
typography:
  display:
    fontFamily: 'Space Grotesk, Arial, sans-serif'
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
    backgroundColor: 'oklch(0.985 0.006 153 / 86%)'
    textColor: 'oklch(0.22 0.035 155)'
    rounded: '22px'
    height: '68px'
  button:
    backgroundColor: 'oklch(0.30 0.082 153)'
    textColor: 'oklch(1 0 0)'
    rounded: '9px'
    height: '48px'
  product-card:
    backgroundColor: 'oklch(1 0 0)'
    textColor: 'oklch(0.22 0.035 155)'
    rounded: '0px'
  form-field:
    backgroundColor: 'oklch(1 0 0)'
    textColor: 'oklch(0.22 0.035 155)'
    rounded: '13px'
    height: '58px'
---

# Solytes Design System

## Overview

### Creative North Star

The site should feel like an architect's solar field guide: daylight, roof planes, fixture silhouettes, specification notes, and disciplined site photography. It is expressive enough to establish a memorable solar brand, but clear enough for a customer comparing products or planning a real installation.

The homepage below the hero uses one vertically extended sky-to-solar-meadow artwork as its continuous scrolling backdrop. Content sections use restrained translucent planes where contrast requires them, allowing the sky to remain visible and the meadow to arrive naturally near the lower page. Footer information sits on one quiet translucent plane so the artwork reads as a single place rather than a set of background panels.

### Product context and register

- **Audience and primary job:** Homeowners, facility teams, landscape designers, and project decision-makers need to understand Solytes products, estimate a rooftop system, and begin an informed enquiry.
- **Target market and evidence:** Indian customers are evidenced by INR calculator values and the `solytes.in` contact address. The site does not claim wider regional coverage.
- **Locale and language policy:** English UI with Indian number formatting where money and energy values appear.
- **Usage scene:** Brand discovery and project research across mobile and desktop; generous marketing layouts transition into compact, practical forms and specifications.
- **Register:** Brand-led marketing on public routes, with product-like clarity for the calculator and enquiry form.
- **Memorable signature:** The home hero's morning/night control demonstrates the actual solar story: capture energy in daylight, use it after dark.
- **Restraint:** Forms, specifications, navigation, and calculator controls stay familiar, semantic, and quiet.
- **Anti-references:** Avoid generic eco leaves, sunburst gradients, neon-tech dashboards, excessive rounded cards, and decorative motion that is unrelated to energy or light.
- **Token ownership/runtime mapping:** Runtime values in `app/globals.css` are canonical. This document records their roles and rationale; font variables are wired in `app/layout.tsx` and shared components consume the global tokens.

## Colors

Photovoltaic green is the primary structural color. Daylight lime is reserved for small signals, active navigation, and dark-surface highlights—not large text fields or body copy. Cool sky blue may support atmospheric imagery but must not compete with the primary green. Background and surface tones remain slightly green so white product photography and dark fixtures sit naturally within the site. Focus rings must remain visible on both pale and dark surfaces. Forced-colors mode returns control to the system.

## Typography

Space Grotesk carries display headlines, giving the site an engineered, architectural voice. Manrope handles prose, controls, and specifications for legibility. Headlines use restrained weights, close tracking, and balanced line breaks; body copy remains sentence case with comfortable line height. Numeric outputs use the body family and Indian number formatting rather than a decorative data font.

## Layout

The main canvas is capped at 1240px with wide section breathing room. Pages alternate between immersive full-bleed imagery and aligned editorial grids. The header floats as a stable island above every route. On narrow screens, multi-column sections become a single reading order, product navigation gains explicit horizontal scrolling, and actions remain at least 44px high. Images reserve their geometry, and page-level horizontal overflow is not allowed.

## Elevation & Depth

Depth comes from photography, tonal layering, and translucent navigation rather than a stack of card shadows. Static content stays mostly flat with borders and background shifts. Shadows are reserved for the floating header, the day/night control, and glass panels over photography.

## Shapes

The system uses compact softened rectangles, not pills. Controls sit near a 9-13px radius; the floating navigation is the deliberate 22px exception. Product collections and information sections prefer large planes with crisp dividers. Lucide icons use consistent strokes and stay secondary to text labels.

## Components

### Foundational visual states

All enabled controls have visible hover, focus-visible, and pressed states. Focus uses the shared ring token with an offset. Selected states combine color with position, underline, or `aria-pressed`; they never rely on color alone. Reduced-motion preferences collapse transitions and stop the logo marquee.

### Buttons and actions

Primary actions use forest green on pale surfaces and off-white on dark photographic surfaces. Secondary actions are text links with directional icons. Labels describe the destination or result: “View product,” “Open solar calculator,” and “Prepare enquiry email.” Button dimensions remain stable across interaction states.

### Navigation and data display

The floating header is shared by every route and exposes the active route. Its expanded-to-compact transition changes the island's width and spacing while keeping its contents at a stable scale. The brand lockup uses the framed uppercase “SOLYTES” wordmark with “YOUR ENERGY INDEPENDENCE” as its supporting line. Mobile navigation uses the same destinations in a compact disclosure. Product indexes and EPC stage numbers are used only where the sequence or collection order is meaningful.

### Forms and overlays

Forms use real labels, native fields, owned focus styling, inline text errors, and `noValidate`. The contact and newsletter actions honestly open the visitor's email application for review rather than implying a completed server submission. Native selects are acceptable because no custom popup geometry is required.

### Iconography

Lucide React is the shared icon family. Icons are normally 14-18px, stroke-based, optically aligned with text, and paired with labels except for universally understood menu controls that have accessible names.

### Motion

Motion explains a state change: day to night, header compaction, product-image emphasis, or directional hover feedback. Ambient motion is limited to the partner-logo drift. The shared easing is `cubic-bezier(0.25, 1, 0.5, 1)`; reduced-motion disables nonessential transitions and animation.

### Content and data visualization

Copy is direct and site-specific. It starts with the space, load, site, or application instead of vague sustainability claims. Technical estimates are explicitly framed as planning guidance, never final engineering or financial proposals.

## Do's and Don'ts

- **Do:** Use real product and site imagery as the primary visual evidence.
- **Do:** Keep the same typography, action hierarchy, focus treatment, and spacing rhythm on every route.
- **Don't:** add generic green gradients, leaf motifs, or sustainability claims that are not supported by the product content. Reserve glass surfaces for the floating navigation and the newsletter panel over photography.
- **Don't:** trade legibility, semantic controls, reduced-motion support, or mobile reading order for visual novelty.
