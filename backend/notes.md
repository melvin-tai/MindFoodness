
# Backend Notes – MindFoodness

## Purpose
The backend layer prepares structured prompts for Google Gemini
and interprets its responses into user-facing nutrition guidance.

## Why Prompt Structuring Matters
Raw biometric data is inconsistent and ambiguous.
We normalize and contextualize inputs before sending them to Gemini
to ensure:
- Stable reasoning
- Relevant recommendations
- Explainable outputs

## Gemini Integration (Prototype)
In this prototype:
- Gemini API calls are simulated
- Prompt format matches real Gemini usage
- Architecture is compatible with real API integration

This design allows seamless migration to a production backend.