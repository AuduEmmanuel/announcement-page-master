  // Define the URL of the other page
  const otherPageUrl = "index.html";

  // Function to trigger a voice notification
const triggerVoiceNotification = () => {
    // Check if the browser supports the SpeechSynthesis API
    if ('speechSynthesis' in window) {
      // Create a new SpeechSynthesisUtterance object
      const message = new SpeechSynthesisUtterance("There is an announcement");
  
      // Use the default voice
      message.voice = speechSynthesis.getVoices()[0];
  
      // Speak the message
      speechSynthesis.speak(message);
    }
  };
  
  // Function to send the text to the other page
  const sendTextToOtherPage = (text) => {
    // Trigger the voice notification before sending the text
    triggerVoiceNotification();
  
    // Create a hidden iframe to load the other page
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = otherPageUrl;
    document.body.appendChild(iframe);
  
    // Wait for the iframe to load
    iframe.onload = () => {
      // Get the textarea element in the other page
      const otherTextarea = iframe.contentDocument.getElementById("other-textarea");
  
      // Set the value of the textarea to the text to send
      otherTextarea.value = text;
  
      // Scroll the textarea from right to left
      otherTextarea.style.direction = "rtl";
      otherTextarea.style.textAlign = "left";
      otherTextarea.style.animation = "scroll 10s linear infinite";
    };
  };

   // Add a submit event listener to the form
   const sendForm = document.getElementById("sendForm");
   sendForm.addEventListener("submit", (event) => {
     event.preventDefault();
     const text = document.getElementById("message").value;
     sendTextToOtherPage(text);
   });