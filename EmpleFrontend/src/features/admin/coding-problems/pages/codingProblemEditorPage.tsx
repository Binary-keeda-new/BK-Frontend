'use client';

import { useEffect, useState } from 'react';
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer';

import CodingProblemTabs from '../components/codingProblemTabs';
import QuestionDetailsSection from '../components/questionDetailsSection';
import ProblemStatementSection from '../components/problemStatementSection';
import ExamplesSection from '../components/examplesSection';
import ConstraintsSection from '../components/constraintsSection';
import LanguagesSection from '../components/languagesSection';
import CodeTemplatesSection from '../components/codeTemplatesSection';
import TestCasesSection from '../components/testCasesSection';
import HintsSection from '../components/hintsSection';
import EditorialSection from '../components/editorialSection';
import PublishSection from '../components/publishSection';
import ExecutionSection from '../components/executionSection';

import { getAuthHeaders } from '@/shared/utils/api';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiFetch = async (url: string, options?: RequestInit) => {
  const headers = getAuthHeaders();
  return fetch(url.replace('/api/v1/coding-problems', '/api/v1/admin/coding-problems'), {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers || {}),
    },
    credentials: 'include',
  });
};

interface Props {
  problemId: string;
}

export default function CodingProblemEditorPage({
  problemId,
}: Props) {
  const [problem, setProblem] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [statement, setStatement] = useState('');

  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'error' }[]>([]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };
  

  const [examples, setExamples] = useState<
  {
    input: string;
    output: string;
    explanation: string;
  }[]
>([]);

const [constraints, setConstraints] = useState<
  string[]
>([]);

const [languages, setLanguages] = useState<
  string[]
>([]);

const [templateType, setTemplateType] =
  useState('boilerplate');

const [codeTemplates, setCodeTemplates] =
  useState({
    Java: '',
    Python: '',
    'C++': '',
    C: '',
  });

  const [lockedPrefixTemplates, setLockedPrefixTemplates] = useState({
  Java: '',
  Python: '',
  'C++': '',
  C: '',
});

const [lockedSuffixTemplates, setLockedSuffixTemplates] = useState({
  Java: '',
  Python: '',
  'C++': '',
  C: '',
});

const [executionConfig, setExecutionConfig] =
  useState({
    functionName: '',
    returnType: '',
    parameters: [] as {
      name: string;
      type: string;
    }[],
    timeLimit: 1000,
    memoryLimit: 256,
  });  

  const DEFAULT_TEMPLATES = {
  Java: `class Solution {

}`,
  Python: `class Solution:
    pass`,
  'C++': `class Solution {

};`,
  C: `#include <stdio.h>

int main() {

    return 0;
}`,
};

const [visibleTestCases, setVisibleTestCases] =
  useState<
    {
      input: string;
      output: string;
    }[]
  >([]);

const [hiddenTestCases, setHiddenTestCases] =
  useState<
    {
      input: string;
      output: string;
    }[]
  >([]);

  const [hints, setHints] = useState<
  string[]
>([]);

const [editorial, setEditorial] =
  useState('');



