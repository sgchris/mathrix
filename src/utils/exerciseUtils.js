import { getGenerativeExercise, mergeTopicsWithGenerativeExercises, supportsGenerativeExercise } from './exerciseSources/generativeExerciseSource.js'
import { getStaticExercise, getStaticTopicsRaw } from './exerciseSources/staticExerciseSource.js'
import { localizeTopics } from './localization.js'

function listExercisesForTopic(topics = [], topicId) {
  return topics.find(topic => topic.id === topicId)?.exercises || []
}

function getExerciseSource(topicId, exerciseId) {
  if (supportsGenerativeExercise(topicId, exerciseId)) {
    return 'generative'
  }

  return 'static'
}

export async function fetchTopics(language = 'en') {
  const topics = await getStaticTopicsRaw()
  return localizeTopics(mergeTopicsWithGenerativeExercises(topics), language)
}

export async function fetchExercise(topicId, exerciseId, language = 'en') {
  const source = getExerciseSource(topicId, exerciseId)

  if (source === 'generative') {
    return getGenerativeExercise({ topicId, exerciseId, language })
  }

  return getStaticExercise({ topicId, exerciseId, language })
}

export async function listTopicExercises(topicId) {
  const topics = mergeTopicsWithGenerativeExercises(await getStaticTopicsRaw())
  return listExercisesForTopic(topics, topicId)
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
