# QA & Debugging Audit Report: Micasa Door

**Project Path:** `/home/duck/projects/micasadoor`  
**Audit Environment:** Local Dev (`http://localhost:3000`) & Local Production (`http://localhost:3005`)  
**Package Manager:** `npm` (v10+, Node.js v26.11.1, Linux)  
**Framework:** Next.js 16.3.5 (App Router, Turbopack, React 19.2.8, TypeScript 5)  
**Date of Audit:** October 9, 2026  

---

## 1. Executive Summary

| Category | Count | Status / Notes |
| :--- | :---: | :--- |
| **Production Build Errors (`npm run build`)** | **0** | All 34 static and dynamic routes compiled successfully in 2.8s. |
| **Type Check Errors (`npx tsc --noEmit`)** | **0** | Clean exit with zero TypeScript compilation errors. |
| **Linter Errors (`npm run lint`)** | **49** | 10 in active Next.js app (`app/`), 14 in root/scratch scripts, 25 in legacy `frontend/` directory. |
| **Linter Warnings (`npm run lint`)** | **1,501** | 44 in `app/`, 2 in `components/`, 1,453 in legacy `frontend/`, 2 in scratch files. |
| **Browser Uncaught Exceptions (`pageerror`)** | **0** | No unhandled runtime JavaScript exceptions across 45 routes. |
| **Browser Console Errors** | **2** | 2 HTTP 404 resource errors on synthetic `/non-existent-page-404` test route (1 Desktop, 1 Mobile). |
| **Browser Console Warnings** | **304** | 30 Next.js server sync dynamic API warnings transmitted to console, image aspect ratio warnings, preload warnings. |
| **Failed Network Requests (4xx/ORB)** | **4** | 2 broken Unsplash image URLs on `/` resulting in HTTP 404 & `net::ERR_BLOCKED_BY_ORB` (2 Desktop, 2 Mobile). |
| **Total Unique Routes Tested** | **45** | 10 static routes, 19 product detail routes, 6 door routes, 9 frame routes, 1 404 route. |
| **Pages Affected by Console/Network Issues** | **17** | `/` (broken images), `/doors/[slug]` (6 routes, sync dynamic warning), `/frames/[slug]` (9 routes, sync dynamic warning), `/non-existent-page-404` (404 status). All other 28 routes showed zero console errors. |

---

## 2. Build & Linter Errors Table

Executed sequentially:
1. `npm ci` (Clean install: 0 errors; 1 deprecation warning, 9 audit vulnerability warnings, 1 blocked script warning)
2. `npm run build` (Production build: 0 errors, 0 warnings)
3. `npm run lint` (Linter: 49 errors, 1,501 warnings — command exited with code 1)
4. `npx tsc --noEmit` (TypeScript type checker: 0 errors, 0 warnings)

### Linter Errors Table (`npm run lint`)

