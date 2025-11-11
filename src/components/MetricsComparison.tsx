import { modelResults } from '../data/results';

export function MetricsComparison() {
  const { logistic_regression, random_forest } = modelResults;

  const metrics = [
    { name: 'Accuracy', lr: logistic_regression.accuracy, rf: random_forest.accuracy },
    { name: 'Precision', lr: logistic_regression.precision, rf: random_forest.precision },
    { name: 'Recall', lr: logistic_regression.recall, rf: random_forest.recall },
    { name: 'F1-Score', lr: logistic_regression.f1_score, rf: random_forest.f1_score },
    { name: 'ROC-AUC', lr: logistic_regression.roc_auc, rf: random_forest.roc_auc },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Metrics Comparison</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Logistic Regression</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Random Forest</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Winner</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, idx) => {
              const lrValue = (metric.lr * 100).toFixed(2);
              const rfValue = (metric.rf * 100).toFixed(2);
              const winner = metric.rf > metric.lr ? 'RF' : metric.lr > metric.rf ? 'LR' : 'Tie';

              return (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{metric.name}</td>
                  <td className={`text-center py-3 px-4 ${winner === 'LR' ? 'text-green-600 font-semibold' : 'text-gray-700'}`}>
                    {lrValue}%
                  </td>
                  <td className={`text-center py-3 px-4 ${winner === 'RF' ? 'text-green-600 font-semibold' : 'text-gray-700'}`}>
                    {rfValue}%
                  </td>
                  <td className="text-center py-3 px-4">
                    {winner === 'RF' && <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Random Forest</span>}
                    {winner === 'LR' && <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Logistic Reg.</span>}
                    {winner === 'Tie' && <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Tie</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Logistic Regression</h3>
          <p className="text-sm text-gray-700">Fast, efficient, and interpretable. Ideal for real-time applications with linear decision boundaries.</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Random Forest</h3>
          <p className="text-sm text-gray-700">Higher accuracy through ensemble learning. Captures complex patterns but requires more computation.</p>
        </div>
      </div>
    </div>
  );
}
