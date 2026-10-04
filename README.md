# Exam Rescue

Exam Rescue is a student-focused study planning tool that turns exam preparation chaos into a clear, structured plan.

Students can enter their syllabus, study materials, and previous year questions (PYQs). Exam Rescue analyzes the information, prioritizes topics, and creates a day-by-day study plan.

It also includes an open-source, browser-based AI Study Coach for additional study guidance.

## Features

- Add syllabus topics
- Organize study materials
- Analyze PYQs to identify important topics
- Match study materials with syllabus topics
- Prioritize topics as High, Medium, or Low
- Generate a 1–5 day study plan
- AI Study Coach for additional study advice
- Responsive desktop and mobile design

## AI Study Coach

The AI Study Coach runs directly in the browser using:

- Transformers.js
- SmolLM2-135M-Instruct-ONNX-MHA

The AI provides short study priorities based on the student's subject, syllabus, and PYQs.

AI suggestions are intended as study guidance and are not a guarantee of exam questions.

## Tech Stack

- HTML
- CSS
- JavaScript
- Font Awesome
- Google Fonts
- Hugging Face Transformers.js
- ONNX

## How It Works

**Input → Analyze → Prioritize → Study Plan → AI Guidance**

## How to Run

Clone the repository and open `index.html` in a modern browser.

An internet connection is recommended when using the AI Study Coach because the AI model is downloaded in the browser when it is first used.

## Project Structure

```text
Exam-rescue/
├── index.html
├── style.css
├── script.js
└── README.md
