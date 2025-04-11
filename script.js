window.onload = () => {
  const status = document.getElementById("status");
  const resultText = document.getElementById("resultText");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    status.textContent = "Speech Recognition not supported.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
    console.log("Heard:", transcript);

    if (transcript.includes("answer")) {
      resultText.textContent = "✅ Call Answered";
      resultText.style.color = "green";
    } else if (transcript.includes("reject")) {
      resultText.textContent = "❌ Call Rejected";
      resultText.style.color = "red";
    } else {
      resultText.textContent = `🔎 Unrecognized command: "${transcript}"`;
      resultText.style.color = "#0077cc";
    }
  };

  recognition.onerror = (event) => {
    status.textContent = `Error: ${event.error}`;
    status.style.color = "red";
  };

  recognition.onend = () => {
    status.textContent = "🔁 Restarting voice recognition...";
    setTimeout(() => recognition.start(), 1000);
  };

  recognition.start();
};
