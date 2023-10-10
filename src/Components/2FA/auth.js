import React, { useState, useEffect } from 'react';

function TwoFactorAuth() {
  function generarCorreoElectronico() {
    const dominios = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const nombres = ['geberth', 'humberto', 'marian', 'usuario3'];
    const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
    const dominioAleatorio = dominios[Math.floor(Math.random() * dominios.length)];
    return `${nombreAleatorio}@${dominioAleatorio}`;
  }

  const [userId] = useState(generarCorreoElectronico());
  const [secret, setSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [code, setCode] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const apiUrl = 'https://web-beauty-api-638331a8cfae.herokuapp.com';

  const generateSecretAndQR = async () => {
    try {
      const response = await fetch(`${apiUrl}/generateSecretAndQR`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Error al generar el secreto');
      }

      const data = await response.json();
      setSecret(data.secretKey);
      setQrCodeUrl(data.qrCodeDataURL);
      setValidationMessage('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error al generar el secreto:', error);
      setErrorMessage('Error al generar el secreto. Por favor, inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    generateSecretAndQR();
  }, [userId]);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };


  const handleValidation = async () => {
    try {
      const response = await fetch(`${apiUrl}/saveSecret`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          code
        }),
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Manejo específico para el error 401 (Unauthorized)
          setValidationMessage('');
          setErrorMessage('No tienes autorización para realizar esta acción. Por favor, inicia sesión o verifica tus credenciales.');
        } else {
          // Manejo de otros errores
          setValidationMessage('');
          setErrorMessage('Código no válido. Por favor, inténtalo de nuevo.');
        }
      } else {
        const data = await response.json();
        setValidationMessage(data.message);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error al validar el código:', error);
      setValidationMessage('');
      setErrorMessage('Código no válido. Por favor, inténtalo de nuevo.');
    }
  };
  

  return (
    <div>
      <h2>Secreto 2FA para {userId}</h2>
      <p>Secreto: {secret}</p>
      <img src={qrCodeUrl} alt="QR Code" />
      <button onClick={generateSecretAndQR}>Generar nuevo código QR</button>
      <div>
        <input
          type="text"
          placeholder="Código de autenticación"
          value={code}
          onChange={handleCodeChange}
        />
        <button onClick={handleValidation}>Validar</button>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {validationMessage && <p>{validationMessage}</p>}
    </div>
  );
}

export default TwoFactorAuth;
