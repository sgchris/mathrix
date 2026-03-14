import { localizeExercise, localizeTopics } from '../localization.js'
import { assertValidUiExercise } from '../exerciseContract.js'

const base = import.meta.env?.BASE_URL ?? '/'

async function fetchJson(relativePath, errorMessage) {
  const response = await fetch(`${base}${relativePath}`)
  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json()
}

export async function getStaticTopics(language = 'en') {
  const topics = await getStaticTopicsRaw()
  return localizeTopics(topics, language)
}

export async function getStaticTopicsRaw() {
  return fetchJson('exercises/topics.json', 'Failed to fetch topics')
}

export async function getStaticExercise({ topicId, exerciseId, language = 'en' }) {
  const exercise = await fetchJson(
    `exercises/${topicId}/${exerciseId}.json`,
    `Failed to fetch exercise: ${exerciseId}`
  )

  return assertValidUiExercise(
    localizeExercise(exercise, language),
    `static exercise ${exerciseId}`
  )
}
