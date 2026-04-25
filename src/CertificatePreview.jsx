import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function CertificateTemplate({ template, formData }) {
  if (template === 'classic') {
    return (
      <div style={styles.classicCertificate}>
        <div style={styles.classicBorder}>
          <div style={styles.classicContent}>
            <div style={styles.classicDecoration}>✓</div>
            <h1 style={styles.classicTitle}>Certificate of Completion</h1>
            <div style={styles.classicDivider}></div>
            <p style={styles.classicSubtext}>This is proudly presented to</p>
            <h2 style={styles.classicName}>{formData.recipientName || '[Recipient Name]'}</h2>
            <p style={styles.classicText}>
              for successfully completing
            </p>
            <h3 style={styles.classicCourse}>
              {formData.courseName || '[Course Name]'}
            </h3>
            {formData.message && (
              <p style={styles.classicMessage}>{formData.message}</p>
            )}
            <div style={styles.classicFooter}>
              <div style={styles.signatureBlock}>
                {formData.signatureImage ? (
                  <img
                    src={formData.signatureImage}
                    alt="Signature"
                    style={styles.signatureImage}
                  />
                ) : (
                  <div style={styles.signatureLine}></div>
                )}
                <p style={{ fontSize: '9px', margin: '2px 0 0 0', color: '#333' }}>Authorized Signature</p>
              </div>
            </div>
            <p style={styles.classicDate}>
              {formData.date ? new Date(formData.date).toLocaleDateString() : '[Date]'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.modernCertificate}>
      <div style={styles.modernHeader}></div>
      <div style={styles.modernContent}>
        <h1 style={styles.modernTitle}>Certificate of Achievement</h1>
        <p style={styles.modernSubtext}>proudly awarded to</p>
        <h2 style={styles.modernName}>{formData.recipientName || '[Recipient Name]'}</h2>
        <p style={styles.modernText}>For outstanding achievement in</p>
        <h3 style={styles.modernCourse}>{formData.courseName || '[Course Name]'}</h3>
        {formData.message && (
          <p style={styles.modernMessage}>{formData.message}</p>
        )}
        <div style={styles.modernFooter}>
          <div>
            {formData.signatureImage ? (
              <img
                src={formData.signatureImage}
                alt="Signature"
                style={styles.modernSignatureImage}
              />
            ) : (
              <div style={styles.modernSignatureLine}></div>
            )}
            <p style={styles.modernLabel}>Authorized Signature</p>
          </div>
          <div>
            <p style={styles.modernDateText}>
              {formData.date ? new Date(formData.date).toLocaleDateString() : '[Date]'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CertificatePreview({ formData }) {
  const certificateRef = useRef()
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')

  const handleDownload = async () => {
    if (!formData.recipientName.trim()) {
      setError('Please enter the recipient name')
      return
    }

    setDownloading(true)
    setError('')

    try {
      const canvas = await html2canvas(certificateRef.current, {
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

      const fileName = `certificate_${formData.recipientName.replace(/\s+/g, '_')}.pdf`
      pdf.save(fileName)
    } catch (err) {
      setError('Failed to download PDF. Please try again.')
      console.error(err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div style={styles.previewContainer}>
      <div style={styles.previewHeader}>
        <h2>Preview</h2>
        <button
          onClick={handleDownload}
          disabled={!formData.recipientName.trim() || downloading}
          style={{
            ...styles.downloadBtn,
            opacity: !formData.recipientName.trim() || downloading ? 0.6 : 1,
            cursor: !formData.recipientName.trim() || downloading ? 'not-allowed' : 'pointer'
          }}
        >
          {downloading ? '⏳ Generating PDF...' : '📥 Download PDF'}
        </button>
      </div>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <div
        ref={certificateRef}
        style={{
          ...styles.certificateWrapper,
          backgroundColor: formData.template === 'classic' ? '#fff8e1' : '#f0f7ff'
        }}
      >
        <CertificateTemplate template={formData.template} formData={formData} />
      </div>
    </div>
  )
}

const styles = {
  previewContainer: {
    flex: '1',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  downloadBtn: {
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
    padding: '12px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '4px',
    fontSize: '14px'
  },
  certificateWrapper: {
    flex: 1,
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '600px',
    width: '100%'
  },

  // Classic template styles
  classicCertificate: {
    width: '100%',
    maxWidth: '850px',
    aspectRatio: '297 / 210',
    backgroundColor: '#fff8e1',
    padding: '40px',
    boxSizing: 'border-box',
    position: 'relative',
    fontFamily: 'Georgia, serif',
    marginTop: '20px'
  },
  classicBorder: {
    border: '3px solid #d4af37',
    padding: '30px',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  classicContent: {
    textAlign: 'center',
    width: '100%'
  },
  classicDecoration: {
    fontSize: '40px',
    marginBottom: '10px',
    color: '#d4af37'
  },
  classicTitle: {
    fontSize: '42px',
    color: '#8b4513',
    margin: '0 0 15px 0',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  classicDivider: {
    width: '200px',
    height: '2px',
    backgroundColor: '#d4af37',
    margin: '15px auto 20px'
  },
  classicSubtext: {
    fontSize: '16px',
    color: '#333',
    margin: '0 0 10px 0',
    fontStyle: 'italic'
  },
  classicName: {
    fontSize: '36px',
    color: '#8b4513',
    margin: '10px 0 15px 0',
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  classicText: {
    fontSize: '14px',
    color: '#333',
    margin: '0 0 5px 0'
  },
  classicCourse: {
    fontSize: '18px',
    color: '#d4af37',
    margin: '5px 0 15px 0',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  classicMessage: {
    fontSize: '12px',
    color: '#555',
    margin: '10px 0 15px 0',
    fontStyle: 'italic'
  },
  classicFooter: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '25px',
    width: '100%'
  },
  classicDate: {
    fontSize: '12px',
    color: '#666',
    margin: '15px 0 0 0'
  },
  signatureBlock: {
    width: '120px',
    textAlign: 'center'
  },
  dateBlock: {
    width: '120px',
    textAlign: 'center'
  },
  signatureLine: {
    borderBottom: '2px solid #333',
    marginBottom: '5px',
    height: '40px'
  },
  signatureImage: {
    maxHeight: '50px',
    maxWidth: '120px',
    marginBottom: '5px'
  },

  // Modern template styles
  modernCertificate: {
    width: '100%',
    maxWidth: '850px',
    aspectRatio: '297 / 210',
    backgroundColor: '#f0f7ff',
    padding: '0',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Helvetica, Arial, sans-serif',
    marginTop: '20px'
  },
  modernHeader: {
    height: '20px',
    background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)'
  },
  modernContent: {
    flex: 1,
    padding: '40px 50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  modernTitle: {
    fontSize: '48px',
    color: '#1565c0',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  modernSubtext: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 15px 0',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  modernName: {
    fontSize: '32px',
    color: '#1976d2',
    margin: '10px 0 15px 0',
    fontWeight: 'bold'
  },
  modernText: {
    fontSize: '14px',
    color: '#555',
    margin: '0 0 5px 0'
  },
  modernCourse: {
    fontSize: '18px',
    color: '#1976d2',
    margin: '5px 0 15px 0',
    fontWeight: 'bold'
  },
  modernMessage: {
    fontSize: '12px',
    color: '#666',
    margin: '10px 0 20px 0',
    fontStyle: 'italic'
  },
  modernFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    width: '100%',
    paddingTop: '20px',
    borderTop: '1px solid #ddd'
  },
  modernSignatureLine: {
    borderBottom: '2px solid #1976d2',
    width: '120px',
    marginBottom: '5px',
    height: '40px'
  },
  modernSignatureImage: {
    maxHeight: '50px',
    maxWidth: '120px',
    marginBottom: '5px'
  },
  modernLabel: {
    fontSize: '11px',
    color: '#666',
    margin: '0'
  },
  modernDateText: {
    fontSize: '12px',
    color: '#666',
    margin: '0'
  }
}

export default CertificatePreview
