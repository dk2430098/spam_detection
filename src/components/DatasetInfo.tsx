import { Database, BarChart3 } from 'lucide-react';
import { modelResults } from '../data/results';

export function DatasetInfo() {
  const { dataset_info } = modelResults;

  const stats = [
    { label: 'Total Samples', value: dataset_info.total_samples, color: 'bg-gray-100 text-gray-800' },
    { label: 'Spam Messages', value: dataset_info.spam_count, color: 'bg-red-100 text-red-800' },
    { label: 'Ham Messages', value: dataset_info.ham_count, color: 'bg-green-100 text-green-800' },
    { label: 'Training Set', value: dataset_info.train_size, color: 'bg-blue-100 text-blue-800' },
    { label: 'Test Set', value: dataset_info.test_size, color: 'bg-purple-100 text-purple-800' },
  ];

  const spamPercentage = (dataset_info.spam_count / dataset_info.total_samples) * 100;
  const hamPercentage = (dataset_info.ham_count / dataset_info.total_samples) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Dataset Information</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.color} rounded-lg p-4 text-center`}>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-800">Class Distribution</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">Spam</span>
              <span className="text-gray-800 font-medium">{spamPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full transition-all"
                style={{ width: `${spamPercentage}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">Ham</span>
              <span className="text-gray-800 font-medium">{hamPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${hamPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Dataset Source</h4>
          <p className="text-sm text-gray-600">
            SMS Spam Collection dataset with balanced representation of spam and legitimate messages.
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Preprocessing</h4>
          <p className="text-sm text-gray-600">
            Text normalization, stopword removal, and TF-IDF vectorization with 3000 features.
          </p>
        </div>
      </div>
    </div>
  );
}
