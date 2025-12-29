# AI Email Spam Detection System
<p align="center">
  <a href="https://spam-detection-vert.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  &nbsp;&nbsp;
  <a href="https://github.com/dk2430098/spam_detection" target="_blank">
    <img src="https://img.shields.io/badge/GitHub%20Repo-View%20Code-black?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

## Overview

This project is a comprehensive Machine Learning application designed to detect email spam. It features a comparative study of two powerful classification algorithms: **Logistic Regression** and **Random Forest**. The system includes a Python-based backend for model training and evaluation, and a modern, interactive React frontend for visualizing results and testing the model in real-time.

## Features

- **Machine Learning Core**:
  - Implements Logistic Regression and Random Forest classifiers.
  - Uses TF-IDF (Term Frequency-Inverse Document Frequency) for text vectorization.
  - Comprehensive performance metrics: Accuracy, Precision, Recall, F1-Score, and ROC-AUC.
  - Comparison of model performance.

- **Interactive Dashboard**:
  - **Analysis & Results**: detailed visualizations including Confusion Matrices, ROC Curves, and key performance indicators.
  - **Live Detector**: A real-time interface to test custom messages against the trained models.
  - **Project Report**: Access to the full academic report and methodology.

## Tech Stack

### Backend / Machine Learning
- **Python 3.x**
- **Libraries**:
  - `scikit-learn`: For model training and evaluation.
  - `pandas`: For data manipulation.
  - `numpy`: For numerical operations.

### Frontend
- **React 18**: UI library.
- **TypeScript**: Type safety.
- **Vite**: Build tool and dev server.
- **Tailwind CSS**: Styling.
- **Lucide React**: Icons.

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 18.x or higher

### 1. Python Environment Setup (Model Training)

Navigate to the project root directory.

1.  **Install Python Dependencies**:
    It is recommended to use a virtual environment.

    ```bash
    # Create virtual environment (optional but recommended)
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`

    # Install required packages
    pip install pandas numpy scikit-learn
    ```

2.  **Run the Training Script**:
    This will train the models, evaluate them, and generate a `results.json` file (which is used by the frontend, although the frontend currently imports static data for demonstration purposes, this script validates the logic).

    ```bash
    python spam_detector.py
    ```

### 2. Frontend Application Setup

1.  **Install Node Modules**:
    ```bash
    npm install
    ```

2.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open the Application**:
    The terminal will show the local URL (usually `http://localhost:5173`). Open this link in your browser to view the dashboard.

## Project Structure

- `spam_detector.py`: Main Python script for training models and evaluating performance.
- `src/`: Frontend source code.
  - `components/`: React components for different sections (Detector, Charts, etc.).
  - `data/results.ts`: Stores the model results and report content for the frontend.
  - `App.tsx`: Main application component.

## Academic Context

This project serves as an academic study demonstrating the practical application of NLP (Natural Language Processing) and supervised learning techniques in cybersecurity. It highlights the trade-offs between linear models (Logistic Regression) and ensemble methods (Random Forest) in the context of spam filtering.