const [activeTab, setActiveTab] =
  useState('details');

  const [detailsForm, setDetailsForm] = useState({
    title: '',
    difficulty: 'Easy',
    topics: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDetailsForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDetails = async () => {
    if (
    !detailsForm.title.trim() ||
    !detailsForm.difficulty.trim() ||
    !detailsForm.topics.trim()
  ) {
    addToast('Please fill all fields', 'error');
    return;
  }


    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: detailsForm.title,
            difficulty: detailsForm.difficulty,
            
            topics: detailsForm.topics
              .split(',')
              .map((topic) => topic.trim())
              .filter(Boolean),
            lastEditedSection: 'statement'  
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        addToast(data.message, 'error');
        return;
      }

      setProblem(data.data);
      

      addToast('Details saved successfully', 'success'); 
      setActiveTab('statement');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveStatement = async () => {
  if (!statement.trim()) {
    addToast('Problem statement is required', 'error');
    return;
  }
  try {
    const response = await apiFetch(
      `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statement,
          lastEditedSection: 'examples'
        }),
        
      }
    );

    const data = await response.json();

    if (!response.ok) {
       addToast(data.message, 'error');
       return;
     }

    setProblem(data.data);

    addToast('Problem statement saved successfully', 'success');
    setActiveTab('examples');
  } catch (error) {
    console.error(error);
  }
};

const handleAddExample = () => {
  setExamples((prev) => [
    ...prev,
    {
      input: '',
      output: '',
      explanation: '',
    },
  ]);
};

const handleRemoveExample = (index: number) => {
  setExamples((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

const handleSaveExamples = async () => {
  const hasEmptyExample = examples.some(
  (example) =>
    !example.input.trim() ||
    !example.output.trim() ||
    !example.explanation.trim()
);

if (hasEmptyExample) {
  addToast('Please complete all examples', 'error');
  return;
}
  try {
    const response = await apiFetch(
      `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examples,
          lastEditedSection: 'constraints',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
       addToast(data.message, 'error');
       return;
     }

    setProblem(data.data);

    addToast('Examples saved successfully', 'success');
    setActiveTab('constraints');
  } catch (error) {
    console.error(error);
  }
};

   const handleAddConstraint = () => {
  setConstraints((prev) => [
    ...prev,
    '',
      ]);
  };

  const handleSaveConstraints =
  async () => {
    const hasEmptyConstraint =
      constraints.some(
        (constraint) =>
          !constraint.trim()
      );

    if (hasEmptyConstraint) {
      addToast('Please complete all constraints', 'error');
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            constraints,
            lastEditedSection:
              'languages',
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        addToast(data.message, 'error');
        return;
      }

      setProblem(data.data);

      addToast('Constraints saved successfully', 'success');

      setActiveTab('languages');
    } catch (error) {
      console.error(error);
    }
  };

   const handleRemoveConstraint = (
     index: number
   ) => {
     setConstraints((prev) =>
       prev.filter((_, i) => i !== index)
     );
   };

   const handleSaveLanguages =
  async () => {
    if (languages.length === 0) {
      addToast('Please select at least one language', 'error');
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            languages,
            lastEditedSection: 'execution'
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        addToast(data.message, 'error');
        return;
      }

      setProblem(data.data);

      addToast('Languages saved successfully', 'success');

      setCodeTemplates((prev) => {
  const updated = { ...prev };

  languages.forEach((language) => {
    const key =
  language as keyof typeof DEFAULT_TEMPLATES;

if (!updated[key]) {
  updated[key] =
    DEFAULT_TEMPLATES[key];
}
  });

  return updated;
});

      setActiveTab('templates');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveTemplates =
  async () => {
    if (templateType === 'boilerplate') {
  const hasEmptyTemplate = languages.some(
    (language) =>
      !codeTemplates[
        language as keyof typeof codeTemplates
      ]?.trim()
  );

  if (hasEmptyTemplate) {
    addToast('Please provide templates for all selected languages', 'error');
    return;
  }
}
    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
  templateType,
  codeTemplates,
  lockedPrefixTemplates,
  lockedSuffixTemplates,
  lastEditedSection: 'tests',
}),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        addToast(data.message, 'error');
        return;
      }

      setProblem(data.data);

      addToast('Templates saved successfully', 'success');

      setActiveTab('execution');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveTestCases = async () => {
  if (visibleTestCases.length === 0) {
    addToast('Add at least one visible test case', 'error');
    return;
  }

  if (hiddenTestCases.length === 0) {
    addToast('Add at least one hidden test case', 'error');
    return;
  }

  const hasEmptyVisible =
    visibleTestCases.some(
      (testCase) =>
        !testCase.input.trim() ||
        !testCase.output.trim()
    );

  const hasEmptyHidden =
    hiddenTestCases.some(
      (testCase) =>
        !testCase.input.trim() ||
        !testCase.output.trim()
    );

  if (
    hasEmptyVisible ||
    hasEmptyHidden
  ) {
    addToast('Please complete all test cases', 'error');
    return;
  }

  try {
    const response = await apiFetch(
      `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          visibleTestCases,
          hiddenTestCases,
          lastEditedSection:
            'hints',
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      addToast(data.message, 'error');
      return;
    }

    setProblem(data.data);

    addToast('Test cases saved successfully', 'success');

    setActiveTab('hints');
  } catch (error) {
    console.error(error);
  }
};
const handleSaveHints = async () => {
  const hasEmptyHint =
    hints.some(
      (hint) => !hint.trim()
    );

  if (hasEmptyHint) {
    addToast('Please complete all hints', 'error');
    return;
  }

  try {
    const response = await apiFetch(
      `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          hints,
          lastEditedSection:
            'editorial',
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      addToast(data.message, 'error');
      return;
    }

    setProblem(data.data);

    addToast('Hints saved successfully', 'success');

    setActiveTab('editorial');
  } catch (error) {
    console.error(error);
  }
};

