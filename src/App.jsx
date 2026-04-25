import { useState } from 'react'
import CertificateForm from './CertificateForm'
import CertificatePreview from './CertificatePreview'
import BatchGenerator from './BatchGenerator'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    recipientName: '',
    courseName: '',
    date: '',
    message: '',
    template: 'classic',
    signatureImage: null
  })

  const [showBatch, setShowBatch] = useState(false)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Certificate Generator</h1>
        <p>Create and download professional certificates as PDF</p>
      </header>

      <div className="tabs">
        <button
          className={`tab-btn ${!showBatch ? 'active' : ''}`}
          onClick={() => setShowBatch(false)}
        >
          Single Certificate
        </button>
        <button
          className={`tab-btn ${showBatch ? 'active' : ''}`}
          onClick={() => setShowBatch(true)}
        >
          Batch Generator
        </button>
      </div>

      {!showBatch ? (
        <div className="main-container">
          <CertificateForm formData={formData} setFormData={setFormData} />
          <CertificatePreview formData={formData} />
        </div>
      ) : (
        <BatchGenerator template={formData.template} signatureImage={formData.signatureImage} />
      )}
    </div>
  )
}

export default App
