<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <h1 class="title">🧮 Matemática Divertida! 🎉</h1>
      <div class="score-board">
        <div class="score">
          <span class="score-label">Pontos:</span>
          <span class="score-value">{{ score }}</span>
        </div>
        <div class="streak" v-if="streak > 1">
          <span class="streak-label">Sequência:</span>
          <span class="streak-value">{{ streak }}🔥</span>
        </div>
      </div>
    </header>

    <!-- Game Area -->
    <main class="game-container">
      <div class="question-card" :class="{ 'correct': showCorrect, 'incorrect': showIncorrect }">
        <div class="question">
          <span class="number">{{ currentQuestion.num1 }}</span>
          <span class="operator">{{ currentQuestion.operator }}</span>
          <span class="number">{{ currentQuestion.num2 }}</span>
          <span class="equals">=</span>
          <span class="result">?</span>
        </div>
        
        <div class="feedback" v-if="showFeedback">
          <div v-if="showCorrect" class="correct-feedback">
            <span class="emoji">🎉</span>
            <span class="text">Muito bem!</span>
          </div>
          <div v-if="showIncorrect" class="incorrect-feedback">
            <span class="emoji">😅</span>
            <span class="text">Tente novamente!</span>
          </div>
        </div>
      </div>

      <!-- Answer Options -->
      <div class="answers-grid">
        <button 
          v-for="option in answerOptions" 
          :key="option"
          class="answer-btn"
          @click="checkAnswer(option)"
          :disabled="showFeedback"
        >
          {{ option }}
        </button>
      </div>

      <!-- Operation Selector -->
      <div class="operation-selector">
        <h3>Escolha a operação:</h3>
        <div class="operations">
          <button 
            v-for="op in operations" 
            :key="op.symbol"
            class="operation-btn"
            :class="{ 'active': selectedOperation === op.symbol }"
            @click="selectOperation(op.symbol)"
          >
            <span class="op-symbol">{{ op.symbol }}</span>
            <span class="op-name">{{ op.name }}</span>
          </button>
        </div>
      </div>

      <!-- Difficulty Selector -->
      <div class="difficulty-selector">
        <h3>Nível de dificuldade:</h3>
        <div class="difficulty-buttons">
          <button 
            v-for="level in difficultyLevels" 
            :key="level.name"
            class="difficulty-btn"
            :class="{ 'active': selectedDifficulty === level.name }"
            @click="selectDifficulty(level.name)"
          >
            {{ level.emoji }} {{ level.name }}
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 Ítalo Moura - Desenvolvido com 💙 AWS Amazon Q CLI</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MathKidsApp',
  data() {
    return {
      score: 0,
      streak: 0,
      currentQuestion: {
        num1: 0,
        num2: 0,
        operator: '+',
        correctAnswer: 0
      },
      answerOptions: [],
      showFeedback: false,
      showCorrect: false,
      showIncorrect: false,
      selectedOperation: '+',
      selectedDifficulty: 'Fácil',
      operations: [
        { symbol: '+', name: 'Soma' },
        { symbol: '-', name: 'Subtração' },
        { symbol: '*', name: 'Multiplicação' },
        { symbol: '/', name: 'Divisão' }
      ],
      difficultyLevels: [
        { name: 'Fácil', emoji: '😊', range: 10 },
        { name: 'Médio', emoji: '🤔', range: 50 },
        { name: 'Difícil', emoji: '🤯', range: 100 }
      ]
    }
  },
  mounted() {
    this.generateQuestion()
  },
  methods: {
    generateQuestion() {
      const difficulty = this.difficultyLevels.find(d => d.name === this.selectedDifficulty)
      const maxNum = difficulty.range
      
      let num1, num2, correctAnswer
      
      switch (this.selectedOperation) {
        case '+':
          num1 = Math.floor(Math.random() * maxNum) + 1
          num2 = Math.floor(Math.random() * maxNum) + 1
          correctAnswer = num1 + num2
          break
        case '-':
          num1 = Math.floor(Math.random() * maxNum) + 1
          num2 = Math.floor(Math.random() * num1) + 1
          correctAnswer = num1 - num2
          break
        case '*':
          const maxMult = Math.min(maxNum, 12)
          num1 = Math.floor(Math.random() * maxMult) + 1
          num2 = Math.floor(Math.random() * maxMult) + 1
          correctAnswer = num1 * num2
          break
        case '/':
          num2 = Math.floor(Math.random() * 10) + 1
          correctAnswer = Math.floor(Math.random() * 10) + 1
          num1 = num2 * correctAnswer
          break
      }
      
      this.currentQuestion = {
        num1,
        num2,
        operator: this.selectedOperation,
        correctAnswer
      }
      
      this.generateAnswerOptions(correctAnswer)
    },
    
    generateAnswerOptions(correctAnswer) {
      const options = new Set([correctAnswer])
      
      while (options.size < 4) {
        let wrongAnswer
        if (this.selectedOperation === '/' && correctAnswer < 10) {
          wrongAnswer = Math.floor(Math.random() * 10) + 1
        } else {
          const variation = Math.floor(Math.random() * 20) - 10
          wrongAnswer = Math.max(0, correctAnswer + variation)
        }
        
        if (wrongAnswer !== correctAnswer && wrongAnswer >= 0) {
          options.add(wrongAnswer)
        }
      }
      
      this.answerOptions = Array.from(options).sort(() => Math.random() - 0.5)
    },
    
    checkAnswer(selectedAnswer) {
      if (selectedAnswer === this.currentQuestion.correctAnswer) {
        this.showCorrect = true
        this.score += 10
        this.streak += 1
        this.playSuccessSound()
      } else {
        this.showIncorrect = true
        this.streak = 0
        this.playErrorSound()
      }
      
      this.showFeedback = true
      
      setTimeout(() => {
        this.showFeedback = false
        this.showCorrect = false
        this.showIncorrect = false
        this.generateQuestion()
      }, 1500)
    },
    
    selectOperation(operation) {
      this.selectedOperation = operation
      this.generateQuestion()
    },
    
    selectDifficulty(difficulty) {
      this.selectedDifficulty = difficulty
      this.generateQuestion()
    },
    
    playSuccessSound() {
      // Simula som de sucesso com vibração no mobile
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100])
      }
    },
    
    playErrorSound() {
      // Simula som de erro com vibração no mobile
      if (navigator.vibrate) {
        navigator.vibrate([200])
      }
    }
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Header */
.header {
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.title {
  font-size: 2rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.score-board {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.score, .streak {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Game Container */
.game-container {
  flex: 1;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

/* Question Card */
.question-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 400px;
}

.question-card.correct {
  background: linear-gradient(45deg, #56ab2f, #a8e6cf);
  animation: bounce 0.6s ease-in-out;
}

.question-card.incorrect {
  background: linear-gradient(45deg, #ff6b6b, #ffa8a8);
  animation: shake 0.5s ease-in-out;
}

.question {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 3rem;
  font-weight: bold;
  color: #4a5568;
  margin-bottom: 1rem;
}

.number, .operator, .equals, .result {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.operator {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
}

.result {
  background: linear-gradient(45deg, #a8e6cf, #56ab2f);
}

/* Feedback */
.feedback {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.correct-feedback {
  color: #27ae60;
}

.incorrect-feedback {
  color: #e74c3c;
}

.emoji {
  font-size: 2rem;
  margin-right: 0.5rem;
}

/* Answer Grid */
.answers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.answer-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Comic Neue', cursive;
}

.answer-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.answer-btn:active {
  transform: translateY(0);
}

.answer-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Operation Selector */
.operation-selector, .difficulty-selector {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.operation-selector h3, .difficulty-selector h3 {
  text-align: center;
  color: #4a5568;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.operations {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.operation-btn {
  background: linear-gradient(45deg, #feca57, #ff9ff3);
  border: none;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Comic Neue', cursive;
}

.operation-btn.active {
  background: linear-gradient(45deg, #56ab2f, #a8e6cf);
  transform: scale(1.05);
}

.op-symbol {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.op-name {
  display: block;
  font-size: 0.9rem;
  color: white;
  margin-top: 0.25rem;
}

/* Difficulty Buttons */
.difficulty-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.difficulty-btn {
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Comic Neue', cursive;
  font-weight: bold;
  color: #4a5568;
}

.difficulty-btn.active {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  transform: scale(1.05);
}

/* Footer */
.footer {
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  text-align: center;
  color: #4a5568;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }
  
  .question {
    font-size: 2rem;
    gap: 0.5rem;
  }
  
  .number, .operator, .equals, .result {
    padding: 0.3rem 0.6rem;
    font-size: 1.8rem;
  }
  
  .answer-btn {
    padding: 1rem;
    font-size: 1.2rem;
  }
  
  .operations {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .difficulty-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .difficulty-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .game-container {
    padding: 1rem;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .question {
    font-size: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .number, .operator, .equals, .result {
    font-size: 1.3rem;
    padding: 0.25rem 0.5rem;
  }
  
  .answers-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .operations {
    grid-template-columns: 1fr;
  }
  
  .score-board {
    gap: 1rem;
  }
}
</style>
