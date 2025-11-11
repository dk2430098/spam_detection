import { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle } from 'lucide-react';

export function SpamDetector() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<{ isSpam: boolean; confidence: number } | null>(null);

  const spamKeywords = [
    'winner', 'free', 'prize', 'congratulations', 'click here', 'urgent',
    'cash', 'money', 'earn', 'limited time', 'act now', 'guarantee',
    'loan', 'credit', 'investment', 'claim', 'offer', 'discount'
  ];

  const detectSpam = () => {
    if (!message.trim()) return;

    const lowerMessage = message.toLowerCase();
    let spamScore = 0;

    spamKeywords.forEach(keyword => {
      if (lowerMessage.includes(keyword)) {
        spamScore += 1;
      }
    });

    const hasMultipleExclamations = (lowerMessage.match(/!/g) || []).length > 2;
    const hasMultipleCapitals = (message.match(/[A-Z]/g) || []).length > message.length * 0.3;
    const hasNumbers = /\d/.test(message);

    if (hasMultipleExclamations) spamScore += 2;
    if (hasMultipleCapitals) spamScore += 1;
    if (hasNumbers && spamScore > 0) spamScore += 0.5;

    const maxScore = 8;
    const confidence = Math.min((spamScore / maxScore) * 100, 99);
    const isSpam = spamScore > 2;

    setResult({
      isSpam,
      confidence: isSpam ? confidence : 100 - confidence
    });
  };

  const exampleMessages = {
    spam: "WINNER!! You have been selected to receive a FREE prize worth $1000! Click here to claim now!",
    ham: "Hey, are we still meeting for lunch tomorrow at noon? Let me know if you need to reschedule."
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-8 h-8 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Live Spam Detector</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter email message to test:
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent resize-none"
            rows={5}
            placeholder="Type or paste an email message here..."
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={detectSpam}
            disabled={!message.trim()}
            className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            Detect Spam
          </button>
          <button
            onClick={() => { setMessage(''); setResult(null); }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            Clear
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setMessage(exampleMessages.spam)}
            className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Try Spam Example
          </button>
          <button
            onClick={() => setMessage(exampleMessages.ham)}
            className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          >
            Try Ham Example
          </button>
        </div>

        {result && (
          <div className={`p-4 rounded-lg border-2 ${
            result.isSpam
              ? 'bg-red-50 border-red-300'
              : 'bg-green-50 border-green-300'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              {result.isSpam ? (
                <AlertTriangle className="w-6 h-6 text-red-600" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-600" />
              )}
              <div>
                <h3 className={`text-lg font-bold ${
                  result.isSpam ? 'text-red-800' : 'text-green-800'
                }`}>
                  {result.isSpam ? 'SPAM DETECTED' : 'LEGITIMATE MESSAGE'}
                </h3>
                <p className={`text-sm ${
                  result.isSpam ? 'text-red-700' : 'text-green-700'
                }`}>
                  Confidence: {result.confidence.toFixed(1)}%
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              {result.isSpam
                ? 'This message contains multiple spam indicators including promotional keywords, excessive punctuation, or suspicious patterns.'
                : 'This message appears to be legitimate with no significant spam indicators detected.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
