const handleSignup = async (e) => {
  e.preventDefault();

  const userData = {
    email: emailState,       // from your useState
    password: passwordState  // from your useState
  };

  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    alert(result.message);
  } catch (err) {
    console.error("Error connecting to server:", err);
  }
};