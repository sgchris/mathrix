function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function validateGeneratedExercise(instance) {
  const errors = []

  if (!isObject(instance)) {
    return ['Generated exercise must be an object.']
  }

  if (!isObject(instance.meta)) {
    errors.push('Generated exercise meta must be an object.')
  } else {
    if (typeof instance.meta.topicId !== 'string' || !instance.meta.topicId) errors.push('Generated exercise meta.topicId is required.')
    if (typeof instance.meta.familyId !== 'string' || !instance.meta.familyId) errors.push('Generated exercise meta.familyId is required.')
    if (typeof instance.meta.difficulty !== 'string' || !instance.meta.difficulty) errors.push('Generated exercise meta.difficulty is required.')
    if (typeof instance.meta.seed !== 'string' || !instance.meta.seed) errors.push('Generated exercise meta.seed is required.')
  }

  if (!isObject(instance.prompt) || typeof instance.prompt.kind !== 'string') {
    errors.push('Generated exercise prompt.kind is required.')
  }

  if (!Array.isArray(instance.answers) || instance.answers.length === 0) {
    errors.push('Generated exercise answers must be a non-empty array.')
  }

  if (!Array.isArray(instance.hints) || instance.hints.length === 0) {
    errors.push('Generated exercise hints must be a non-empty array.')
  }

  if (!isObject(instance.explanation) || !Array.isArray(instance.explanation.steps) || instance.explanation.steps.length === 0) {
    errors.push('Generated exercise explanation.steps must be a non-empty array.')
  }

  return errors
}

export function assertValidGeneratedExercise(instance, context = 'generated exercise') {
  const errors = validateGeneratedExercise(instance)

  if (errors.length > 0) {
    throw new Error(`Invalid ${context}: ${errors.join(' ')}`)
  }

  return instance
}
