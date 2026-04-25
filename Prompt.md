# Prompt
Create a complete React (Vite) web app for generating printable certificates and downloading them as PDF.

IMPORTANT — SKIP THESE:
- Do NOT use any backend
- Do NOT use any API (no axios, no fetch)
- Do NOT include authentication/login
- Do NOT include database or storage
- Do NOT include terminal/installation steps
- Do NOT overcomplicate the project

Everything must run fully on the frontend.

Core Features:

1. Form Inputs:
- Recipient Name (required)
- Course/Event Name
- Date
- Custom Message

2. Certificate Preview:
- Landscape certificate layout
- Show:
  - Title: "Certificate of Completion"
  - Recipient Name (large font)
  - Course/Event Name
  - Date
  - Signature area
- Live update when typing

3. PDF Export:
- Button: "Download PDF"
- Export ONLY the certificate (not the UI)
- Use html2canvas + jsPDF
- A4 landscape format

4. Extra Features (important for grading):
- Template selector (at least 2 different certificate styles)
- Upload signature image and display it in preview
- Batch generator:
  - Input multiple names (textarea or comma-separated)
  - Generate multiple certificates

5. Validation:
- Disable download if name is empty
- Show simple error message

6. UI/UX:
- Split layout:
  - Left = form
  - Right = preview
- Clean, minimal, professional design
- Responsive layout

7. Code Requirements:
- Use React functional components
- Use useState only (keep it simple)
- Keep components modular

Output:
- Full project structure
- All React components
- Clear file names and where each file goes
- Complete working code (no placeholders)
