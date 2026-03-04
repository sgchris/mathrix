import { useReducer, useEffect, useState } from 'react'
import { fetchTopics } from '../utils/exerciseUtils'
import { AppContext } from './useApp'

const STORAGE_KEY = 'mathrix_state'

const initialState = {
  activeTopic: null,
  activeExerciseId: null,
  topicHistory: {},
  exerciseStates: {},
}

function getExerciseState(state, exerciseId) {
  return (
    state.exerciseStates[exerciseId] || {
      status: 'pending',
      attempts: 0,
      failedAnswers: [],
      currentInputs: {},
      hintIndex: 0,
      showExplanation: false,
      reasoning: '',
    }
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_TOPIC': {
      const { topicId, firstExerciseId } = action.payload
      const existingHistory = state.topicHistory[topicId] || []
      const history =
        existingHistory.length > 0 ? existingHistory : [firstExerciseId]
      // Resume at the most recent exercise in history
      const activeExerciseId = history[history.length - 1]
      return {
        ...state,
        activeTopic: topicId,
        activeExerciseId,
        topicHistory: {
          ...state.topicHistory,
          [topicId]: history,
        },
      }
    }

    case 'SELECT_EXERCISE': {
      return {
        ...state,
        activeExerciseId: action.payload.exerciseId,
      }
    }

    case 'NEXT_EXERCISE': {
      const { topicId, nextExerciseId } = action.payload
      const history = state.topicHistory[topicId] || []
      const updatedHistory = history.includes(nextExerciseId)
        ? history
        : [...history, nextExerciseId]
      return {
        ...state,
        activeExerciseId: nextExerciseId,
        topicHistory: {
          ...state.topicHistory,
          [topicId]: updatedHistory,
        },
      }
    }

    case 'ANSWER_RESULT': {
      const { exerciseId, correct, userInputs } = action.payload
      const current = getExerciseState(state, exerciseId)
      const newAttempts = current.attempts + 1
      let newStatus = current.status
      let newFailedAnswers = current.failedAnswers

      if (correct) {
        newStatus = 'solved'
      } else {
        newFailedAnswers = [...current.failedAnswers, { ...userInputs }]
        if (newAttempts >= 3) {
          newStatus = 'failed'
        }
      }

      return {
        ...state,
        exerciseStates: {
          ...state.exerciseStates,
          [exerciseId]: {
            ...current,
            status: newStatus,
            attempts: newAttempts,
            failedAnswers: newFailedAnswers,
          },
        },
      }
    }

    case 'SHOW_HINT': {
      const { exerciseId, maxHints } = action.payload
      const current = getExerciseState(state, exerciseId)
      return {
        ...state,
        exerciseStates: {
          ...state.exerciseStates,
          [exerciseId]: {
            ...current,
            hintIndex: Math.min(current.hintIndex + 1, maxHints),
          },
        },
      }
    }

    case 'SHOW_EXPLANATION': {
      const { exerciseId } = action.payload
      const current = getExerciseState(state, exerciseId)
      const newStatus = ['solved', 'failed'].includes(current.status)
        ? current.status
        : 'explanation_shown'
      return {
        ...state,
        exerciseStates: {
          ...state.exerciseStates,
          [exerciseId]: {
            ...current,
            showExplanation: true,
            status: newStatus,
          },
        },
      }
    }

    case 'UPDATE_INPUTS': {
      const { exerciseId, inputs } = action.payload
      const current = getExerciseState(state, exerciseId)
      return {
        ...state,
        exerciseStates: {
          ...state.exerciseStates,
          [exerciseId]: {
            ...current,
            currentInputs: inputs,
          },
        },
      }
    }

    case 'UPDATE_REASONING': {
      const { exerciseId, reasoning } = action.payload
      const current = getExerciseState(state, exerciseId)
      return {
        ...state,
        exerciseStates: {
          ...state.exerciseStates,
          [exerciseId]: {
            ...current,
            reasoning,
          },
        },
      }
    }

    default:
      return state
  }
}

export default function AppProvider({ children }) {
  const [topics, setTopics] = useState([])

  const [appState, dispatch] = useReducer(reducer, null, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialState
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    fetchTopics().then(setTopics).catch(console.error)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState))
  }, [appState])

  return (
    <AppContext.Provider value={{ appState, dispatch, topics }}>
      {children}
    </AppContext.Provider>
  )
}


