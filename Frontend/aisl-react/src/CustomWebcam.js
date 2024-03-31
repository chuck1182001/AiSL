import Webcam from "react-webcam";
import { useCallback, userEffect, useRef, useState, useEffect } from "react";
import cat from './cool.jpg'
import green from './green.gif'
// const path = require('path');

let showPage = true;

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [status, setStatus] = useState('');
  const [mirrored] = useState(true);
  const [greenFlash, setGreenFlash ] = useState(false);
  const [redFlash, setRedFlash ] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState('hello');
  const [submit, setSubmit] = useState(false);
  const [hasRead, setHasRead] = useState(false);
  const [generateButton, setGenerateButton] = useState(false);
  const [webcam, setWebcam] = useState(false);
  const capturedLetters = [];
  const library = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const getRandomIndex = () => {
    const min = 0; 
    const max = library.length-1; 
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const capture = useCallback(() => {
    let imageSrc = webcamRef.current.getScreenshot();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.translate(img.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      const newImageSrc = canvas.toDataURL('image/jpeg');
      setImgSrc(newImageSrc);
    };
    img.src = imageSrc;
  }, [webcamRef]);

  const capturePhrase = useCallback(() => {
    const scheduleCapture = (index) => {
      if (index >= currentPhrase.length) return;
      setTimeout(() => {
        let imageSrc = webcamRef.current.getScreenshot();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.translate(img.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(img, 0, 0);
          const newImageSrc = canvas.toDataURL('image/jpeg');

          setImgSrc(newImageSrc);
          // setSubmit(true);
          handleWordSubmit(newImageSrc);
          setWebcam(true);

          scheduleCapture(index + 1);
        };
        img.src = imageSrc;
      }, 7000);
    };

    scheduleCapture(0);
    setStatus(capturedLetters.join(''));
  }, [webcamRef, currentPhrase]);

  const replaceImage = (e) => {
    e.preventDefault()
    setGenerateButton(false);

    fetch('http://172.232.30.72:3001/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: currentPhrase,
      })
      .then(response => response.blob())
      .then(blob => { 
        const gifUrl = URL.createObjectURL(blob);
        setImgSrc(gifUrl);
    })
  };

  const retake = () => {
    setImgSrc(null);
    setSubmit(false);
    setHasRead(false);
    setGenerateButton(false);
  }

  const handleWordSubmit = (imgSrc) => {
    fetch('http://172.232.30.72:3001/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageSrc: imgSrc }),
    })
    .then(response => response.text())
    .then(data => { 
      console.log(data); 
      capturedLetters.push(data);
      setHasRead(true);
    })
  }

  const handleSubmit = (e) => {
    // if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    // }

    if (imgSrc) {
      fetch('http://172.232.30.72:3001/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageSrc: imgSrc }),
      })
      .then(response => response.text())
      .then(data => { 
        console.log(data); 
        setStatus(data);
        setSubmit(true);
        setHasRead(true);
      })
    }
  }

  const updateCurrentPhrase = () => {
    const index = getRandomIndex();
    setCurrentPhrase(library[index]); 
  };

  useEffect(() => {
    if (submit && hasRead && (status == currentPhrase)) {
      setGreenFlash(true);
      setTimeout(() => {
        setGreenFlash(false); 
        updateCurrentPhrase();
      }, 2000);
    } else if (submit && hasRead && (status != currentPhrase)) {
      setRedFlash(true);
      setTimeout(() => {
        setRedFlash(false); 
        setGenerateButton(true);
        // setImgSrc(cat);

      }, 2000);
    }
  }, [submit, hasRead, status, currentPhrase]);

  return (
    <div className={`flash-container ${greenFlash ? 'flash-green' : ''} ${redFlash ? 'flash-red' : ''}`}>
      <div className="header-1">
        <div className="home-container">
          <button onClick={() => setShowPage(false)}>← Home</button>
        </div>
      </div>
      <div className="container-1">
        <div style={{ marginTop: '55px', marginBottom: imgSrc ? '35px' : '25px' }}>
          <label htmlFor="phrase">Sign: "{currentPhrase}"</label>
          <br />
        </div>
        {imgSrc && (!generateButton ? (
          <img 
            src={imgSrc} 
            alt="webcam" 
            style={{ transform: mirrored ? "scaleX(-1)" : "none" }} 
          />
        ) : (
          <>
          <img 
            src={imgSrc} 
            alt="webcam" 
            style={{ 
              width: '600px',
              height: '450px',
              transform: mirrored ? "scaleX(-1)" : "none" }} 
          />
          <button
            onClick={replaceImage}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '10px',
              fontSize: '20px',
              fontFamily: "Poppins",
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}> Generate GIF
          </button>
          </>
        ))}

        {(!imgSrc || webcam) && !generateButton && (
          <Webcam 
            height={450}
            width={600}
            ref={webcamRef}
            mirrored={mirrored}
            screenshotFormat="image/jpeg" 
            style={{ marginTop: '10px', marginBottom: imgSrc ? '0px' : '0px'}}
          />
        )}
 
        <div className="btn-container" >
          {imgSrc ? (
            <>
              <button onClick={retake}>Retake photo</button>
              <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <button type="submit">Submit photo</button>
              </form>
            </>
          ) : (
            <>
              <button onClick={capture}>Capture photo</button>
              <button onClick={capturePhrase}>Capture phrase</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomWebcam;
export function setShowPage(value) {
  showPage = value;
}

export function getShowPage() {
  return showPage;
}
