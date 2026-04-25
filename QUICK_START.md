# 🚀 QUICK START GUIDE

## Certificate Generator - Get Started in 60 Seconds

### Prerequisites
- Node.js 16+ installed
- npm or yarn available

### Installation (One Time)

```bash
# Navigate to project folder
cd c:\dev\cert-app

# Install dependencies (one time only)
npm install
```

This downloads React, html2canvas, jsPDF, and other libraries.

### Run the App

```bash
npm run dev
```

The app opens automatically at: **http://localhost:5173**

### Stop the App

Press `Ctrl + C` in the terminal

---

## 📝 HOW TO USE

### Creating a Single Certificate

1. **Select Template** (top left)
   - Choose "Classic Gold" or "Modern Blue"
   - Preview updates instantly

2. **Enter Details** (form on left)
   - **Name*** (required) - e.g., "John Smith"
   - Course - e.g., "React Development"
   - Date - Pick from calendar
   - Message - Optional custom text
   - Signature - Upload image file

3. **Review Preview** (right side)
   - See certificate update in real-time
   - Check everything looks correct

4. **Download PDF**
   - Click "📥 Download PDF" button
   - File saves as: `certificate_John_Smith.pdf`

### Creating Batch Certificates

1. **Click "Batch Generator" Tab** (top)

2. **Enter Names** (textarea)
   ```
   John Smith
   Jane Doe
   Bob Johnson
   ```

3. **Common Details**
   - Course: "Web Development Bootcamp"
   - Date: "April 25, 2024"
   - Message: (optional)

4. **Generate & Download**
   - Click "👁️ Generate Previews"
   - See all certificates
   - Click "📥 Download All"
   - Each PDF downloads automatically

---

## 💡 TIPS

- The name field is **required** to download
- Try both templates to see which you prefer
- Custom messages appear on the certificate
- Signature images should be PNG or JPG (under 1MB)
- Batch generator works with up to 100+ names

---

## 🛠️ DEVELOPMENT

### Edit Code
Files are in: `src/`
- `App.jsx` - Main layout
- `CertificateForm.jsx` - Input form
- `CertificatePreview.jsx` - Certificate display + export
- `BatchGenerator.jsx` - Batch mode
- `App.css` - Styling

Changes auto-reload (HMR) - just save and refresh!

### Build for Production

```bash
npm run build
```

Creates optimized files in `dist/` folder

### Preview Production Build

```bash
npm run preview
```

---

## 📱 Works On

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (partial - forms stack vertically)

---

## ❓ COMMON QUESTIONS

**Q: Does it need internet?**
A: No! Everything runs in your browser. No backend needed.

**Q: Where are certificates stored?**
A: They're only in the PDF you download. Nothing is stored on a server.

**Q: Can I customize templates?**
A: Yes! Edit styling in the component files. Colors, fonts, text are all customizable.

**Q: Does it work offline?**
A: Yes, after initial load. But you need npm to run development mode.

**Q: How many certificates can I batch?**
A: Tested up to 100+. System may slow down with 500+.

---

## 🔧 TROUBLESHOOTING

**PDF downloads blank?**
- Check if name field has text
- Try refreshing the page
- Clear browser cache

**App won't start?**
```bash
# Make sure you're in the right folder
cd c:\dev\cert-app

# Delete node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

**Dependencies not found?**
```bash
npm install
npm install html2canvas jspdf
```

---

## 📚 FILE LOCATIONS

| What | Where |
|------|-------|
| Form component | `src/CertificateForm.jsx` |
| Preview/export | `src/CertificatePreview.jsx` |
| Batch mode | `src/BatchGenerator.jsx` |
| Main layout | `src/App.jsx` |
| Styling | `src/App.css`, `src/index.css` |
| Documentation | `README.md` |

---

## 🎨 CUSTOMIZATION EXAMPLES

### Change Default Template
In `src/App.jsx`, line 13:
```javascript
template: 'modern'  // Change to 'classic' or 'modern'
```

### Change Colors in Classic Template
In `src/CertificatePreview.jsx`, find `classicDecoration` style:
```javascript
color: '#d4af37'  // Change to your color
```

### Change Certificate Title
In `src/CertificatePreview.jsx`, line 11:
```javascript
<h1 style={styles.classicTitle}>Your Title Here</h1>
```

---

## 📞 SUPPORT RESOURCES

- **Full Documentation**: `README.md`
- **Implementation Details**: `IMPLEMENTATION.md`
- **Requirements Checklist**: `CHECKLIST.md`
- **React Docs**: https://react.dev
- **Vite Docs**: https://vite.dev

---

## ✅ YOU'RE ALL SET!

Your Certificate Generator is ready to use. 

**Next Steps:**
1. Run `npm install` (if not done)
2. Run `npm run dev`
3. Open http://localhost:5173
4. Create your first certificate!

Happy certificate generating! 🎓
