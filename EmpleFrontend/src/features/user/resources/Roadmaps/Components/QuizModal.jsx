import React, { useState, useEffect } from 'react';

const QuizModal = ({ section, level, onClose, onComplete }) => {
  const t = {
    border: 'var(--border)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    textMuted: 'var(--muted2)',
    quizBg: 'var(--surface)',
    quizProgressBg: 'var(--surface2)',
  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = level && section.quizzes
    ? (section.quizzes[level] || [])
    : (section.quiz || section.quizQuestions || []);

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (currentQ && currentQ.type === 'msq') {
      const currentSelections = selectedAnswers[questionId] || [];
      let newSelections;
      if (currentSelections.includes(answerIndex)) {
        newSelections = currentSelections.filter(i => i !== answerIndex);
      } else {
        newSelections = [...currentSelections, answerIndex];
      }
      setSelectedAnswers({ ...selectedAnswers, [questionId]: newSelections });
    } else {
      setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      const correctAns = q.ans !== undefined ? q.ans : q.correctAnswer;
      if (q.type === 'msq') {
        const userAns = selectedAnswers[q.id] || [];
        const isCorrect = Array.isArray(correctAns) &&
          userAns.length === correctAns.length &&
          userAns.every(val => correctAns.includes(val));
        if (isCorrect) correct++;
      } else {
        if (selectedAnswers[q.id] === correctAns) correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  const handleFinish = () => {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;
    onComplete(passed, section.points, percentage, level);
    onClose();
  };

  const isAnswered = currentQ && (
    currentQ.type === 'msq'
      ? (selectedAnswers[currentQ.id] || []).length > 0
      : selectedAnswers[currentQ.id] !== undefined
  );

  const modalStyle = {
    background: t.quizBg,
    borderRadius: 16,
    width: '100%',
    maxWidth: 700,
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;
    return (
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: 20
        }}
      >
        <div style={modalStyle} onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div style={{
            padding: '24px 32px',
            borderBottom: `2px solid ${t.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text }}>Quiz Results</h2>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: 'none', background: t.border,
                fontSize: 24, cursor: 'pointer', color: t.textMuted
              }}
            >×</button>
          </div>

          {/* Results */}
          <div style={{ padding: '40px 32px', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block', padding: '12px 32px',
              borderRadius: 30, fontSize: 18, fontWeight: 700,
              marginBottom: 24,
              background: passed ? '#10b981' : '#ef4444',
              color: 'white'
            }}>
              {passed ? '✓ Passed' : '✗ Failed'}
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 48, fontWeight: 700, color: t.text, marginBottom: 8 }}>
                {score} / {questions.length}
              </h3>
              <p style={{ fontSize: 18, color: t.textMuted }}>{percentage.toFixed(0)}% Correct</p>
            </div>

            <div style={{
              padding: 24, borderRadius: 12, marginBottom: 32,
              background: passed ? '#f0fdf4' : '#fef2f2',
              border: `2px solid ${passed ? '#10b981' : '#ef4444'}`
            }}>
              {passed ? (
                <>
                  <p style={{ fontSize: 16, color: '#374151', margin: '8px 0' }}>
                    Congratulations! You've completed this section.
                  </p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#ff6b35', margin: '8px 0' }}>
                    +{section.points} points earned
                  </p>
                </>
              ) : (
                <p style={{ fontSize: 16, color: '#374151', margin: '8px 0' }}>
                  You need 70% or higher to pass. Review the content and try again!
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              {passed ? (
                <button
                  onClick={handleFinish}
                  style={{
                    padding: '12px 32px', borderRadius: 10,
                    fontSize: 15, fontWeight: 600, cursor: 'pointer',
                    border: 'none',
                    background: 'linear-gradient(135deg,#ff6b35 0%,#ff8c42 100%)',
                    color: 'white'
                  }}
                >
                  Continue
                </button>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    style={{
                      padding: '12px 32px', borderRadius: 10,
                      fontSize: 15, fontWeight: 600, cursor: 'pointer',
                      border: 'none', background: t.border, color: t.textMuted
                    }}
                  >
                    Review Content
                  </button>
                  <button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedAnswers({});
                      setShowResults(false);
                      setScore(0);
                    }}
                    style={{
                      padding: '12px 32px', borderRadius: 10,
                      fontSize: 15, fontWeight: 600, cursor: 'pointer',
                      border: 'none',
                      background: 'linear-gradient(135deg,#ff6b35 0%,#ff8c42 100%)',
                      color: 'white'
                    }}
                  >
                    Retry Quiz
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: 20
        }}
      >
        <div style={modalStyle} onClick={e => e.stopPropagation()}>
          <div style={{ padding: '40px 32px', textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, color: t.text, marginBottom: 12 }}>No Quiz Available</h3>
            <p style={{ color: t.textMuted, marginBottom: 24 }}>There is no quiz configured for this section yet.</p>
            <button onClick={onClose} style={{ padding: '10px 24px', borderRadius: 8, background: '#ff6b35', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 20
      }}
    >
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: `2px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text }}>
            {section.title} — {level ? `${level.charAt(0).toUpperCase() + level.slice(1)} Quiz` : 'Quiz'}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: 'none', background: t.border,
              fontSize: 24, cursor: 'pointer', color: t.textMuted
            }}
          >×</button>
        </div>

        {/* Progress bar */}
        <div style={{ padding: '24px 32px', background: t.quizProgressBg }}>
          <p style={{ fontSize: 14, color: t.textMuted, marginBottom: 8 }}>
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div style={{ height: 12, background: t.border, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              background: 'linear-gradient(90deg,#ff6b35 0%,#ff8c42 100%)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Question */}
        <div style={{ padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: t.text, marginBottom: 24 }}>
            {currentQ.q || currentQ.question}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(currentQ.opts || currentQ.options || []).map((option, index) => {
              const isSelected = currentQ.type === 'msq'
                ? (selectedAnswers[currentQ.id] || []).includes(index)
                : selectedAnswers[currentQ.id] === index;

              return (
                <label
                  key={index}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: 16,
                    border: `2px solid ${isSelected ? '#ff6b35' : t.optionBorder || t.border}`,
                    borderRadius: 10, cursor: 'pointer',
                    background: isSelected ? (t.hoverBg || t.surface2) : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <input
                    type={currentQ.type === 'msq' ? 'checkbox' : 'radio'}
                    name={`question-${currentQ.id}`}
                    checked={isSelected}
                    onChange={() => handleAnswerSelect(currentQ.id, index)}
                    style={{
                      marginRight: 12, width: 20, height: 20,
                      cursor: 'pointer', accentColor: '#ff6b35', flexShrink: 0
                    }}
                  />
                  <span style={{ flex: 1, fontSize: 15, color: t.text }}>{option}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{
          padding: '24px 32px',
          borderTop: `2px solid ${t.border}`,
          display: 'flex', justifyContent: 'space-between', gap: 16
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            style={{
              padding: '12px 32px', borderRadius: 10,
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              border: 'none', background: t.border, color: t.textMuted,
              opacity: currentQuestion === 0 ? 0.5 : 1
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            style={{
              padding: '12px 32px', borderRadius: 10,
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              border: 'none',
              background: isAnswered
                ? 'linear-gradient(135deg,#ff6b35 0%,#ff8c42 100%)'
                : t.border,
              color: isAnswered ? 'white' : t.textMuted,
              opacity: !isAnswered ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;