# Storefront interaction contract

Scope: public product catalogue, product details and quote basket. English UI, INR formatting, native document scrolling. No payment processing or server order submission.

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Select/Listbox | Native select in product-catalog.tsx | DESIGN.md | Native sort popup | Keyboard and selection in browser |
| Form | ProductCatalog search and native filter fields | DESIGN.md | Immediate local search; URL-backed filters | Search, clear, no-results, reset and combined filters |
| Scrollbar | app/globals.css | DESIGN.md | Global visible baseline; basket owns internal overflow | Desktop/mobile layout and drawer scrolling |
| Quote selection | lib/quote-basket-store.ts | Product slug and integer quantity, 1–999 | Local persistence with in-memory fallback | Add, increment, remove, reload and navigation |
| Quote overlay | components/quote-basket.tsx | Native dialog | Right drawer/full-width narrow viewport | Focus, Escape, backdrop, scroll lock and return |
| Feedback | ProductCatalog inline output | Current basket update | Polite live status with View quote action | Browser add/remove workflow |

Prices are canonical integer rupees in lib/products.ts and all display uses formatPrice. The owner requested estimated draft prices shown as normal storefront prices. Shipping and final price confirmation stay with the team. Email preparation is the only external handoff; it never sends automatically.
