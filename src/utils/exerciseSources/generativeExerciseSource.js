import { createExerciseInstance } from '../../generators/engine/createExerciseInstance.js'
import { toUiExercise } from '../../generators/renderers/toUiExercise.js'
import {
  listGeneratedExerciseIdsForTopic,
  supportsGeneratedExercise,
} from '../../generators/topicManifests.js'
import { isGeneratedExerciseId, parseExerciseIdentity } from '../exerciseId.js'

export function listGenerativeExercisesForTopic(topicId) {
  return listGeneratedExerciseIdsForTopic(topicId)
}

export function supportsGenerativeExercise(topicId, exerciseId) {
  if (!isGeneratedExerciseId(exerciseId)) {
    return false
  }

  const identity = parseExerciseIdentity(exerciseId)
  if (identity.topicId !== topicId) {
    return false
  }

  return supportsGeneratedExercise({
    topicId: identity.topicId,
    familyId: identity.familyId,
    difficulty: identity.levelId,
  })
}

export function mergeTopicsWithGenerativeExercises(topics = []) {
  return topics.map(topic => {
    const generatedExerciseIds = listGenerativeExercisesForTopic(topic.id)
    if (generatedExerciseIds.length === 0) {
      return topic
    }

    const exerciseIds = [...new Set([...(topic.exercises || []), ...generatedExerciseIds])]

    return {
      ...topic,
      exercises: exerciseIds,
    }
  })
}

export async function getGenerativeExercise({ topicId, exerciseId, language = 'en' }) {
  if (!supportsGenerativeExercise(topicId, exerciseId)) {
    throw new Error(`Unsupported generated exercise: ${exerciseId}`)
  }

  const instance = createExerciseInstance({ exerciseId })
  return toUiExercise(instance, language)
}
