import { FileText, Download } from 'lucide-react';
import { reportContent } from '../data/results';
import { useState } from 'react';

export function ProjectReport() {
  const [activeSection, setActiveSection] = useState<string>('abstract');

  const sections = [
    { id: 'abstract', title: 'Abstract' },
    { id: 'introduction', title: 'Introduction' },
    { id: 'problem', title: 'Problem Statement' },
    { id: 'objectives', title: 'Objectives' },
    { id: 'literature', title: 'Literature Review' },
    { id: 'methodology', title: 'Methodology' },
    { id: 'algorithms', title: 'Algorithms' },
    { id: 'results', title: 'Results' },
    { id: 'discussion', title: 'Discussion' },
    { id: 'conclusion', title: 'Conclusion' },
    { id: 'future', title: 'Future Scope' },
    { id: 'references', title: 'References' },
  ];

  const handleDownload = () => {
    const reportText = `
AI-BASED EMAIL SPAM DETECTION USING MACHINE LEARNING
A Comparative Study of Random Forest and Logistic Regression

================================================================================

ABSTRACT
${reportContent.abstract}

INTRODUCTION
${reportContent.introduction}

PROBLEM STATEMENT
${reportContent.problemStatement}

OBJECTIVES
${reportContent.objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

LITERATURE REVIEW
${reportContent.literatureReview}

METHODOLOGY
${reportContent.methodology}

ALGORITHMS USED

Logistic Regression:
${reportContent.algorithms.logisticRegression}

Random Forest:
${reportContent.algorithms.randomForest}

RESULTS AND ANALYSIS
${reportContent.results}

DISCUSSION
${reportContent.discussion}

CONCLUSION
${reportContent.conclusion}

FUTURE SCOPE
${reportContent.futureScope.map((item, i) => `${i + 1}. ${item}`).join('\n\n')}

REFERENCES
${reportContent.references.map((ref, i) => `[${i + 1}] ${ref}`).join('\n\n')}

================================================================================
End of Report
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Spam_Detection_Project_Report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'abstract':
        return <p className="text-gray-700 leading-relaxed">{reportContent.abstract}</p>;
      case 'introduction':
        return <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.introduction}</div>;
      case 'problem':
        return <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.problemStatement}</div>;
      case 'objectives':
        return (
          <ul className="list-decimal list-inside space-y-2 text-gray-700">
            {reportContent.objectives.map((obj, i) => (
              <li key={i} className="leading-relaxed">{obj}</li>
            ))}
          </ul>
        );
      case 'literature':
        return <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.literatureReview}</div>;
      case 'methodology':
        return <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.methodology}</div>;
      case 'algorithms':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Logistic Regression</h4>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.algorithms.logisticRegression}</div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Random Forest</h4>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.algorithms.randomForest}</div>
            </div>
          </div>
        );
      case 'results':
        return <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.results}</div>;
      case 'discussion':
        return <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.discussion}</div>;
      case 'conclusion':
        return <div className="text-gray-700 leading-relaxed whitespace-pre-line">{reportContent.conclusion}</div>;
      case 'future':
        return (
          <ul className="space-y-3 text-gray-700">
            {reportContent.futureScope.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );
      case 'references':
        return (
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {reportContent.references.map((ref, i) => (
              <li key={i} className="leading-relaxed text-sm">{ref}</li>
            ))}
          </ol>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-800">Academic Project Report</h2>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-gray-800 text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {sections.find(s => s.id === activeSection)?.title}
            </h3>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
