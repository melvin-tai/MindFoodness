# MindFoodness
_Project Prototype by Team CoLabs (KitaHack 2026)_

    Team Members:
        Gracia Cheong
        Jiayi Chen
        Melvin Tai
        Rishidesh Singh

###### Links: [Project Description](https://docs.google.com/document/d/1VxyR0r-EY3K2TtNUxoYwTPV2nDVVob8laGmwB73uIYg/edit?tab=t.gq07mg7py7z6) | [Technical Implementation Overview](https://docs.google.com/presentation/d/18qDQ-OEVjeLq51vIHNkgcUXYY4AtdjjztZLzuSfwdQY/edit?usp=sharing) | [Demo Video]()

---

### Project Overview
**MindFoodness** is a fitness and nutrition decision-support system that uses biometric health data to generate personalized food recommendations. By interpreting signals such as sleep quality, stress levels, heart rate, and activity, the system helps users decide what to eat based on their actual physiological state, rather than generic dietary advice.

The project addresses a real-world health challenge: people generate large amounts of biometric data through wearables, yet still struggle to decide what to eat based on their actual physiological needs. MindFoodness bridges this gap by using A.I. reasoning to convert health signals into actionable nutrition guidance.

    This project uses Google Gemini for A.I. reasoning and Firebase for data storage and authentication.

---

### UN Sustainable Development Goal (SDG) 3: Good Health and Well-Being

**Target Alignment**

    Promote preventive healthcare and healthier lifestyles through informed daily decision-making.

**Problem Statement**

Despite widespread access to fitness trackers and nutrition information, most individuals make food decisions without understanding how their current health state (sleep, stress, heart rate, activity) should influence what they eat. This leads to hidden nutritional imbalances, reduced energy levels, and preventable long-term health risks.

Existing nutrition apps rely heavily on manual tracking and generic recommendations, which fail to adapt to a user’s real-time physiological condition. Therefore,

    How can AI be used to interpret biometric health data and transform it into actionable, personalized nutrition guidance that current diet and fitness tools fail to deliver, in order to reduce hidden nutritional imbalances and improve daily well-being?

**Why do we need A.I. here?**

Interpreting multiple biometric signals simultaneously is cognitively demanding and impractical for daily use. A.I. enables:

    - Pattern recognition across health indicators
    - Context-aware reasoning
    - Scalable personalization for preventive healthcare

---

### Solution Overview

**MindFoodness** converts biometric inputs into context-aware nutrition recommendations using A.I. Instead of static meal plans, the system adapts recommendations daily based on how the user’s body is functioning.

**Key Outcomes:**

    - Improved clarity in daily food decisions
    - Reduced guesswork in nutrition
    - Increased awareness of personal health needs

---

### Google Technologies Used

**1. Google Gemini**

    - Acts as the reasoning engine of the system
    - Interprets multiple biometric signals together
    - Generates personalized food recommendations
    - Provides explanations for each recommendation

We chose Gemini over Vertex A.I., as Gemini excels at contextual reasoning and natural language explanations, is ideal for prompt-based personalization, and is faster to prototype and iterate. Vertex A.I., on the other hand, is designed for large-scale model training and MLOps, which is rather unnecessary for our current project/case.

**2. Firebase**

    Firebase is used as the backend platform.
    - Firestore: Stores user biometric inputs and A.I. outputs
    - Firebase Authentication: Manages secure user sign-in
    Firebase was chosen for its simplicity, real-time data handling, and scalability for a prototype-level system.

---

### System Architecture

    User Input (Biometrics Data)
               ↓
    Firebase Authentication
               ↓
    Firestore (User Data Storage)
               ↓
    Gemini API (A.I. Reasoning)
               ↓
    Personalized Nutrition Recommendations
               ↓
    Web Interface (Live Demo on GitHub Pages)

---

### Technical Implementation
**Core Components**

    Frontend: Web-based interface for entering biometric data and viewing recommendations
    Backend Logic: Prepares structured prompts for Gemini
    A.I. Layer: Gemini generates personalized nutrition advice
    Database: Firebase Firestore stores user data and responses

---

### Key Technical Challenge
**Challenge**
    
    Raw biometric values (e.g., sleep hours, stress scores) are difficult for AI to interpret consistently without structure.

**Solution**

We implemented a preprocessing layer that:

    - Normalizes biometric values
    - Converts raw data into structured health indicators
    - Ensures consistent, interpretable AI prompts
    - This improved recommendation relevance and reduced response variability.

---

### User Feedback & Iteration
**User Testing Process**

- Conducted 3 Zoom sessions with real users outside the team
- Each participant identified 2-3 issues
- All sessions were recorded and uploaded to this [Google Drive]()

**Key User Insights**
1. -
2. -
3. -

---

### Scalability & Next Steps
**Short-Term**

    - Integrate wearable platforms (e.g., Google Fit)
    - Expand food and nutrient database
    - Improve personalization depth

**Long-Term**

    - Mobile app implementation
    - Longitudinal health trend analysis
    - Preventive nutrition insights at scale
    - Scalability Justification

**The system uses:**

    - Stateless AI prompts
    - Serverless backend services
    - Cloud-based data storage

This architecture can scale to a larger user base with minimal changes.
