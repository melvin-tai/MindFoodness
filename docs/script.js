import { buildPrompt } from "../backend/promptBuilder.js";
import { callGemini } from "../backend/geminiClient.js";
import { signInUser } from "../firebase/auth.js";
import { saveSessionData } from "../firebase/firestore.js";

await signInUser();

document.getElementById("healthForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const biometrics = {
    sleepHours: document.getElementById("sleep").value,
    stressLevel: document.getElementById("stress").value,
    heartRate: document.getElementById("hr").value,
    activityLevel: document.getElementById("activity").value,
    energyLevel: document.getElementById("energy").value
  };

  const prompt = buildPrompt(biometrics);
  const aiResponse = await callGemini(prompt);

  document.getElementById("output").innerHTML = `
    <h3>AI Insight</h3>
    <p>${aiResponse.summary}</p>
    <ul>
      ${aiResponse.recommendations.map(r => `<li>${r}</li>`).join("")}
    </ul>
    <p><strong>Why:</strong> ${aiResponse.explanation}</p>
  `;

  await saveSessionData({ biometrics, aiResponse });
});