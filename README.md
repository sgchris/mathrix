# Mathrix

Mathrix is an interactive math exercise platform designed to help learners practice and master fundamental math concepts through guided exercises, helpful hints, and detailed explanations.

## What is Mathrix?

Mathrix provides step-by-step math problems across multiple topics and difficulty levels. Each exercise includes:
- **Clear instructions** to guide you through the problem
- **Interactive answer inputs** where you work through your solution
- **Progressive hints** to help when you get stuck
- **Detailed step-by-step explanations** after you submit your answer

## Topics Covered

Currently, Mathrix includes exercises in:
- **Algebra** - Solving equations, working with variables, and algebraic expressions
- **Fractions** - Operations with fractions, simplification, and comparison
- **Percentages** - Calculating percentages, percent change, and real-world applications

## Difficulty Levels

Exercises are organized by difficulty to support learners at different levels:
- **Easy** - Foundational concepts and basic problem types
- **Medium** - More complex applications and multi-step problems
- **Hard** - Advanced problems requiring deeper understanding

## Features

- **Exercise History** - Track the exercises you've attempted and review your progress
- **Topic Navigation** - Easily browse and select exercises by topic
- **Accessibility** - Math expressions are displayed in clear mathematical notation
- **Progress Tracking** - Keep your work organized with your exercise history
- **Google Sign-In + Cloud Sync** - Save progress in Firebase and continue from other browsers and devices

## Getting Started

1. Select a topic from the sidebar
2. Choose an exercise at your desired difficulty level
3. Read the instructions and solve the problem
4. Submit your answer to see if it's correct
5. If needed, use the hint system for guidance
6. Review the detailed explanation to understand the solution

## Feedback & Reasoning

As you work through exercises, you can provide reasoning for your approaches, helping you think more deeply about the math and explaining your problem-solving process.

## Firebase Setup

Mathrix now supports Google authentication and cloud-backed progress sync with Firebase Authentication and Cloud Firestore.

1. Copy `.env.example` to `.env.local`.
2. Fill in the `VITE_FIREBASE_*` values from your Firebase web app configuration.
3. Enable Google sign-in in Firebase Authentication.
4. Create a Cloud Firestore database and allow each signed-in user to read and write only their own document.
5. Add your local and production domains to Firebase Authentication authorized domains.
6. Run `npm install` and `npm run dev` locally, then sign in from the sidebar to verify sync.