| Command | File:Line | Message | Severity |
| :--- | :--- | :--- | :--- |
| `npm run lint` | `app/api/contact/route.ts:71:19` | `Unexpected any. Specify a different type.` (`@typescript-eslint/no-explicit-any`) | Error |
| `npm run lint` | `app/components/CallToActionSection.tsx:231:22` | `Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free.` (`@typescript-eslint/ban-ts-comment`) | Error |
| `npm run lint` | `app/components/Hero.tsx:44:7` | `Error: Calling setState synchronously within an effect can trigger cascading renders` (`react-hooks/set-state-in-effect`) | Error |
| `npm run lint` | `app/components/Navbar.tsx:70:22` | `Unexpected any. Specify a different type.` (`@typescript-eslint/no-explicit-any`) | Error |
| `npm run lint` | `app/components/Navbar.tsx:70:47` | `Unexpected any. Specify a different type.` (`@typescript-eslint/no-explicit-any`) | Error |
| `npm run lint` | `app/components/Navbar.tsx:74:22` | `Unexpected any. Specify a different type.` (`@typescript-eslint/no-explicit-any`) | Error |
| `npm run lint` | `app/components/Navbar.tsx:74:47` | `Unexpected any. Specify a different type.` (`@typescript-eslint/no-explicit-any`) | Error |
| `npm run lint` | `app/components/ProjectsSection.tsx:43:54` | `Unexpected any. Specify a different type.` (`@typescript-eslint/no-explicit-any`) | Error |
| `npm run lint` | `app/components/SmoothScroll.tsx:24:16` | `Unexpected any. Specify a different type.` (`@typescript-eslint/no-explicit-any`) | Error |
| `npm run lint` | `app/fire-rated/page.tsx:37:5` | `Error: Calling setState synchronously within an effect can trigger cascading renders` (`react-hooks/set-state-in-effect`) | Error |
| `npm run lint` | `append.js:1:12` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `copy-products.js:1:12` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `copy-products.js:2:14` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `remove-radius-v2.js:1:12` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `remove-radius-v2.js:2:14` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `remove-radius.js:1:12` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `remove-radius.js:2:14` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `scratch-fix.js:1:12` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `scratch-fix.js:2:14` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `scratch/update_eyebrow.js:1:12` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `scratch/update_eyebrow.js:2:14` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `scratch/update_eyebrow.js:3:22` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `update_fonts.js:1:12` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `update_fonts.js:2:14` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `frontend/build/static/js/main.9dd355eb.js:2:130916` | `Component definition is missing display name` (`react/display-name`) | Error |
| `npm run lint` | `frontend/build/static/js/main.9dd355eb.js:2:153648` | `Unexpected aliasing of 'this' to local variable.` (`@typescript-eslint/no-this-alias`) | Error |
| `npm run lint` | `frontend/build/static/js/main.9dd355eb.js:2:273743` | `Unexpected aliasing of 'this' to local variable.` (`@typescript-eslint/no-this-alias`) | Error |
| `npm run lint` | `frontend/build/static/js/main.9dd355eb.js:2:373758` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `frontend/build/static/js/main.9dd355eb.js:2:512275` | `Unexpected aliasing of 'this' to local variable.` (`@typescript-eslint/no-this-alias`) | Error |
| `npm run lint` | `frontend/build/static/js/main.9dd355eb.js:2:513430` | `Unexpected aliasing of 'this' to local variable.` (`@typescript-eslint/no-this-alias`) | Error |
| `npm run lint` | `frontend/build/static/js/main.9dd355eb.js:2:513736` | `Unexpected aliasing of 'this' to local variable.` (`@typescript-eslint/no-this-alias`) | Error |
| `npm run lint` | `frontend/build/static/js/main.9dd355eb.js:2:547154` | `Unexpected aliasing of 'this' to local variable.` (`@typescript-eslint/no-this-alias`) | Error |
| `npm run lint` | `frontend/craco.config.js:2:14` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `frontend/craco.config.js:3:1` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `frontend/craco.config.js:67:25` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `frontend/craco.config.js:68:26` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `frontend/craco.config.js:134:33` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `frontend/plugins/health-check/health-endpoints.js:4:12` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |
| `npm run lint` | `frontend/src/components/BeforeAfter.jsx:25:131` | `Error: Cannot access refs during render` (`react-hooks/refs`) | Error |
| `npm run lint` | `frontend/src/components/BeforeAfter.jsx:25:140` | `Error: Cannot access refs during render` (`react-hooks/refs`) | Error |
| `npm run lint` | `frontend/src/components/BeforeAfter.jsx:25:140` | `Error: Cannot access refs during render` (`react-hooks/refs`) | Error |
| `npm run lint` | `frontend/src/components/BeforeAfter.jsx:25:140` | `Error: Cannot access refs during render` (`react-hooks/refs`) | Error |
| `npm run lint` | `frontend/src/components/Navbar.jsx:19:19` | `Error: Calling setState synchronously within an effect can trigger cascading renders` (`react-hooks/set-state-in-effect`) | Error |
| `npm run lint` | `frontend/src/components/home/Hero.jsx:14:13` | `Error: Cannot call impure function during render` (`react-hooks/purity`) | Error |
| `npm run lint` | `frontend/src/components/home/Hero.jsx:15:13` | `Error: Cannot call impure function during render` (`react-hooks/purity`) | Error |
| `npm run lint` | `frontend/src/components/home/Hero.jsx:16:13` | `Error: Cannot call impure function during render` (`react-hooks/purity`) | Error |
| `npm run lint` | `frontend/src/components/ui/carousel.jsx:79:5` | `Error: Calling setState synchronously within an effect can trigger cascading renders` (`react-hooks/set-state-in-effect`) | Error |
| `npm run lint` | `frontend/src/pages/NotFound.jsx:7:22` | `' can be escaped with &apos;, &lsquo;, &#39;, &rsquo;.` (`react/no-unescaped-entities`) | Error |
| `npm run lint` | `frontend/tailwind.config.js:55:15` | `A require() style import is forbidden.` (`@typescript-eslint/no-require-imports`) | Error |

