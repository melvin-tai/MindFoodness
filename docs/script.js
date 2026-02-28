document.getElementById("healthForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const outputEl = document.getElementById("output");
  outputEl.innerHTML = "<p>Generating recommendation...</p>";

  try {
    // --- Collect raw inputs ---
    const sleep = Number(document.getElementById("sleep").value);
    const heartRate = Number(document.getElementById("hr").value);
    const activityLevel = Number(document.getElementById("activity").value);

    // --- Normalize units only (NO PSI CALCULATION HERE) ---

    // Convert activity scale (1–10) → minutes
    const activityMinutes = activityLevel * 10;

    // Temporary HRV proxy from heart rate
    // Replace when real HRV data exists
    let hrvProxy;

    if (heartRate >= 60 && heartRate <= 75) {
      hrvProxy = 50;        // Normal HRV band
    } else if (heartRate > 75) {
      hrvProxy = 15;        // Low HRV stress band
    } else {
      hrvProxy = 80;        // High HRV performance band
    }

    // --- Structured payload expected by backend ---
    const biometrics = {
      Sleep: sleep,
      HRV: hrvProxy,
      Activity: activityMinutes,
      Diet: "NONE",
      Allergy: "NONE"
    };

    // --- POST to backend ---
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(biometrics)
    });

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const aiResponse = await response.json();

    // --- Render output ---
    outputEl.innerHTML = `
      <h3>AI Recommendation</h3>
      <p><strong>Meal:</strong> ${aiResponse.meal_suggestion}</p>
      <p><strong>Why:</strong> ${aiResponse.scientific_reasoning}</p>
      <p><strong>Guidance:</strong> ${aiResponse.user_message}</p>
      <p><strong>Confidence:</strong> ${aiResponse.internal_confidence_level}</p>
      <h4>Ingredients</h4>
      <ul>
        ${aiResponse.ingredients.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;

  } catch (error) {
    console.error(error);
    outputEl.innerHTML = `<p style="color:red;">Error generating recommendation.</p>`;
  }
});