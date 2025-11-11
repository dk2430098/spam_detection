import pandas as pd
import numpy as np
import re
import string
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, roc_auc_score, roc_curve, precision_recall_curve
)
import json

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = re.sub(r'\s+', ' ', text).strip()

    stopwords = set(['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're",
                     "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he',
                     'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's",
                     'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
                     'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are',
                     'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
                     'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
                     'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
                     'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
                     'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once'])

    words = text.split()
    words = [word for word in words if word not in stopwords and len(word) > 2]
    return ' '.join(words)

def create_sample_dataset():
    spam_messages = [
        "WINNER!! You have been selected to receive a FREE prize worth $1000! Call now!",
        "Congratulations! You've won a free iPhone. Click here to claim your prize now!",
        "URGENT! Your account will be suspended. Verify your information immediately.",
        "Get rich quick! Invest now and earn $5000 per week working from home!",
        "FREE entry to win a luxury vacation! Reply YES to claim your tickets!",
        "You have been selected for a cash prize of $500,000. Contact us immediately!",
        "Lowest insurance rates! Click here to save hundreds on your premium today!",
        "Hot singles in your area want to meet you! Sign up for free now!",
        "You've been pre-approved for a $10,000 loan! No credit check required!",
        "WINNER! Claim your free gift card worth $100 by clicking this link!",
    ] * 50

    ham_messages = [
        "Hey, are we still meeting for lunch tomorrow at noon?",
        "Thanks for sending over those documents. I'll review them tonight.",
        "Can you pick up some milk on your way home? We're running low.",
        "The meeting has been rescheduled to Friday at 3pm. See you then!",
        "I really enjoyed our conversation yesterday. Let's catch up again soon.",
        "Your package has been delivered to your doorstep. Have a great day!",
        "Reminder: Your appointment is scheduled for Monday at 10am.",
        "Happy birthday! Hope you have a wonderful day celebrating!",
        "The project report is due next week. Let me know if you need help.",
        "Great job on the presentation today! The client was really impressed.",
    ] * 50

    messages = spam_messages + ham_messages
    labels = ['spam'] * len(spam_messages) + ['ham'] * len(ham_messages)

    df = pd.DataFrame({'text': messages, 'label': labels})
    return df.sample(frac=1).reset_index(drop=True)

def train_and_evaluate():
    df = create_sample_dataset()

    print(f"Dataset loaded: {len(df)} messages")
    print(f"Spam messages: {len(df[df['label'] == 'spam'])}")
    print(f"Ham messages: {len(df[df['label'] == 'ham'])}")

    df['processed_text'] = df['text'].apply(preprocess_text)

    X_train, X_test, y_train, y_test = train_test_split(
        df['processed_text'], df['label'], test_size=0.2, random_state=42, stratify=df['label']
    )

    vectorizer = TfidfVectorizer(max_features=3000, ngram_range=(1, 2))
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)

    print("\nTraining Logistic Regression...")
    lr_model = LogisticRegression(max_iter=1000, random_state=42)
    lr_model.fit(X_train_tfidf, y_train)
    lr_pred = lr_model.predict(X_test_tfidf)
    lr_pred_proba = lr_model.predict_proba(X_test_tfidf)[:, 1]

    print("Training Random Forest...")
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train_tfidf, y_train)
    rf_pred = rf_model.predict(X_test_tfidf)
    rf_pred_proba = rf_model.predict_proba(X_test_tfidf)[:, 1]

    y_test_binary = (y_test == 'spam').astype(int)

    results = {
        'logistic_regression': {
            'accuracy': float(accuracy_score(y_test, lr_pred)),
            'precision': float(precision_score(y_test, lr_pred, pos_label='spam')),
            'recall': float(recall_score(y_test, lr_pred, pos_label='spam')),
            'f1_score': float(f1_score(y_test, lr_pred, pos_label='spam')),
            'roc_auc': float(roc_auc_score(y_test_binary, lr_pred_proba)),
            'confusion_matrix': confusion_matrix(y_test, lr_pred).tolist()
        },
        'random_forest': {
            'accuracy': float(accuracy_score(y_test, rf_pred)),
            'precision': float(precision_score(y_test, rf_pred, pos_label='spam')),
            'recall': float(recall_score(y_test, rf_pred, pos_label='spam')),
            'f1_score': float(f1_score(y_test, rf_pred, pos_label='spam')),
            'roc_auc': float(roc_auc_score(y_test_binary, rf_pred_proba)),
            'confusion_matrix': confusion_matrix(y_test, rf_pred).tolist()
        },
        'dataset_info': {
            'total_samples': len(df),
            'spam_count': int(len(df[df['label'] == 'spam'])),
            'ham_count': int(len(df[df['label'] == 'ham'])),
            'train_size': len(X_train),
            'test_size': len(X_test)
        }
    }

    lr_fpr, lr_tpr, _ = roc_curve(y_test_binary, lr_pred_proba)
    rf_fpr, rf_tpr, _ = roc_curve(y_test_binary, rf_pred_proba)

    results['roc_curves'] = {
        'logistic_regression': {
            'fpr': lr_fpr.tolist(),
            'tpr': lr_tpr.tolist()
        },
        'random_forest': {
            'fpr': rf_fpr.tolist(),
            'tpr': rf_tpr.tolist()
        }
    }

    lr_precision, lr_recall, _ = precision_recall_curve(y_test_binary, lr_pred_proba)
    rf_precision, rf_recall, _ = precision_recall_curve(y_test_binary, rf_pred_proba)

    results['pr_curves'] = {
        'logistic_regression': {
            'precision': lr_precision.tolist(),
            'recall': lr_recall.tolist()
        },
        'random_forest': {
            'precision': rf_precision.tolist(),
            'recall': rf_recall.tolist()
        }
    }

    print("\n=== Results ===")
    print(f"\nLogistic Regression:")
    print(f"  Accuracy: {results['logistic_regression']['accuracy']:.4f}")
    print(f"  Precision: {results['logistic_regression']['precision']:.4f}")
    print(f"  Recall: {results['logistic_regression']['recall']:.4f}")
    print(f"  F1-Score: {results['logistic_regression']['f1_score']:.4f}")
    print(f"  ROC-AUC: {results['logistic_regression']['roc_auc']:.4f}")

    print(f"\nRandom Forest:")
    print(f"  Accuracy: {results['random_forest']['accuracy']:.4f}")
    print(f"  Precision: {results['random_forest']['precision']:.4f}")
    print(f"  Recall: {results['random_forest']['recall']:.4f}")
    print(f"  F1-Score: {results['random_forest']['f1_score']:.4f}")
    print(f"  ROC-AUC: {results['random_forest']['roc_auc']:.4f}")

    with open('results.json', 'w') as f:
        json.dump(results, f, indent=2)

    print("\nResults saved to results.json")
    return results

if __name__ == "__main__":
    train_and_evaluate()
