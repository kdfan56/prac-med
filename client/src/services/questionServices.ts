import axios from 'axios';

export interface Question {
  _id: string;
  category: string;
  subCategory: string;
  source: string;
  chapter: string;
  stem: string;
  options: string[];
  correctAnswer: string;
  rationale: string;
  highYieldSummary: string;
}

interface QuestionsResponse {
  count: number;
  questions: Question[];
}

export const fetchQuestions = async (params?: Record<string, string>) => {
  const { data } = await axios.get<QuestionsResponse>('/api/questions', { params });
  return data.questions;
};

export const fetchDemoQuestions = async () => {
  const { data } = await axios.get<QuestionsResponse>('/api/questions/demo');
  return data.questions;
};