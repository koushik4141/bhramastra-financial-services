const payload = {
  name: "Rahul Sharma",
  email: "rahul.test@example.com",
  phone: "+91 98765 43210",
  service: "General Consultation",
  preferredDateTime: "",
  message: "Consultation requested."
};

fetch("http://localhost:5000/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
  .then(res => res.json())
  .then(data => console.log("Success:", data))
  .catch(err => console.error("Error:", err));
