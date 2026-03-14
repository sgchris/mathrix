import { buildGeneratedExerciseId } from '../utils/exerciseId.js'

const GENERATIVE_ALGEBRA_LEVEL01_ENABLED = (import.meta.env?.VITE_ENABLE_GENERATIVE_ALGEBRA_LEVEL01 ?? 'true') !== 'false'

export const GENERATED_TOPIC_MANIFESTS = {
  algebra: {
    topicNames: {
      en: 'Algebra',
      he: 'אלגברה',
    },
    families: [
      {
        familyId: 'solve-one-step-linear-equation',
        generatorVersion: 1,
        enabled: GENERATIVE_ALGEBRA_LEVEL01_ENABLED,
        difficulties: [
          {
            id: 'level01',
            seedPoolSize: 24,
            seedStart: 101,
          },
        ],
      },
    ],
  },
}

function formatSeed(seedNumber) {
  return String(seedNumber).padStart(6, '0')
}

export function getGeneratedTopicManifest(topicId) {
  return GENERATED_TOPIC_MANIFESTS[topicId] || null
}

export function listGeneratedExerciseIdsForTopic(topicId) {
  const manifest = getGeneratedTopicManifest(topicId)
  if (!manifest) return []

  return manifest.families
    .filter(family => family.enabled)
    .flatMap(family => family.difficulties.flatMap(difficulty => {
      return Array.from({ length: difficulty.seedPoolSize }, (_, index) => {
        const seed = formatSeed(difficulty.seedStart + index)

        return buildGeneratedExerciseId({
          topicId,
          familyId: family.familyId,
          difficulty: difficulty.id,
          seed,
          generatorVersion: family.generatorVersion,
        })
      })
    }))
}

export function supportsGeneratedExercise({ topicId, familyId, difficulty }) {
  const manifest = getGeneratedTopicManifest(topicId)
  if (!manifest) return false

  return manifest.families.some(family => {
    if (!family.enabled || family.familyId !== familyId) {
      return false
    }

    return family.difficulties.some(entry => entry.id === difficulty)
  })
}

export function getGeneratedTopicName(topicId, language = 'en') {
  const manifest = getGeneratedTopicManifest(topicId)
  if (!manifest) return topicId

  return manifest.topicNames[language] || manifest.topicNames.en || topicId
}
