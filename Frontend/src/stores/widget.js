// stores/chats.js
import { defineStore } from 'pinia'
const API_URL = import.meta.env.VITE_BE_ENDPOINT


export const useWidgetStore = defineStore('widget', {
  state: () => {
    return {
      questionList: [], //Holds all questions
      isUserLogin: false,
      user: null,
      selectedQuestion: null,  //Holds current selected question
      selectedQuestionIndex: 0,
      assesmentResult: [],    // Holds Assesment Results for each test
      assesmentCompeted: false
    }
  },
  getters: {
    getQuestion: (state) => state.questionList,
    getSelectedQuestion: (state) => state.selectedQuestion,
    getSelectedQuestionIndex: (state) => state.selectedQuestionIndex,
    getAssesmentResult: (state) => state.assesmentResult,
    isAssesmentCompleted: (state) => state.assesmentCompeted
  },

  actions: {
    setLogin(iUserData) {
      this.isUserLogin = true
      this.user = {
        name: iUserData?.userName
      }
      this.questionList = iUserData?.questionList || []
      this.selectedQuestion = iUserData?.questionList[0] || null
      localStorage.clear();
    },
    setLogout() {
      this.isUserLogin = false
      this.user = null;
      this.assesmentCompeted = false;
      localStorage.clear();
    },
    selectNextQuestion() {
      this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
      this.selectedQuestion = this.questionList[this.selectedQuestionIndex];
    },
    saveProgress(iPayload) {
      localStorage.setItem(iPayload.qId, iPayload.code);
    },
    async runAssesment(qId) {
      try {
        let code = localStorage.getItem(qId);
        let payload = { qId, script: null }
        if (code) {
          payload.script = code
        }

        const rawResponse = await fetch(`${API_URL}/executeTest`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...payload
          })
        });
        const content = await rawResponse.json();
        this.assesmentResult.push(content);

      } catch (error) {
        console.log("ERROR: Problem in code submission")
      }
    },
    setAssesmentCompleted() {
      this.assesmentCompeted = true;
    }
  },
})