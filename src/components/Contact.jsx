import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    content: '',
  });

  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare the message data
    const messageData = {
      subject: formData.subject,
      email: formData.email,
      content: formData.content,
    };
  
    // Send the message data to the JSON server
fetch('http://localhost:3001/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(messageData),
})
  .then((response) => {
    if (response.status === 201) {
      // Message sent successfully
      setMessageSent(true);
    } else if (response.status === 404) {
      // Handle 404 error (Not Found)
      console.error('Error: Not Found');
    } else {
      // Handle other errors
      console.error('Error:', response.statusText);
    }
  })
  .catch((error) => {
    console.error('Network Error:', error);
  });
  };

  return (
<div className="contact-form">
      {messageSent ? (
        <div>
          <h2>Message Sent</h2>
          <p>Thank you for contacting us!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Content:
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}

export default Contact;