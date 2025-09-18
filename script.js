let sessionTokenFromQR = null;

// Initialize QR scanner
window.onload = function() {
  const html5QrCode = new Html5QrCode("qr-reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      // QR scanned successfully
      sessionTokenFromQR = decodedText;
      document.getElementById("markDiv").style.display = "block";
      document.getElementById("session").innerText = sessionTokenFromQR;
      html5QrCode.stop();
    },
    (errorMessage) => {
      // ignore scan errors
    }
  );
};

// Mark Attendance button
document.getElementById("markBtn").onclick = ()=>{
  const studentId = document.getElementById("studentId").value.trim();
  if(!studentId){ alert("Enter Student ID"); return; }
  if(!sessionTokenFromQR){ alert("Scan the QR code first"); return; }

  const data = JSON.parse(localStorage.getItem("attendance")||"[]");
  const exists = data.find(a=>a.studentId===studentId && a.session===sessionTokenFromQR);
  if(exists){ 
    document.getElementById("status").innerText = "Already marked ✅"; 
    return;
  }

  data.push({studentId: studentId, session: sessionTokenFromQR, time: new Date().toLocaleString()});
  localStorage.setItem("attendance", JSON.stringify(data));
  document.getElementById("status").innerText = "Attendance marked ✅";
};
