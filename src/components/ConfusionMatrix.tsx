interface ConfusionMatrixProps {
  matrix: number[][];
  title: string;
  color: 'blue' | 'green';
}

export function ConfusionMatrix({ matrix, title, color }: ConfusionMatrixProps) {
  const [[tn, fp], [fn, tp]] = matrix;
  const total = tn + fp + fn + tp;

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      light: 'bg-blue-100',
      dark: 'bg-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      light: 'bg-green-100',
      dark: 'bg-green-600',
    },
  };

  const colors = colorClasses[color];

  const getIntensity = (value: number) => {
    const percentage = (value / total) * 100;
    if (percentage > 40) return colors.dark;
    if (percentage > 20) return 'bg-opacity-70 ' + colors.dark;
    if (percentage > 5) return colors.light;
    return 'bg-gray-100';
  };

  return (
    <div className={`${colors.bg} rounded-lg border ${colors.border} p-6`}>
      <h3 className={`text-lg font-semibold ${colors.text} mb-4`}>{title}</h3>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div></div>
        <div className="text-center font-semibold text-sm text-gray-700">Predicted Ham</div>
        <div className="text-center font-semibold text-sm text-gray-700">Predicted Spam</div>

        <div className="text-right font-semibold text-sm text-gray-700 flex items-center justify-end">Actual Ham</div>
        <div className={`${getIntensity(tn)} rounded p-4 text-center border border-gray-300`}>
          <div className="text-2xl font-bold text-gray-800">{tn}</div>
          <div className="text-xs text-gray-600 mt-1">True Negative</div>
        </div>
        <div className={`${getIntensity(fp)} rounded p-4 text-center border border-gray-300`}>
          <div className="text-2xl font-bold text-gray-800">{fp}</div>
          <div className="text-xs text-gray-600 mt-1">False Positive</div>
        </div>

        <div className="text-right font-semibold text-sm text-gray-700 flex items-center justify-end">Actual Spam</div>
        <div className={`${getIntensity(fn)} rounded p-4 text-center border border-gray-300`}>
          <div className="text-2xl font-bold text-gray-800">{fn}</div>
          <div className="text-xs text-gray-600 mt-1">False Negative</div>
        </div>
        <div className={`${getIntensity(tp)} rounded p-4 text-center border border-gray-300`}>
          <div className="text-2xl font-bold text-gray-800">{tp}</div>
          <div className="text-xs text-gray-600 mt-1">True Positive</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white rounded p-2 border border-gray-200">
          <span className="font-medium text-gray-700">Accuracy:</span>
          <span className="ml-2 text-gray-800">{((tn + tp) / total * 100).toFixed(2)}%</span>
        </div>
        <div className="bg-white rounded p-2 border border-gray-200">
          <span className="font-medium text-gray-700">Error Rate:</span>
          <span className="ml-2 text-gray-800">{((fp + fn) / total * 100).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
