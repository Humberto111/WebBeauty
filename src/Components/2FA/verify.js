import React, { useState } from 'react';

function Verify2FA() {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const verifyToken = async () => {
    try {
      const response = await fetch('https://web-beauty-api-638331a8cfae.herokuapp.com/validateTOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, "code": token }),
      });
      const data = await response.json();
      setVerificationResult(data.message);
    } catch (error) {
      console.error('Error verificando el código 2FA', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card bg-dark text-white my-5 mx-auto" style={{ borderRadius: "1rem", maxWidth: "400px" }}>
        <div className="card-body p-5 d-flex flex-column align-items-center mx-auto w-100">
          <h2 className="fw-bold mb-2 text-uppercase">Verificar Código 2FA</h2>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">ID de Usuario:</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="token" className="form-label">Código 2FA:</label>
            <input
              type="text"
              className="form-control"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={verifyToken}>Verificar Código 2FA</button>
          {verificationResult && <p>{verificationResult}</p>}
        </div>
      </div>
    </div>
  );
}
export default Verify2FA;
