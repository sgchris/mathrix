const STATIC_EXERCISE_ID_PATTERN = /^(.*?)-(level\d{2}|easy|medium|hard)-(\d+)$/
const GENERATED_EXERCISE_ID_PATTERN = /^([a-z0-9-]+)--([a-z0-9-]+)--(level\d{2}|easy|medium|hard)--([a-z0-9-]+)(?:--v(\d+))?$/i

function normalizeLegacyLevelId(levelId) {
  if (levelId === 'easy') return 'level01'
  if (levelId === 'medium') return 'level03'
  if (levelId === 'hard') return 'level05'
  return levelId || null
}

function getSerialFromSeed(seed) {
  if (!seed) return 0

  const digits = seed.replace(/\D/g, '')
  return digits ? Number(digits) : 0
}

export function parseExerciseIdentity(exerciseId = '') {
  const generatedMatch = exerciseId.match(GENERATED_EXERCISE_ID_PATTERN)
  if (generatedMatch) {
    const [, topicId, familyId, rawLevelId, seed, version] = generatedMatch

    return {
      id: exerciseId,
      sourceType: 'generated',
      topicId,
      familyId,
      rawLevelId,
      levelId: normalizeLegacyLevelId(rawLevelId),
      seed,
      serial: getSerialFromSeed(seed),
      generatorVersion: version ? Number(version) : 1,
    }
  }

  const staticMatch = exerciseId.match(STATIC_EXERCISE_ID_PATTERN)
  if (staticMatch) {
    const [, topicId, rawLevelId, serial] = staticMatch

    return {
      id: exerciseId,
      sourceType: 'static',
      topicId,
      familyId: null,
      rawLevelId,
      levelId: normalizeLegacyLevelId(rawLevelId),
      seed: null,
      serial: Number(serial),
      generatorVersion: null,
    }
  }

  return {
    id: exerciseId,
    sourceType: 'unknown',
    topicId: '',
    familyId: null,
    rawLevelId: null,
    levelId: null,
    seed: null,
    serial: 0,
    generatorVersion: null,
  }
}

export function getExerciseTopicId(exerciseId = '') {
  return parseExerciseIdentity(exerciseId).topicId || ''
}

export function isGeneratedExerciseId(exerciseId = '') {
  return parseExerciseIdentity(exerciseId).sourceType === 'generated'
}

export function buildGeneratedExerciseId({ topicId, familyId, difficulty, seed, generatorVersion }) {
  const baseId = `${topicId}--${familyId}--${difficulty}--${seed}`

  if (!generatorVersion || generatorVersion === 1) {
    return baseId
  }

  return `${baseId}--v${generatorVersion}`
}
