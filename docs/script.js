document.getElementById("healthForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const biometrics = {
    sleepHours: document.getElementById("sleep").value,
    stressLevel: document.getElementById("stress").value,
    heartRate: document.getElementById("hr").value,
    activityLevel: document.getElementById("activity").value,
    energyLevel: document.getElementById("energy").value
  };

  const aiResponse = await callGemini(biometrics);

  document.getElementById("output").innerHTML = `
    <h3>AI Insight</h3>
    <p>${aiResponse.summary}</p>
    <ul>
      ${aiResponse.recommendations.map(r => `<li>${r}</li>`).join("")}
    </ul>
    <p><strong>Why:</strong> ${aiResponse.explanation}</p>
  `;
});

async function callGemini(prompt) {
  return {
    summary: "Your body shows signs of high stress and moderate fatigue.",
    recommendations: [
      "Eat magnesium-rich foods",
      "Increase complex carbohydrates",
      "Reduce caffeine intake"
    ],
    explanation:
      "Low sleep and elevated stress suggest a need for calming nutrients and stable energy."
  };
}