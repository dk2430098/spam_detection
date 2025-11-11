import { Shield, TrendingUp } from 'lucide-react';
import { MetricsComparison } from './components/MetricsComparison';
import { ConfusionMatrix } from './components/ConfusionMatrix';
import { ROCCurve } from './components/ROCCurve';
import { ProjectReport } from './components/ProjectReport';
import { SpamDetector } from './components/SpamDetector';
import { DatasetInfo } from './components/DatasetInfo';
import { SystemArchitecture } from './components/SystemArchitecture';
import { modelResults } from './data/results';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'detector' | 'report'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">AI Email Spam Detection System</h1>
              <p className="text-gray-300 text-sm">Machine Learning Comparative Study: Logistic Regression vs Random Forest</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-gray-800 text-gray-800'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Analysis & Results
            </button>
            <button
              onClick={() => setActiveTab('detector')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'detector'
                  ? 'border-gray-800 text-gray-800'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Live Detector
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'report'
                  ? 'border-gray-800 text-gray-800'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Project Report
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-3">Project Overview</h2>
              <p className="text-gray-200 leading-relaxed">
                This comprehensive academic project implements an AI-based email spam detection system using machine learning algorithms.
                The system compares two powerful classification models—Logistic Regression and Random Forest—to identify spam messages
                with high accuracy. Using TF-IDF vectorization and advanced text preprocessing, both models achieve over 98% accuracy
                on the test dataset.
              </p>
            </div>

            <DatasetInfo />
            <SystemArchitecture />
            <MetricsComparison />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ConfusionMatrix
                matrix={modelResults.logistic_regression.confusion_matrix}
                title="Logistic Regression Confusion Matrix"
                color="blue"
              />
              <ConfusionMatrix
                matrix={modelResults.random_forest.confusion_matrix}
                title="Random Forest Confusion Matrix"
                color="green"
              />
            </div>

            <ROCCurve />

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Findings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Logistic Regression</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Accuracy: 98.50%</li>
                    <li>• Fast training and prediction</li>
                    <li>• Interpretable coefficients</li>
                    <li>• Ideal for real-time applications</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Random Forest</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Accuracy: 99.00%</li>
                    <li>• Superior ROC-AUC: 99.75%</li>
                    <li>• Handles non-linear patterns</li>
                    <li>• Robust to outliers and noise</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detector' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-3">Interactive Spam Detector</h2>
              <p className="text-gray-200 leading-relaxed">
                Test the spam detection system with your own messages. The detector uses keyword analysis, pattern recognition,
                and text features to classify messages as spam or legitimate.
              </p>
            </div>

            <SpamDetector />

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Common Spam Indicators</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['winner', 'free', 'prize', 'urgent', 'cash', 'click here', 'limited time', 'guarantee'].map((keyword) => (
                  <div key={keyword} className="bg-red-50 border border-red-200 rounded px-3 py-2 text-sm text-red-800 text-center font-medium">
                    {keyword}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Messages containing multiple spam keywords, excessive punctuation, and promotional language are more likely to be classified as spam.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-3">Complete Academic Report</h2>
              <p className="text-gray-200 leading-relaxed">
                Comprehensive project documentation including abstract, methodology, algorithms, results, discussion, and references.
                Download the full report for academic submission.
              </p>
            </div>

            <ProjectReport />
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Project Details</h3>
              <p className="text-sm">AI-based Email Spam Detection using Machine Learning</p>
              <p className="text-sm mt-1">Comparative Study: Logistic Regression vs Random Forest</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Technologies</h3>
              <p className="text-sm">Python, scikit-learn, TF-IDF, React, TypeScript</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Performance</h3>
              <p className="text-sm">Accuracy: 98.5% - 99.0%</p>
              <p className="text-sm">ROC-AUC: {'>'} 99.4%</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
            <p>Academic Project - Machine Learning for Spam Detection</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