---

## 3. Browser Console Errors & Warnings Table

Tested with headless Google Chrome (`155.0.8059.39`) at Desktop (`1440x900`) and Mobile (`390x844`) viewports.

### Console Errors

| Page | Viewport | Type | Message | Source |
| :--- | :--- | :--- | :--- | :--- |
| `http://localhost:3000/non-existent-page-404` | Desktop (1440px) | `error` | `Failed to load resource: the server responded with a status of 404 (Not Found)` | `http://localhost:3000/non-existent-page-404:0:0` |
| `http://localhost:3000/non-existent-page-404` | Mobile (390px) | `error` | `Failed to load resource: the server responded with a status of 404 (Not Found)` | `http://localhost:3000/non-existent-page-404:0:0` |

*Note: All 44 active application pages showed **0 console errors** and **0 uncaught exceptions** (`pageerror`).*

### High-Frequency Console Warnings

| Page | Viewport | Type | Message | Source |
| :--- | :--- | :--- | :--- | :--- |
| `/doors/[slug]` (All 6 door detail routes) | Desktop & Mobile (12 occurrences) | `warning` | `Route "/doors/[slug]" used "params.slug". "params" is a Promise and must be unwrapped with "await" or "React.use()" before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis` | `app/doors/[slug]/layout.tsx:5` (`generateMetadata`) |
| `/frames/[slug]` (All 9 frame detail routes) | Desktop & Mobile (18 occurrences) | `warning` | `Route "/frames/[slug]" used "params.slug". "params" is a Promise and must be unwrapped with "await" or "React.use()" before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis` | `app/frames/[slug]/layout.tsx:5` (`generateMetadata`) |
| All routes with Navbar | Desktop & Mobile (90 occurrences) | `warning` | `Image with src "http://localhost:3000/logo/logowithblacktext.svg" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.` | `app/components/Navbar.tsx` (`<Image />`) |
| All routes with Navbar | Desktop & Mobile (90 occurrences) | `warning` | `Image with src "http://localhost:3000/logo/micasawithtext.svg" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.` | `app/components/Navbar.tsx` (`<Image />`) |
| All routes | Desktop & Mobile (90 occurrences) | `warning` | `The resource http://localhost:3000/_next/static/chunks/app_0v43lpy._.css was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.` | Next.js Turbopack dev runtime link preload |
| `/doors`, `/frames` | Desktop (2 occurrences) | `warning` | `Image with src "..." has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes` | `app/doors/page.tsx`, `app/frames/page.tsx` |

---

## 4. Network Failures Table

| Page | URL | Status | Likely Cause |
| :--- | :--- | :---: | :--- |
| `/` (Desktop) | `https://images.unsplash.com/photo-1613490908592-fd114ddacbe1?q=80&w=800&auto=format&fit=crop` | `net::ERR_BLOCKED_BY_ORB` (Upstream HTTP 404) | Unsplash deleted/moved photo ID `photo-1613490908592-fd114ddacbe1`. Server returns 404 HTML body, which Chrome blocks from rendering in `<img>` via Opaque Response Blocking. |
| `/` (Desktop) | `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop` | `net::ERR_BLOCKED_BY_ORB` (Upstream HTTP 404) | Unsplash deleted/moved photo ID `photo-1523050854058-8df90110c9f1`. Server returns 404 HTML body, which Chrome blocks from rendering in `<img>` via Opaque Response Blocking. |
| `/` (Mobile) | `https://images.unsplash.com/photo-1613490908592-fd114ddacbe1?q=80&w=800&auto=format&fit=crop` | `net::ERR_BLOCKED_BY_ORB` (Upstream HTTP 404) | Same as above. |
| `/` (Mobile) | `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop` | `net::ERR_BLOCKED_BY_ORB` (Upstream HTTP 404) | Same as above. |

