import { localizeExercise, localizeTopics } from './localization'

const base = import.meta.env.BASE_URL

export async function fetchTopics(language = 'en') {
  const res = await fetch(`${base}exercises/topics.json`)
  if (!res.ok) throw new Error('Failed to fetch topics')
  const topics = await res.json()
  return localizeTopics(topics, language)
}

export async function fetchExercise(topicId, exerciseId, language = 'en') {
  const res = await fetch(`${base}exercises/${topicId}/${exerciseId}.json`)
  if (!res.ok) throw new Error(`Failed to fetch exercise: ${exerciseId}`)
  const exercise = await res.json()
  return localizeExercise(exercise, language)
}

export function validateAnswers(exerciseInputs, userInputs) {
  return exerciseInputs.every(({ name, correctAnswer, inputType }) => {
    const userValue = (userInputs[name] ?? '').toString().trim()
    const expected = correctAnswer.toString().trim()
    if (inputType === 'number') {
      return parseFloat(userValue) === parseFloat(expected)
    }
    return userValue.toLowerCase() === expected.toLowerCase()
  })
}

export function areInputsComplete(exerciseInputs, userInputs) {
  return exerciseInputs.every(({ name }) => {
    return (userInputs[name] ?? '').toString().trim() !== ''
  })
}

export function inputsMatchFailedAttempt(failedAnswers, currentInputs) {
  return failedAnswers.some(attempt =>
    Object.keys(attempt).every(name => attempt[name] === currentInputs[name])
  )
}
