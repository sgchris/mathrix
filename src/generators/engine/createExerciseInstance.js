import { parseExerciseIdentity } from '../../utils/exerciseId.js'
import { getGeneratorFamily } from './generatorRegistry.js'
import { createSeededRandom } from './seededRandom.js'
import { assertValidGeneratedExercise } from './validateGeneratedExercise.js'

export function createExerciseInstance({ exerciseId, topicId, familyId, difficulty, seed, generatorVersion }) {
  const parsed = exerciseId
    ? parseExerciseIdentity(exerciseId)
    : {
        topicId,
        familyId,
        levelId: difficulty,
        seed,
        generatorVersion: generatorVersion || 1,
      }

  const resolvedFamily = getGeneratorFamily(parsed.familyId)
  if (!resolvedFamily) {
    throw new Error(`Unknown generator family: ${parsed.familyId}`)
  }

  if (resolvedFamily.topicId !== parsed.topicId) {
    throw new Error(`Generator family ${resolvedFamily.id} does not support topic ${parsed.topicId}`)
  }

  if (!resolvedFamily.supportedDifficulties.includes(parsed.levelId)) {
    throw new Error(`Generator family ${resolvedFamily.id} does not support difficulty ${parsed.levelId}`)
  }

  const random = createSeededRandom(`${parsed.topicId}:${parsed.familyId}:${parsed.levelId}:${parsed.seed}:v${parsed.generatorVersion || resolvedFamily.generatorVersion}`)
  const maxAttempts = resolvedFamily.maxAttempts || 8

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = resolvedFamily.generateCandidate({
      difficulty: parsed.levelId,
      random,
      seed: parsed.seed,
      topicId: parsed.topicId,
    })

    if (!resolvedFamily.isValidCandidate(candidate)) {
      continue
    }

    return assertValidGeneratedExercise(
      resolvedFamily.createExercise(candidate, {
        exerciseId,
        topicId: parsed.topicId,
        familyId: parsed.familyId,
        difficulty: parsed.levelId,
        seed: parsed.seed,
        generatorVersion: parsed.generatorVersion || resolvedFamily.generatorVersion,
      }),
      `generated exercise ${exerciseId || parsed.familyId}`
    )
  }

  throw new Error(`Could not generate a valid exercise for ${exerciseId || parsed.familyId}`)
}