---

## 5. Root Cause Analysis & Suggested Fixes

### Issue 1: Broken Unsplash Images on Home Page (404 / ORB Blocked)
- **Suspected Root Cause:** **Confirmed.** In `app/components/ApplicationsSection.tsx`, lines 12 and 14 hardcode two Unsplash URLs:
  - `photo-1523050854058-8df90110c9f1` ("Institutional")
  - `photo-1613490908592-fd114ddacbe1` ("Luxury Villas")  
  Both remote URLs return HTTP 404 from Unsplash/Imgix. Because the response content-type is `text/html` instead of an image MIME type, Chrome triggers `CORB/ORB` (`net::ERR_BLOCKED_BY_ORB`), causing broken image icons on the home page.
- **Suggested Fix:** Replace the two dead Unsplash photo IDs in `APPS` within `app/components/ApplicationsSection.tsx` with valid active Unsplash architectural photos or local assets in `/public`.

---

### Issue 2: Next.js 15/16 Synchronous Dynamic API Access in Metadata
- **Suspected Root Cause:** **Confirmed.** In Next.js 15+, dynamic route `params` are passed as Promises to page and layout handlers. While `app/doors/[slug]/page.tsx` properly unwraps `params` with `React.use(params)`, `app/doors/[slug]/layout.tsx` (line 4-5) and `app/frames/[slug]/layout.tsx` (line 4-5) access `params.slug` synchronously:
  ```tsx
  export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const door = DOORS.find((d) => d.slug === params.slug);
  ```
  This triggers 30 runtime warnings in Next.js Turbopack development mode and will become a fatal error in upcoming Next.js releases.
- **Suggested Fix:** Make `generateMetadata` in both `app/doors/[slug]/layout.tsx` and `app/frames/[slug]/layout.tsx` `async`, type `params` as `Promise<{ slug: string }>`, and unwrap with `const { slug } = await params;` before lookup.

---

### Issue 3: Linter Failure Due to Unfiltered Project Scope
- **Suspected Root Cause:** **Confirmed.** `eslint.config.mjs` only ignores `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`. It does not ignore:
  1. The `frontend/` directory (an archived CRACO/CRA application with 1,453 warnings and 25 errors).
  2. Standalone root scripts (`append.js`, `copy-products.js`, `remove-radius*.js`, `scratch-fix.js`, `update_fonts.js`).
  3. The `scratch/` directory.  
  As a result, `npm run lint` fails with 49 errors.
- **Suggested Fix:** Add `"frontend/**"`, `"scratch/**"`, and `*.js` (or specific root utility scripts) to `globalIgnores` in `eslint.config.mjs`.

---

### Issue 4: Active Next.js Codebase Linting Violations (10 Errors)
- **Suspected Root Cause:** **Confirmed.**
  1. **Synchronous `setState` in `useEffect`:** In `app/components/Hero.tsx:44` and `app/fire-rated/page.tsx:37`, `setState` is called directly in the body of a `useEffect`, violating React 19 / ESLint compiler guidelines (`react-hooks/set-state-in-effect`).
  2. **Forbidden `any` types:** `app/api/contact/route.ts:71` (`catch (error: any)`), `app/components/Navbar.tsx:70,74`, `app/components/ProjectsSection.tsx:43`, and `app/components/SmoothScroll.tsx:24` use explicit `any` instead of unknown, typed interfaces, or specific event/library types.
  3. **Banned `@ts-ignore`:** In `app/components/CallToActionSection.tsx:231`, `@ts-ignore` is used instead of `@ts-expect-error`.
