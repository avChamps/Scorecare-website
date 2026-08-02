# ScoreCare Website Documentation

## Project Overview

ScoreCare is a public-facing Next.js website for Scoresathi Technologies Pvt. Ltd. The website promotes the ScoreCare credit score application, explains credit score education, highlights product benefits, provides legal policy pages, and allows users to submit contact enquiries.

Live domain configured in the project:

```text
https://scorecareapp.com
```

## Technology Stack

```text
Frontend Framework: Next.js 16.2.9
UI Library: React 19.2.4
Language: TypeScript
Styling: Tailwind CSS 4
Icons: @tabler/icons-react
PDF Rendering: pdfjs-dist
Build Output: Static export
```

## Main Features

```text
Homepage
- Responsive navigation with desktop and mobile menus
- Hero section with ScoreCare positioning and app download CTA
- Credit score education section
- Score range explanation from 300 to 900
- Credit score factor breakdown
- ScoreCare benefits section
- How it works section
- About Scoresathi Technologies section
- Policies and legal links
- FAQs
- Contact section with dynamic contact details
- Contact enquiry form with client-side validation
- Success confirmation modal after enquiry submission

Legal Pages
- Privacy Policy
- Terms and Conditions
- Disclaimer
- Account Deletion
- Legal documents are fetched dynamically from backend website settings
- PDF content is parsed and displayed as readable website content
- Section navigation is generated from parsed PDF headings

SEO
- Metadata configured for main and legal pages
- Canonical URLs configured
- Sitemap generated
- Robots configuration generated
- Google Analytics supported through environment variable
```

## Website Routes

```text
/                         Homepage
/privacy-policy           Privacy Policy
/terms-and-conditions     Terms and Conditions
/disclaimer               Disclaimer
/account-deletion         Account Deletion
/sitemap.xml              Sitemap
/robots.txt               Robots file
```

## External API Usage

Base API URL:

```text
https://scorecareapp.com/api
```

API endpoints used by the website:

```text
GET /general
- Used to load website contact details.
- Expected data includes website, email, mobile number, WhatsApp number, address, prompt message, selected language, and updated date.

POST /contact
- Used to submit contact form enquiries.
- Payload includes first name, last name, email address, and message.

GET /website-settings
- Used to load legal document PDF URLs.
- Expected data includes privacyPolicy, termsOfService, disclaimer, accountDeletion, and updatedAt.
```

## App Download Link

The current download CTA points to:

```text
https://play.google.com/apps/internaltest/4701307504694712853
```

This URL is used for both App Store and Google Play CTA badges in the current implementation.

## Static Export Configuration

The project is configured for static export:

```ts
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
};
```

Generated static files are output to:

```text
out/
```

## Environment Variables

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

Purpose:

```text
Enables Google Analytics tracking when provided.
If not provided, Google Analytics scripts are not rendered.
```

## Key Project Files

```text
app/page.tsx
- Main homepage UI and contact form logic.

app/layout.tsx
- Root layout, global fonts, metadata, and optional Google Analytics scripts.

app/api/api.ts
- API base URL and app download URL constants.

app/legal-page-shell.tsx
- Shared layout for all legal pages.

app/legal-document.tsx
- Fetches legal PDF URLs, loads PDFs, parses text, and renders legal content.

app/privacy-policy/page.tsx
- Privacy Policy route metadata and shell.

app/terms-and-conditions/page.tsx
- Terms and Conditions route metadata and shell.

app/disclaimer/page.tsx
- Disclaimer route metadata and shell.

app/account-deletion/page.tsx
- Account Deletion route metadata and shell.

app/sitemap.ts
- Static sitemap configuration.

app/robots.ts
- Robots and sitemap host configuration.

app/globals.css
- Tailwind import, theme variables, global styles, and score meter animation.

assets/
- Website images and app store badges.
```

## Contact Form Validation

```text
First name: Required
Last name: Required
Email address: Required and must be valid email format
Message: Required and minimum 10 characters
```

If submission succeeds, the website resets the form and shows a success modal. If submission fails, an error alert is displayed.

## Legal Document Flow

```text
1. Website calls GET /website-settings.
2. Website reads the selected legal PDF URL from the response.
3. Website fetches the PDF.
4. pdfjs-dist extracts text content from each PDF page.
5. Parsed headings and paragraphs are rendered in the legal page layout.
6. A side navigation is generated from detected document headings.
```

## Client Handover Notes

```text
- Website content is mostly static inside the frontend.
- Contact details are dynamic and controlled by the backend /general endpoint.
- Legal policy documents are dynamic and controlled by the backend /website-settings endpoint.
- Google Analytics can be enabled by setting NEXT_PUBLIC_GA_MEASUREMENT_ID.
- The app download URL is currently configured in app/api/api.ts.
- Since the site is statically exported, deployment should serve the generated out/ directory.
```

## Current Limitations

```text
- App Store CTA currently uses the same URL as the Google Play CTA.
- Some policy cards on the homepage do not have dedicated pages yet and fall back to #.
- Legal page display depends on valid PDF URLs returned by the backend.
- Contact section depends on the /general API response.
```
