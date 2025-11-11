import { Workflow } from 'lucide-react';

export function SystemArchitecture() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Workflow className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">System Architecture & Workflow</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            1
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-1">Data Collection</h3>
            <p className="text-sm text-gray-600">Load SMS dataset containing labeled spam and ham messages</p>
          </div>
        </div>

        <div className="ml-6 border-l-2 border-gray-300 h-8"></div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            2
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-1">Text Preprocessing</h3>
            <p className="text-sm text-gray-600">Lowercase conversion, punctuation removal, stopword filtering, tokenization</p>
          </div>
        </div>

        <div className="ml-6 border-l-2 border-gray-300 h-8"></div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            3
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-1">Feature Extraction</h3>
            <p className="text-sm text-gray-600">TF-IDF vectorization with 3000 features and bigram support</p>
          </div>
        </div>

        <div className="ml-6 border-l-2 border-gray-300 h-8"></div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            4
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-1">Data Splitting</h3>
            <p className="text-sm text-gray-600">80% training set, 20% test set with stratified sampling</p>
          </div>
        </div>

        <div className="ml-6 border-l-2 border-gray-300 h-8"></div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            5A
          </div>
          <div className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-1">Logistic Regression Training</h3>
            <p className="text-sm text-blue-700">Train linear classifier with L2 regularization</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
            5B
          </div>
          <div className="flex-1 bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-1">Random Forest Training</h3>
            <p className="text-sm text-green-700">Train ensemble of 100 decision trees with bagging</p>
          </div>
        </div>

        <div className="ml-6 border-l-2 border-gray-300 h-8"></div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            6
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-1">Model Evaluation</h3>
            <p className="text-sm text-gray-600">Calculate accuracy, precision, recall, F1-score, ROC-AUC, and confusion matrices</p>
          </div>
        </div>

        <div className="ml-6 border-l-2 border-gray-300 h-8"></div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            7
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-1">Comparative Analysis</h3>
            <p className="text-sm text-gray-600">Compare models and generate visualizations</p>
          </div>
        </div>

        <div className="ml-6 border-l-2 border-gray-300 h-8"></div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold">
            8
          </div>
          <div className="flex-1 bg-gradient-to-r from-gray-800 to-gray-600 p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-1">Deployment</h3>
            <p className="text-sm">Real-time spam detection system ready for production use</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2">Technology Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="font-medium text-gray-800">Language:</span> Python
          </div>
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="font-medium text-gray-800">ML Library:</span> scikit-learn
          </div>
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="font-medium text-gray-800">Data:</span> pandas, numpy
          </div>
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="font-medium text-gray-800">Features:</span> TF-IDF
          </div>
        </div>
      </div>
    </div>
  );
}
