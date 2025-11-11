import { modelResults } from '../data/results';

export function ROCCurve() {
  const { roc_curves } = modelResults;
  const lr = roc_curves.logistic_regression;
  const rf = roc_curves.random_forest;

  const width = 400;
  const height = 400;
  const padding = 50;

  const scaleX = (val: number) => padding + val * (width - 2 * padding);
  const scaleY = (val: number) => height - padding - val * (height - 2 * padding);

  const createPath = (fpr: number[], tpr: number[]) => {
    return fpr.map((x, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(x)} ${scaleY(tpr[i])}`).join(' ');
  };

  const lrPath = createPath(lr.fpr, lr.tpr);
  const rfPath = createPath(rf.fpr, rf.tpr);
  const diagonalPath = `M ${scaleX(0)} ${scaleY(0)} L ${scaleX(1)} ${scaleY(1)}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">ROC Curve Comparison</h2>

      <svg width={width} height={height} className="mx-auto">
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#374151"
          strokeWidth="2"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#374151"
          strokeWidth="2"
        />

        <path d={diagonalPath} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="5,5" fill="none" />

        <path d={lrPath} stroke="#3B82F6" strokeWidth="3" fill="none" />
        <path d={rfPath} stroke="#10B981" strokeWidth="3" fill="none" />

        {[0, 0.25, 0.5, 0.75, 1].map((val) => (
          <g key={val}>
            <line
              x1={scaleX(val)}
              y1={height - padding}
              x2={scaleX(val)}
              y2={height - padding + 5}
              stroke="#374151"
              strokeWidth="1"
            />
            <text
              x={scaleX(val)}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6B7280"
            >
              {val.toFixed(2)}
            </text>

            <line
              x1={padding - 5}
              y1={scaleY(val)}
              x2={padding}
              y2={scaleY(val)}
              stroke="#374151"
              strokeWidth="1"
            />
            <text
              x={padding - 10}
              y={scaleY(val) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#6B7280"
            >
              {val.toFixed(2)}
            </text>
          </g>
        ))}

        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize="14"
          fill="#374151"
          fontWeight="bold"
        >
          False Positive Rate
        </text>

        <text
          x={15}
          y={height / 2}
          textAnchor="middle"
          fontSize="14"
          fill="#374151"
          fontWeight="bold"
          transform={`rotate(-90, 15, ${height / 2})`}
        >
          True Positive Rate
        </text>
      </svg>

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-blue-500"></div>
          <span className="text-sm text-gray-700">Logistic Regression (AUC: {modelResults.logistic_regression.roc_auc.toFixed(4)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-green-500"></div>
          <span className="text-sm text-gray-700">Random Forest (AUC: {modelResults.random_forest.roc_auc.toFixed(4)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 border-b border-dashed border-gray-400"></div>
          <span className="text-sm text-gray-700">Random Classifier</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600 text-center">
        Both models show excellent discrimination with AUC {'>'} 0.99, indicating strong separation between spam and ham classes.
      </p>
    </div>
  );
}
