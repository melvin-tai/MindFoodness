import os
import json
import requests
from typing import Dict, Any

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set")

MODEL = "models/gemini-3-flash-preview"
BASE_URL = "https://generativelanguage.googleapis.com/v1beta"


def call_gemini(prompt: str) -> str:
    """
    Make a direct REST call to Gemini
    and return the raw text output.
    """
    url = f"{BASE_URL}/{MODEL}:generateContent?key={API_KEY}"

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ]
    }

    response = requests.post(
        url,
        headers={"Content-Type": "application/json"},
        data=json.dumps(payload),
        timeout=30
    )

    if response.status_code != 200:
        raise RuntimeError(
            f"Gemini API failed ({response.status_code}): {response.text}"
        )

    data = response.json()
    return data["candidates"][0]["content"]["parts"][0]["text"]


def explain_with_gemini(enriched_event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Build prompt, send to Gemini, parse JSON response.
    """

    prompt = (
        "## ROLE\n"
        "You are the MindFoodness Clinical Nutritionist. "
        "You translate biometric data into natural, whole-food nutrition plans.\n\n"

        "## DATA INTEGRITY & MISSING DATA STRATEGY\n"
        "1. Raw values of 0 for Sleep or HRV are 'Missing'.\n"
        "2. Confidence Levels:\n"
        "   - High: All metrics valid.\n"
        "   - Medium: 1 metric missing.\n"
        "   - Low: 2+ metrics missing. Provide General Balanced Nutrition.\n\n"

        "## PERSONALIZED STRESS INDEX (PSI) CALCULATION\n"
        "You must calculate PSI (0-100):\n"
        "- Sleep: Ideal 8 hrs. Every hour below 7 adds 15 points.\n"
        "- HRV: <20 = +30 points. 20-40 = +15 points.\n"
        "- Activity: 0 mins = +10 points.\n"
        "- Missing metric = +15 safety penalty.\n"
        "Zones:\n"
        "0-30 GREEN (Optimal)\n"
        "31-60 YELLOW (Mild Stress)\n"
        "61-100 RED (High Stress)\n\n"

        "## NUTRITION STRATEGY\n"
        "- GREEN: General Balanced Nutrition (maintenance).\n"
        "- RED or Sleep<7 or HRV<20: Specific Nutrient Correction "
        "(Magnesium, Omega-3, Anti-inflammatory).\n\n"

        "## DIETARY RULES\n"
        "- If Vegan/Vegetarian: Use Lentils, Chickpeas, Tofu, Tempeh.\n"
        "- If Nut Allergy: Use Seeds instead.\n"
        "- If Diet or Allergy is NONE: No restrictions.\n\n"

        "## OUTPUT FORMAT\n"
        "Respond ONLY with valid JSON using this schema:\n"
        "{\n"
        "  \"meal_suggestion\": string,\n"
        "  \"scientific_reasoning\": string,\n"
        "  \"ingredients\": [string],\n"
        "  \"user_message\": string,\n"
        "  \"internal_confidence_level\": one of [High, Medium, Low]\n"
        "}\n\n"

        "Here are the user biometrics:\n"
        f"{json.dumps(enriched_event, indent=2)}"
    )

    raw = call_gemini(prompt)

    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Failed to parse JSON from Gemini:\n{raw}")


