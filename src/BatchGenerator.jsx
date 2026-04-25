import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function BatchCertificate({ template, index, name, signatureImage, date, courseName, message }) {
  if (template === 'classic') {
    return (
      <div style={batchStyles.classicCertificate}>
        <div style={batchStyles.classicBorder}>
          <div style={batchStyles.classicContent}>
            <div style={batchStyles.classicDecoration}>✓</div>
            <h1 style={batchStyles.classicTitle}>Certificate of Completion</h1>
            <div style={batchStyles.classicDivider}></div>
            <p style={batchStyles.classicSubtext}>This is proudly presented to</p>
            <h2 style={batchStyles.classicName}>{name}</h2>
            <p style={batchStyles.classicText}>for successfully completing</p>
            <h3 style={batchStyles.classicCourse}>{courseName}</h3>
            {message && <p style={batchStyles.classicMessage}>{message}</p>}
            <div style={batchStyles.classicFooter}>
              <div style={batchStyles.signatureBlock}>
                {signatureImage ? (
                  <img
                    src={signatureImage}
                    alt="Signature"
                    style={batchStyles.signatureImage}
                  />
                ) : (
                  <div style={batchStyles.signatureLine}></div>
                )}
                <p style={{ fontSize: '6px', margin: '1px 0 0 0', color: '#333' }}>Authorized Signature</p>
              </div>
            </div>
            <p style={batchStyles.classicDate}>{date}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={batchStyles.modernCertificate}>
      <div style={batchStyles.modernHeader}></div>
      <div style={batchStyles.modernContent}>
        <h1 style={batchStyles.modernTitle}>Certificate of Achievement</h1>
        <p style={batchStyles.modernSubtext}>proudly awarded to</p>
        <h2 style={batchStyles.modernName}>{name}</h2>
        <p style={batchStyles.modernText}>For outstanding achievement in</p>
        <h3 style={batchStyles.modernCourse}>{courseName}</h3>
        {message && <p style={batchStyles.modernMessage}>{message}</p>}
        <div style={batchStyles.modernFooter}>
          <div>
            {signatureImage ? (
              <img
                src={signatureImage}
                alt="Signature"
                style={batchStyles.modernSignatureImage}
              />
            ) : (
              <div style={batchStyles.modernSignatureLine}></div>
            )}
            <p style={batchStyles.modernLabel}>Authorized Signature</p>
          </div>
          <div>
            <p style={batchStyles.modernDateText}>{date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BatchGenerator({ template, signatureImage }) {
  const [names, setNames] = useState('')
  const [courseName, setCourseName] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [batchSignatureImage, setBatchSignatureImage] = useState(null)
  const [previews, setPreviews] = useState([])
  const [error, setError] = useState('')
  const [generating, setGenerating] = useState(false)
  const certificateRefs = useRef([])

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBatchSignatureImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearBatchSignature = () => {
    setBatchSignatureImage(null)
  }

  const handleGeneratePreviews = () => {
    setError('')
    const nameList = names
      .split('\n')
      .map(n => n.trim())
      .filter(n => n.length > 0)

    if (nameList.length === 0) {
      setError('Please enter at least one name')
      return
    }

    const parsedDate = date ? new Date(date).toLocaleDateString() : '[Date]'
    setPreviews(nameList.map((name, i) => ({
      id: i,
      name,
      courseName: courseName || '[Course Name]',
      date: parsedDate,
      message
    })))
  }

  const handleDownloadAll = async () => {
    if (previews.length === 0) {
      setError('Generate previews first')
      return
    }

    setGenerating(true)
    setError('')

    try {
      for (let i = 0; i < certificateRefs.current.length; i++) {
        const canvas = await html2canvas(certificateRefs.current[i], {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true
        })

        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        })

        const imgData = canvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210)

        const fileName = `certificate_${previews[i].name.replace(/\s+/g, '_')}.pdf`
        pdf.save(fileName)

        // Add a small delay between downloads to prevent browser blocking
        await new Promise(r => setTimeout(r, 100))
      }
    } catch (err) {
      setError('Failed to download PDFs. Please try again.')
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div style={batchStyles.batchContainer}>
      <div style={batchStyles.batchFormSection}>
        <h2>Batch Certificate Generator</h2>
        <p style={batchStyles.instruction}>
          Enter names (one per line) to generate multiple certificates
        </p>

        <div style={batchStyles.formGroup}>
          <label htmlFor="batch-names">Names (one per line) <span style={{ color: '#d32f2f' }}>*</span></label>
          <textarea
            id="batch-names"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="John Smith&#10;Jane Doe&#10;Bob Johnson"
            style={batchStyles.textarea}
            rows="6"
          />
        </div>

        <div style={batchStyles.formGroup}>
          <label htmlFor="batch-course">Course/Event Name</label>
          <input
            id="batch-course"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g., Advanced React Development"
            style={batchStyles.input}
          />
        </div>

        <div style={batchStyles.formGroup}>
          <label htmlFor="batch-date">Date</label>
          <input
            id="batch-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={batchStyles.input}
          />
        </div>

        <div style={batchStyles.formGroup}>
          <label htmlFor="batch-message">Custom Message</label>
          <textarea
            id="batch-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Optional message for all certificates"
            style={batchStyles.textarea}
            rows="3"
          />
        </div>

        <div style={batchStyles.formGroup}>
          <label>Signature Image</label>
          <div style={batchStyles.uploadArea}>
            <input
              type="file"
              accept="image/*"
              onChange={handleSignatureUpload}
              style={batchStyles.fileInput}
              id="batch-signature-input"
            />
            <label htmlFor="batch-signature-input" style={batchStyles.fileLabel}>
              📎 Choose Image
            </label>
          </div>
          {batchSignatureImage && (
            <div style={batchStyles.signaturePreview}>
              <p style={{ margin: 0, fontSize: '14px' }}>✓ Signature uploaded</p>
              <button
                type="button"
                onClick={clearBatchSignature}
                style={batchStyles.removeBtn}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div style={batchStyles.buttonGroup}>
          <button
            onClick={handleGeneratePreviews}
            style={batchStyles.generateBtn}
          >
            👁️ Generate Previews
          </button>
          <button
            onClick={handleDownloadAll}
            disabled={previews.length === 0 || generating}
            style={{
              ...batchStyles.downloadAllBtn,
              opacity: previews.length === 0 || generating ? 0.6 : 1,
              cursor: previews.length === 0 || generating ? 'not-allowed' : 'pointer'
            }}
          >
            {generating ? '⏳ Downloading...' : `📥 Download All (${previews.length})`}
          </button>
        </div>

        {error && <div style={batchStyles.errorMessage}>{error}</div>}
      </div>

      <div style={batchStyles.previewsSection}>
        <h3>Previews ({previews.length})</h3>
        <div style={batchStyles.previewsGrid}>
          {previews.map((preview, index) => (
            <div
              key={preview.id}
              ref={(el) => certificateRefs.current[index] = el}
              style={{
                ...batchStyles.certificateWrapper,
                backgroundColor: template === 'classic' ? '#fff8e1' : '#f0f7ff'
              }}
            >
              <BatchCertificate
                template={template}
                index={preview.id}
                name={preview.name}
                signatureImage={batchSignatureImage}
                date={preview.date}
                courseName={preview.courseName}
                message={preview.message}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const batchStyles = {
  batchContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    padding: '30px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  batchFormSection: {
    backgroundColor: '#f5f5f5',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    height: 'fit-content',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  instruction: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    marginTop: '6px'
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'monospace',
    marginTop: '6px',
    resize: 'vertical'
  },
  uploadArea: {
    marginTop: '6px',
    position: 'relative'
  },
  fileInput: {
    display: 'none'
  },
  fileLabel: {
    display: 'block',
    padding: '10px',
    border: '2px dashed #1976d2',
    borderRadius: '4px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#e3f2fd',
    transition: 'all 0.2s'
  },
  signaturePreview: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#c8e6c9',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  removeBtn: {
    padding: '6px 12px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.2s'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  generateBtn: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  downloadAllBtn: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  errorMessage: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '4px',
    fontSize: '14px'
  },
  previewsSection: {
    backgroundColor: '#f5f5f5',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  previewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  certificateWrapper: {
    padding: '15px',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'visible',
    minHeight: '250px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Classic styles
  classicCertificate: {
    width: '100%',
    height: '180px',
    backgroundColor: '#fff8e1',
    padding: '12px',
    boxSizing: 'border-box',
    fontFamily: 'Georgia, serif',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '10px'
  },
  classicBorder: {
    border: '3px solid #d4af37',
    padding: '15px',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  classicContent: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  classicDecoration: {
    fontSize: '14px',
    marginBottom: '2px',
    color: '#d4af37'
  },
  classicTitle: {
    fontSize: '12px',
    color: '#8b4513',
    margin: '0',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  classicDivider: {
    width: '60px',
    height: '1px',
    backgroundColor: '#d4af37',
    margin: '3px auto'
  },
  classicSubtext: {
    fontSize: '7px',
    color: '#333',
    margin: '0',
    fontStyle: 'italic'
  },
  classicName: {
    fontSize: '11px',
    color: '#8b4513',
    margin: '2px 0',
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  classicText: {
    fontSize: '6px',
    color: '#333',
    margin: '1px 0'
  },
  classicCourse: {
    fontSize: '7px',
    color: '#d4af37',
    margin: '1px 0',
    fontWeight: 'bold'
  },
  classicMessage: {
    fontSize: '5px',
    color: '#555',
    margin: '1px 0'
  },
  classicFooter: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '3px',
    width: '100%'
  },
  classicDate: {
    fontSize: '5px',
    color: '#666',
    margin: '2px 0 0 0'
  },
  signatureBlock: {
    width: '40px',
    textAlign: 'center'
  },
  dateBlock: {
    width: '40px',
    textAlign: 'center'
  },
  signatureLine: {
    borderBottom: '1px solid #333',
    marginBottom: '1px',
    height: '10px'
  },
  signatureImage: {
    maxHeight: '15px',
    maxWidth: '40px',
    marginBottom: '1px'
  },

  // Modern styles
  modernCertificate: {
    width: '100%',
    height: '180px',
    backgroundColor: '#f0f7ff',
    padding: '0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '10px'
  },
  modernHeader: {
    height: '6px',
    background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)'
  },
  modernContent: {
    flex: 1,
    padding: '8px 10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center'
  },
  modernTitle: {
    fontSize: '12px',
    color: '#1565c0',
    margin: '0',
    fontWeight: 'bold'
  },
  modernSubtext: {
    fontSize: '6px',
    color: '#666',
    margin: '0',
    textTransform: 'uppercase'
  },
  modernName: {
    fontSize: '10px',
    color: '#1976d2',
    margin: '0',
    fontWeight: 'bold'
  },
  modernText: {
    fontSize: '6px',
    color: '#555',
    margin: '0'
  },
  modernCourse: {
    fontSize: '7px',
    color: '#1976d2',
    margin: '0',
    fontWeight: 'bold'
  },
  modernMessage: {
    fontSize: '5px',
    color: '#666',
    margin: '0'
  },
  modernFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2px',
    width: '100%',
    paddingTop: '2px',
    borderTop: '1px solid #ddd',
    fontSize: '5px'
  },
  modernSignatureLine: {
    borderBottom: '1px solid #1976d2',
    width: '35px',
    marginBottom: '1px',
    height: '8px'
  },
  modernSignatureImage: {
    maxHeight: '12px',
    maxWidth: '35px',
    marginBottom: '1px'
  },
  modernLabel: {
    fontSize: '4px',
    color: '#666',
    margin: '0'
  },
  modernDateText: {
    fontSize: '5px',
    color: '#666',
    margin: '0'
  }
}

export default BatchGenerator
