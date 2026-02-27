/**
 * This function handles interaction with Google Gemini API
 */

export async function callGemini(prompt) {

  // For this prototype, we simulate a Gemini Response
  console.log("Sending prompt to Gemini:");
  console.log(prompt);

  // Simulated AI Response
  return {
    summary: "Your body shows signs of high stress and moderate fatigue.",
    recommendations: [
      "Eat magnesium-rich foods (e.g. leafy greens, nuts)",
      "Increase complex carbohydrates for sustained energy",
      "Stay hydrated and reduce caffeine intake"
    ],
    explanation:
      "Based on low sleep and elevated stress, your body benefits from calming nutrients and stable energy sources."
  };
}