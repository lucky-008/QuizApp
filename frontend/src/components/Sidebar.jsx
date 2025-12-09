// Corrected brackets and structure

import React, { useState, useRef, useEffect } from 'react';
import { sidebarStyles } from '../assets/dummyStyles';
import { questionsData } from '../assets/dummyData';
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Code,
  Coffee,
  Cpu,
  Database,
  Globe,
  Layout,
  Sparkles,
  Star,
  Target,
  Terminal,
  Trophy,
  X,
  Zap,
  Menu
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE = "http://localhost:4000/";

const Sidebar = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const submittedRef = useRef(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const asideRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const technologies = [
    { id: "html", name: "HTML", icon: <Globe size={20} />, color: "bg-orange-50 text-orange-600 border-orange-200" },
    { id: "css", name: "CSS", icon: <Layout size={20} />, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { id: "js", name: "JavaScript", icon: <Code size={20} />, color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
    { id: "react", name: "React", icon: <Cpu size={20} />, color: "bg-cyan-50 text-cyan-600 border-cyan-200" },
    { id: "node", name: "Node.js", icon: <Code size={20} />, color: "bg-green-50 text-green-600 border-green-200" },
    { id: "mongodb", name: "MongoDB", icon: <Database size={20} />, color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { id: "java", name: "Java", icon: <Coffee size={20} />, color: "bg-red-50 text-red-600 border-red-200" },
    { id: "python", name: "Python", icon: <Terminal size={20} />, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { id: "cpp", name: "C++", icon: <Code size={20} />, color: "bg-purple-50 text-purple-600 border-purple-200" },
    { id: "bootstrap", name: "Bootstrap", icon: <Layout size={20} />, color: "bg-pink-50 text-pink-600 border-pink-200" },
  ];

  const levels = [
    { id: "basic", name: "Basic", questions: 20, icon: <Star size={16} />, color: "bg-green-50 text-green-600" },
    { id: "intermediate", name: "Intermediate", questions: 40, icon: <Zap size={16} />, color: "bg-blue-50 text-blue-600" },
    { id: "advanced", name: "Advanced", questions: 60, icon: <Target size={16} />, color: "bg-purple-50 text-purple-600" },
  ];

  const handleTechSelect = (techId) => {
    if (selectedTech === techId) {
      setSelectedTech(null);
      setSelectedLevel(null);
    } else {
      setSelectedTech(techId);
      setSelectedLevel(null);
    }
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;

    if (window.innerWidth < 768) setIsSidebarOpen(true);

    setTimeout(() => {
      const el = asideRef.current?.querySelector(`[data-tech="${techId}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;

    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = { ...userAnswers, [currentQuestion]: answerIndex };
    setUserAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < getQuestions().length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 500);
  };

  const getQuestions = () => {
    if (!selectedTech || !selectedLevel) return [];
    return questionsData[selectedTech]?.[selectedLevel] || [];
  };

  const calculateScore = () => {
    const questions = getQuestions();
    let correct = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) correct++;
    });
    return {
      correct,
      total: questions.length,
      percentage: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
  };

  const score = calculateScore();
  const performance = (() => {
    if (score.percentage >= 90)
      return {
        text: "Outstanding!",
        color: "bg-gradient-to-r from-amber-200 to-amber-300",
        icon: <Sparkles className="text-amber-800" />,
      };
    if (score.percentage >= 75)
      return {
        text: "Excellent!",
        color: "bg-gradient-to-r from-blue-200 to-indigo-200",
        icon: <Trophy className="text-blue-800" />,
      };
    if (score.percentage >= 60)
      return {
        text: "Good Job!",
        color: "bg-gradient-to-r from-green-200 to-teal-200",
        icon: <Award className="text-green-800" />,
      };
    return {
      text: "Keep Practicing",
      color: "bg-gradient-to-r from-gray-200 to-gray-300",
      icon: <BookOpen className="text-gray-800" />,
    };
  })();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const submitResult = async () => {
    if (submittedRef.current) return;
    if (!selectedTech || !selectedLevel) return;

    const payload = {
      title: `${selectedTech.toUpperCase()} - ${
        selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)
      } quiz`,
      technology: selectedTech,
      level: selectedLevel,
      totalQuestions: score.total,
      correct: score.correct,
      wrong: score.total - score.correct,
    };

    try {
      submittedRef.current = true;
      toast.info("Submitting your result...");

      const res = await axios.post(`${API_BASE}/api/results`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        timeout: 10000,
      });

      if (res.data && res.data.success) toast.success("Result submitted successfully!");
      else toast.error("Failed to submit result. Please try again.");
    } catch (err) {
      submittedRef.current = false;
      console.error("Error saving result:", err?.response?.data || err.message);
      toast.error("Could not save result. Check console or network.");
    }
  };

  useEffect(() => {
    if (showResults) submitResult();
  }, [showResults]);

  const questions = getQuestions();
  const currentQ = questions[currentQuestion];

  return (
    <div className={sidebarStyles.pageContainer}>
      {isSidebarOpen && (
        <div
          onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          className={sidebarStyles.mobileOverlay}
        ></div>
      )}

      <div className={sidebarStyles.mainContainer}>
        {/* Sidebar */}
        <aside
          ref={asideRef}
          className={`${sidebarStyles.sidebar} ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className={sidebarStyles.sidebarHeader}>
            <div className={sidebarStyles.headerDecoration1}></div>

            <div className={sidebarStyles.headerTop}>
              <h2 className={sidebarStyles.headerTitle}>Tech Quiz</h2>

              <button className={sidebarStyles.closeBtn} onClick={toggleSidebar}>
                <X size={20} />
              </button>
            </div>

            <p className={sidebarStyles.headerSubtitle}>Choose a technology and challenge yourself!</p>

            <div className={sidebarStyles.headerDecoration2}></div>
          </div>

          {/* Technology List */}
          <div className={sidebarStyles.section}>
            <h3 className={sidebarStyles.sectionTitle}>
              <ChevronRight size={18} />
              Technologies
            </h3>

            <div className={sidebarStyles.techList}>
              {technologies.map((tech) => (
                <div key={tech.id} data-tech={tech.id}>
                  <button
                    onClick={() => handleTechSelect(tech.id)}
                    className={`${sidebarStyles.techItem} ${
                      selectedTech === tech.id ? sidebarStyles.techItemActive : ""
                    }`}
                  >
                    <span className={`${sidebarStyles.techIcon} ${tech.color}`}>
                      {tech.icon}
                    </span>

                    <span className={sidebarStyles.techName}>{tech.name}</span>

                    <span className={sidebarStyles.chevronIcon}>
                      {selectedTech === tech.id ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </span>
                  </button>

                  {/* Levels List */}
                  {selectedTech === tech.id && (
                    <div className={sidebarStyles.levelList}>
                      {levels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => handleLevelSelect(level.id)}
                          className={`${sidebarStyles.levelItem} ${
                            selectedLevel === level.id
                              ? sidebarStyles.levelItemActive
                              : ""
                          }`}
                        >
                          <span className={`${sidebarStyles.levelIcon} ${level.color}`}>
                            {level.icon}
                          </span>

                          <span className={sidebarStyles.levelName}>{level.name}</span>

                          <span className={sidebarStyles.levelQuestions}>
                            {level.questions} Qs
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={sidebarStyles.contentArea}>
          <button className={sidebarStyles.menuButton} onClick={toggleSidebar}>
            <Menu size={24} />
          </button>

          {!selectedTech || !selectedLevel ? (
            <div className={sidebarStyles.placeholder}>
              <h2>Select a Technology & Level to Start!</h2>
            </div>
          ) : showResults ? (
            <div className={sidebarStyles.resultsCard}>
              <div className={`${sidebarStyles.performanceBox} ${performance.color}`}>
                {performance.icon}
                <h2>{performance.text}</h2>
              </div>

              <div className={sidebarStyles.scoreDetails}>
                <p>
                  Correct: <strong>{score.correct}</strong>
                </p>
                <p>
                  Wrong: <strong>{score.total - score.correct}</strong>
                </p>
                <p>
                  Percentage: <strong>{score.percentage}%</strong>
                </p>
              </div>

              <button onClick={resetQuiz} className={sidebarStyles.resetBtn}>
                Try Again
              </button>
            </div>
          ) : currentQ !== undefined ? (
            <div className={sidebarStyles.questionCard}>
              <h3 className={sidebarStyles.questionText}>
                {currentQuestion + 1}. {currentQ.question}
              </h3>

              <div className={sidebarStyles.optionsList}>
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    className={sidebarStyles.optionItem}
                    onClick={() => handleAnswerSelect(i)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center p-4">No questions available.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;

