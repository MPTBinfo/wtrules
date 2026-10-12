# MP Water Tourism Rules & Permission Guide

Bilingual (Hindi-English) Next.js guide for the Madhya Pradesh water-tourism permission process. It brings together the policy/SOP-style reading experience, notified waterbody list, activity-fee calculator, forms, LOA formats, compliance and safety guidance.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

Production verification:

```bash
npm run build
npm start
```

## Important content and operations notes

- Treat the displayed process, fee figures, notified waterbody list, emergency numbers and form links as the content currently encoded in this app. Before official publication, verify each item against the currently approved Government of Madhya Pradesh / MPTB document and its effective date.
- The activity-fee calculator uses activity-specific base amounts in the page source and adds 18% GST. It is an informational estimate, not a payment demand. Confirm the current approved fee schedule before relying on it.
- Post-LOA upload fields are currently a visual form only; this application does not yet securely upload or persist documents.
- The vendor form link points to a PDF in the public folder. Confirm that the document is the current approved version before publication.
- The app currently uses Next.js 15.2.4. Upgrade to a patched supported release after regenerating package-lock.json and confirming a successful build. Do not deploy an untested major-version upgrade.

## Maintenance

Changes should preserve the Hindi-English content and distinguish official policy text from explanatory UI. Do not invent or silently update government fees, validity periods, emergency contacts or statutory requirements.