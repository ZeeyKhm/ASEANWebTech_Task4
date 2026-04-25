import { useState } from 'react'

function CertificateForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTemplateChange = (e) => {
    setFormData(prev => ({
      ...prev,
      template: e.target.value
    }))
  }

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          signatureImage: event.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const clearSignature = () => {
    setFormData(prev => ({
      ...prev,
      signatureImage: null
    }))
  }

  return (
    <div style={styles.container}>
      <h2>Certificate Details</h2>

      <div style={styles.formGroup}>
        <label htmlFor="template">Template Style</label>
        <select
          id="template"
          name="template"
          value={formData.template}
          onChange={handleTemplateChange}
          style={styles.select}
        >
          <option value="classic">Classic Gold</option>
          <option value="modern">Modern Blue</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="recipientName">
          Recipient Name <span style={{ color: '#d32f2f' }}>*</span>
        </label>
        <input
          id="recipientName"
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Enter recipient's name"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="courseName">Course/Event Name</label>
        <input
          id="courseName"
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          placeholder="e.g., Advanced React Development"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="message">Custom Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Add an optional message or achievement description"
          style={styles.textarea}
          rows="3"
        />
      </div>

      <div style={styles.formGroup}>
        <label>Signature Image</label>
        <div style={styles.uploadArea}>
          <input
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
            style={styles.fileInput}
            id="signature-input"
          />
          <label htmlFor="signature-input" style={styles.fileLabel}>
            📎 Choose Image
          </label>
        </div>
        {formData.signatureImage && (
          <div style={styles.signaturePreview}>
            <p style={{ margin: 0, fontSize: '14px' }}>✓ Signature uploaded</p>
            <button
              type="button"
              onClick={clearSignature}
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    flex: '1',
    padding: '30px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxHeight: '90vh',
    overflowY: 'auto'
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
    marginTop: '6px',
    transition: 'border-color 0.2s'
  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    marginTop: '6px',
    cursor: 'pointer'
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
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
  }
}

export default CertificateForm
