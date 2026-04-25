# ASEANWebTech_Task4
Server-Side Task

Create a web application to help generate certificates for printing using a template and download a PDF file. 

You can use any framework to choose from: with or without using the API. 

You need to add your own functions (using AI) that are different from the example shown in the meeting. 

It is allowed to use this project to take credit for previous classes, but subject to the development of a separate design and layout.

In the report, you must specify the prompt used and which features have been added.

# Certificate Generator - React + Vite

A complete, fully-functional certificate generator web application built with React and Vite. Generate beautiful, professional certificates and download them as PDF files directly from your browser—no backend required!

## Features

### Core Features
✅ **Single Certificate Generation**
- Enter recipient name, course/event name, date, and custom message
- Live preview while typing
- Two professional certificate templates (Classic Gold & Modern Blue)
- Upload signature image to display on certificate
- Download certificate as PDF with A4 landscape format

### Advanced Features
✅ **Batch Certificate Generator**
- Generate multiple certificates at once
- Input names (one per line)
- Common course name and date for all certificates
- Download all certificates in one action (with automatic delays between downloads)

✅ **Template Selection**
- **Classic Gold**: Elegant serif design with gold accents
- **Modern Blue**: Clean sans-serif design with blue gradients

✅ **Signature Upload**
- Upload signature image for any certificate
- Works with PNG, JPG, GIF, and other image formats
- Displays in preview and exports to PDF

✅ **Form Validation**
- Recipient name is required (download disabled if empty)
- Clear error messages
- All other fields are optional

✅ **Responsive Design**
- Desktop optimized (split layout: form + preview)
- Tablet responsive (stacked layout)
- Mobile friendly

## Project Structure

```
cert-app/
├── src/
│   ├── App.jsx                 # Main app component with tab switching
│   ├── App.css                 # App styling and layout
│   ├── CertificateForm.jsx     # Form component for certificate details
│   ├── CertificatePreview.jsx  # Preview and PDF export component
│   ├── BatchGenerator.jsx      # Batch certificate generator
│   ├── index.css               # Global styles
│   ├── main.jsx                # React entry point
│   └── assets/                 # Static assets
├── public/                     # Public files
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Technical Details

### Dependencies
- **React 19.2.5**: UI framework with functional components and hooks
- **React DOM 19.2.5**: React rendering
- **html2canvas 1.4.1**: Converts DOM elements to canvas (for PDF export)
- **jsPDF 2.5.1**: Generates PDF files
- **Vite 8.0.10**: Fast build tool and dev server

### Component Architecture

**App.jsx** (Main)
- Manages form data state
- Switches between Single Certificate and Batch Generator views
- Props down to child components

**CertificateForm.jsx** (Form)
- Captures user input:
  - Template selection
  - Recipient name (required)
  - Course/Event name
  - Date picker
  - Custom message
  - Signature image upload
- Updates parent state via `setFormData`

**CertificatePreview.jsx** (Preview)
- Displays certificate preview based on template type
- `CertificateTemplate` sub-component renders actual certificate
- Handles PDF export using html2canvas + jsPDF
- Shows validation errors
- Loading state during PDF generation

**BatchGenerator.jsx** (Batch)
- Form for multiple names (textarea)
- Common course name and date
- Generates preview grid of certificates
- Downloads all PDFs sequentially with delays
- Full integration with both templates and signature uploads

### State Management
All state managed with `useState` hook only:
- Form data (recipientName, courseName, date, message, template, signatureImage)
- Form errors
- Loading states for PDF export
- Batch preview data

## How to Use

### Single Certificate
1. Select a certificate template (Classic Gold or Modern Blue)
2. Enter the recipient's name (required)
3. Optionally add course/event name
4. Optionally pick a date (today by default)
5. Optionally add a custom message
6. Optionally upload a signature image
7. Watch the preview update in real-time
8. Click **Download PDF** to export as A4 landscape PDF

### Batch Generator
1. Click the "Batch Generator" tab
2. Enter names (one per line) in the textarea
3. Enter a common course/event name (applies to all)
4. Pick a date (applies to all)
5. Optionally add a custom message (applies to all)
6. Click **Generate Previews** to see all certificates
7. Click **Download All** to download all certificates
   - Downloads occur with small delays to prevent browser blocking
   - File names include recipient names

## Installation & Setup

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Quick Start
```bash
# Install dependencies
npm install

# Start development server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview
```

The app will open at `http://localhost:5173` (default Vite port)

## Certificate Templates

### Classic Gold Template
- **Style**: Elegant, traditional
- **Font**: Georgia serif
- **Colors**: Gold (#d4af37), Brown (#8b4513), Cream background
- **Layout**: Centered with decorative border
- **Perfect for**: Academic achievements, formal certifications

### Modern Blue Template
- **Style**: Contemporary, clean
- **Font**: Helvetica sans-serif
- **Colors**: Blue (#1976d2), gradient header
- **Layout**: Minimalist, centered
- **Perfect for**: Corporate training, online courses, tech certifications

## PDF Export Details

- **Format**: A4 landscape (297mm × 210mm)
- **Quality**: High resolution (2x scale for crisp output)
- **Contents**: Certificate only (form UI not included)
- **File Name**: `certificate_[RecipientName].pdf`
- **Batch Format**: Each certificate exports as separate PDF

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Older browsers may not support all features

## Features Not Included (As Requested)

- ❌ No backend server required
- ❌ No database or storage
- ❌ No API calls (no axios, no fetch)
- ❌ No authentication/login
- ❌ No installation steps
- ❌ Completely client-side

## Customization

### Change Default Template
Edit in `App.jsx`:
```javascript
template: 'modern'  // or 'classic'
```

### Change Colors
Edit template styles in component files (inline styles at bottom of each component)

### Add New Certificate Template
1. Create new template component in component file
2. Add conditional rendering based on template prop
3. Update template dropdown in CertificateForm

## Known Limitations

- Large signature images may impact PDF file size
- Very long custom messages may overlap on small preview (works fine in PDF)
- Batch generator preview grid may be slow with 100+ certificates (>30 should be fine)

## License

This project is provided as-is for educational and professional use.

---

**Built with React + Vite • No Backend Required • 100% Frontend**