- **Suggested Fix:**
  - In `app/api/contact/route.ts`: Change `catch (error: any)` to `catch (error: unknown)`.
  - In `app/components/CallToActionSection.tsx`: Replace `// @ts-ignore` with `// @ts-expect-error`.
  - In `app/components/Hero.tsx` & `app/fire-rated/page.tsx`: Refactor effect state initialization to avoid synchronous cascading renders or wrap in animation request/timing callback.
  - In `Navbar.tsx`, `ProjectsSection.tsx`, and `SmoothScroll.tsx`: Replace `any` with proper GSAP / Lucide / Lenis types.

---

### Issue 5: Disconnected Contact Form Submission
- **Suspected Root Cause:** **Confirmed.** `app/api/contact/route.ts` implements a full Resend email dispatch endpoint with Zod schema validation. However, `app/components/ContactFormSection.tsx` handles form submit with:
  ```tsx
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };
  ```
  It does not make a `fetch("/api/contact", { method: "POST", ... })` call, so user submissions are never transmitted to the backend.
- **Suggested Fix:** Implement an asynchronous `fetch` call to `/api/contact` inside `handleSubmit`, handling loading, error, and success states properly.

---

### Issue 6: Next.js Logo Image Aspect Ratio Warnings
- **Suspected Root Cause:** **Confirmed.** In `app/components/Navbar.tsx`, Next `<Image />` tags for `logowithblacktext.svg` and `micasawithtext.svg` have explicit width and height props, but CSS overrides one dimension without specifying `height: "auto"` or `width: "auto"`.
- **Suggested Fix:** Add `style={{ width: "auto" }}` or `style={{ height: "auto" }}` on the `<Image />` component or adjust Navbar CSS module rules.

---

## 6. Prioritized Issue List

### Priority: Critical (Breaks Build, CI, or Live Functionality)
1. **Linter Gate Failure (`npm run lint` exits with code 1):** Breaks automated CI/CD pipelines.
2. **Broken Unsplash Images on Home Page (`ApplicationsSection`):** High-visibility visual defect on the primary landing page.
3. **Disconnected Contact Form:** Functional defect where customer enquiries submitted through the UI are silently dropped without being sent to the server.

### Priority: High (Future Breaking / Deprecation Issues)
4. **Synchronous Dynamic Route `params` in `layout.tsx` (`/doors/[slug]` and `/frames/[slug]`):** Next.js 15+ deprecation that will throw fatal runtime exceptions in upcoming Next.js releases.
5. **Security Vulnerabilities in Dependencies:** `npm audit` reports 9 vulnerabilities (8 high, 1 critical) in transitive dependencies (notably `cross-spawn` and `nanoid` from legacy subtrees).

### Priority: Medium (Code Quality & React Best Practices)
6. **React 19 Cascading Render Warnings:** Synchronous `setState` in `Hero.tsx` and `fire-rated/page.tsx` effects.
7. **TypeScript `any` and `@ts-ignore` Violations in `app/`:** 8 lint errors violating strict TypeScript rules.

### Priority: Low (Performance & Minor Console Noise)
8. **Next.js Logo Aspect Ratio Warnings in Navbar:** Minor styling attribute optimization.
9. **Missing `sizes` Prop on Fill Images in `/doors` and `/frames`:** Recommended for optimal responsive image delivery.
10. **ESLint 9 Deprecation Notice:** Standard package maintenance.

---

## 7. Not Verified Section

The following areas could not be tested and the reasons are documented below:
1. **Third-Party Email Delivery to Inbox:** While `POST /api/contact` was verified directly and returned `{ success: true, data: { id: "..." } }` from the live Resend API, actual inbox receipt at `support@micasadoor.com` could not be verified without access to the recipient mailbox.
2. **Device Hardware Sensors / Sound Autoplay Policy on Real Mobile Hardware:** Mobile testing was conducted via Chrome mobile emulation (`390x844`, iPhone user agent). Mobile browser autoplay restrictions for Web Audio API (`doorSound.ts`) require physical device touch interaction.
3. **Legacy `frontend/` CRACO Application Runtime:** The project has an archived Create React App / CRACO setup in the `frontend/` directory. Only the active root Next.js application was started and audited in the browser, as `frontend/` appears to be a superseded prior version.