const handleSaveEditorial =
  async () => {
    if (!editorial.trim()) {
      addToast('Editorial is required', 'error');
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            editorial,
            lastEditedSection:
              'publish',
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        addToast(data.message, 'error');
        return;
      }

      setProblem(data.data);

      addToast('Editorial saved successfully', 'success');

      setActiveTab('publish');
    } catch (error) {
      console.error(error);
    }
  };


  const handleSaveDraft =
  async () => {
    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            status: 'draft',
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        addToast(data.message, 'error');
        return;
      }

      setProblem(data.data);

      addToast('Draft saved successfully', 'success');
    } catch (error) {
      console.error(error);
    }
  };
const handlePublish =
  async () => {
    if (
  !problem.title ||
  !problem.statement ||
  problem.examples.length === 0 ||
  problem.constraints.length === 0 ||
  problem.languages.length === 0 ||
  problem.visibleTestCases.length === 0 ||
  problem.hiddenTestCases.length === 0 ||
  problem.hints.length === 0 ||
  !problem.editorial
) {
  addToast('Please complete all sections before publishing', 'error');
  return;
}
    try {
      const response = await apiFetch(
        `${API_BASE_URL}/api/v1/coding-problems/${problemId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            status: 'published',
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        addToast(data.message, 'error');
        return;
      }

      setProblem(data.data);

      addToast('Problem published successfully', 'success');
    } catch (error) {
      console.error(error);
    }
  };
  const handlePreview = () => {
  addToast('Preview page coming next', 'error');
};

const handleSaveExecution = async () => {
  try {
    const response = await apiFetch(
      `http://localhost:5000/api/v1/admin/coding-problems/${problemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...executionConfig,
          lastEditedSection: 'tests',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      addToast(data.message, 'error');
      return;
    }

    setProblem(data.data);

    addToast('Execution configuration saved successfully', 'success');

    setActiveTab('tests');
  } catch (error) {
    console.error(error);
    addToast('Failed to save execution configuration', 'error');
  }
};

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await apiFetch(
          `${API_BASE_URL}/api/v1/coding-problems/${problemId}`
        );

        const data = await response.json();
        
        if (!response.ok || !data.data) {
          console.error(data.message || 'Failed to fetch problem');
          setError(data.message || 'Failed to fetch problem');
          return;
        }

        setProblem(data.data);
        setActiveTab(
           data.data.lastEditedSection || 'details'
         );
         
        setStatement(data.data.statement || '');

        setExamples(data.data.examples || []);

        setConstraints(
          data.data.constraints || []
        );

        setLanguages(
          data.data.languages || []
        );

        setTemplateType(
          data.data.templateType ||
            'boilerplate'
        );
               
        setCodeTemplates(
          data.data.codeTemplates || {
            Java: '',
            Python: '',
            'C++': '',
            C: '',
          }
        );

       setLockedPrefixTemplates(
          data.data.lockedPrefixTemplates || {
            Java: '',
            Python: '',
            'C++': '',
            C: '',
          }
        );

        setLockedSuffixTemplates(
          data.data.lockedSuffixTemplates || {
            Java: '',
            Python: '',
            'C++': '',
            C: '',
          }
        );

        setVisibleTestCases(
          data.data.visibleTestCases || []
        );
        
        setHiddenTestCases(
          data.data.hiddenTestCases || []
        );

        setHints(
          data.data.hints || []
        );

        setEditorial(
          data.data.editorial || ''
        );

        setExecutionConfig({
          functionName:
            data.data.functionName || '',
        
          returnType:
            data.data.returnType || '',
        
          parameters:
            data.data.parameters || [],
        
          timeLimit:
            data.data.timeLimit || 1000,
        
          memoryLimit:
            data.data.memoryLimit || 256,
        });

        

        setDetailsForm({
          title: data.data.title || '',
          difficulty: data.data.difficulty || 'Easy',
          topics: data.data.topics?.join(', ') || '',
        });
      } catch (error: any) {
        console.error(error);
        setError(error.message || 'An error occurred while fetching');
      }
    };

    fetchProblem();
  }, [problemId]);

  if (error) {
    return (
      <div className="p-6 md:p-10 text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="p-6 md:p-10">
      <ToastContainer toasts={toasts} />
        Loading problem...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="mb-8 text-3xl font-bold text-[var(--clr-text)]">
        {problem.title}
      </h1>

      <>
  <CodingProblemTabs
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />

  {activeTab === 'details' && (
    <QuestionDetailsSection
      detailsForm={detailsForm}
      handleChange={handleChange}
      handleSaveDetails={handleSaveDetails}
    />
  )}

  {activeTab === 'statement' && (
    <ProblemStatementSection
      statement={statement}
      setStatement={setStatement}
      handleSaveStatement={handleSaveStatement}
    />
  )}

  {activeTab === 'examples' && (
    <ExamplesSection
      examples={examples}
      setExamples={setExamples}
      handleAddExample={handleAddExample}
      handleRemoveExample={handleRemoveExample}
      handleSaveExamples={handleSaveExamples}
    />
  )}

  {activeTab === 'constraints' && (
  <ConstraintsSection
    constraints={constraints}
    setConstraints={setConstraints}
    handleAddConstraint={
      handleAddConstraint
    }
    handleRemoveConstraint={
      handleRemoveConstraint
    }
    handleSaveConstraints={
      handleSaveConstraints
    }
  />
)}
  {activeTab === 'languages' && (
    <div className="rounded-2xl border border-[var(--clr-border)] p-6">
      <LanguagesSection
        languages={languages}
        setLanguages={setLanguages}
        codeTemplates={codeTemplates}
        setCodeTemplates={setCodeTemplates}
        handleSaveLanguages={
          handleSaveLanguages
        }
      />
    </div>
  )}

  {activeTab === 'templates' && (
 <CodeTemplatesSection
  languages={languages}
  templateType={templateType}
  setTemplateType={setTemplateType}
  codeTemplates={codeTemplates}
  setCodeTemplates={setCodeTemplates}
  lockedPrefixTemplates={lockedPrefixTemplates}
  setLockedPrefixTemplates={setLockedPrefixTemplates}
  lockedSuffixTemplates={lockedSuffixTemplates}
  setLockedSuffixTemplates={setLockedSuffixTemplates}
  handleSaveTemplates={handleSaveTemplates}
/>
)}

  {activeTab === 'tests' && (
  <TestCasesSection
    visibleTestCases={
      visibleTestCases
    }
    hiddenTestCases={
      hiddenTestCases
    }
    setVisibleTestCases={
      setVisibleTestCases
    }
    setHiddenTestCases={
      setHiddenTestCases
    }
    handleSaveTestCases={
      handleSaveTestCases
    }
  />
)}

{activeTab === 'execution' && (
  <ExecutionSection
    executionConfig={executionConfig}
    setExecutionConfig={setExecutionConfig}
    handleSaveExecution={handleSaveExecution}
  />
)}

  {activeTab === 'hints' && (
  <HintsSection
    hints={hints}
    setHints={setHints}
    handleSaveHints={
      handleSaveHints
    }
  />
)}

  {activeTab === 'editorial' && (
  <EditorialSection
    editorial={editorial}
    setEditorial={setEditorial}
    handleSaveEditorial={
      handleSaveEditorial
    }
  />
)}

  {activeTab === 'publish' && (
  <PublishSection
    handleSaveDraft={handleSaveDraft}
    handlePreview={handlePreview}
    handlePublish={handlePublish}
  />
)}
</>
    </div>
  );
}