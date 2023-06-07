import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

import a from "./edit.png";

const FormComponent = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedImage, setSubmittedImage] = useState('');
  const resultRef = useRef(null);

  const  sectionStyle = { 
    backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${a})`,
    width: '1050px',
    height: '1050px',
    position: 'absolute',
    
  };
  const bgimg = {
    height: '257px',
    width: '286px',
    position: 'relative',
    top: '480px',
    left: '71px',
    border: 'solid',
    borderRadius: '50%',
  };
  const subname ={
    position: 'relative',
    top: '725px',
    left: '366px',

  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedName(name);
    setSubmittedImage(image);
  
  };


const handleDownload = () => {
    html2canvas(resultRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'submitted_content.png';
      link.click();
    });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <label>
          Name: 
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>Image: </label>
        <label className="custom-label">
         Select Image here
        <input type="file" className="file-input"  onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
        </label>
        <br />
        <button  className="button"  type="submit">Submit</button>
        <button onClick={handleDownload} className='download-btn'>Download as PDF</button>
      </form>
      {submittedName && (
        <div ref={resultRef} style={sectionStyle}>
          <h2 style={subname}>{submittedName}</h2>
          {submittedImage && <img src={URL.createObjectURL(submittedImage)} alt={submittedName} style={bgimg} />}
        </div>
      )}
      {submittedName && (
        <div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
