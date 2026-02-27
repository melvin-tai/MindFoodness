/**
 * Converts raw biometric inputs into structured AI prompts
 */

export function buildPrompt(biometrics) {
  const {
    sleepHours,
    stressLevel,
    heartRate,
    activityLevel,
    energyLevel
  } = biometrics;

  return `
You are a nutrition and health assistant.

User health data:
- Sleep: ${sleepHours} hours
- Stress level (1-10): ${stressLevel}
- Resting heart rate: ${heartRate} bpm
- Activity level (1-10): ${activityLevel}
- Self-reported energy (1-10): ${energyLevel}

Task:
1. Identify key physiological concerns.
2. Recommend suitable food types (not recipes).
3. Explain WHY these foods are suitable.

Keep the response concise and easy to understand.
`;
}