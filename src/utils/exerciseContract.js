function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function hasStringableValue(value) {
  return ['string', 'number'].includes(typeof value)
}

export function validateUiExercise(exercise) {
  const errors = []

  if (!isObject(exercise)) {
    return ['Exercise must be an object.']
  }

  if (!isNonEmptyString(exercise.id)) errors.push('Exercise id must be a non-empty string.')
  if (!isNonEmptyString(exercise.topicId)) errors.push('Exercise topicId must be a non-empty string.')
  if (!isNonEmptyString(exercise.topicName)) errors.push('Exercise topicName must be a non-empty string.')
  if (!isNonEmptyString(exercise.difficulty)) errors.push('Exercise difficulty must be a non-empty string.')
  if (!isNonEmptyString(exercise.instructions)) errors.push('Exercise instructions must be a non-empty string.')

  if (!isObject(exercise.question)) {
    errors.push('Exercise question must be an object.')
  } else {
    if (!isNonEmptyString(exercise.question.text)) {
      errors.push('Exercise question.text must be a non-empty string.')
    }

    if (exercise.question.mathExpression !== undefined) {
      if (!Array.isArray(exercise.question.mathExpression)) {
        errors.push('Exercise question.mathExpression must be an array when provided.')
      } else if (exercise.question.mathExpression.some(expression => !isNonEmptyString(expression))) {
        errors.push('Exercise question.mathExpression entries must be non-empty strings.')
      }
    }
  }

  if (!Array.isArray(exercise.inputs) || exercise.inputs.length === 0) {
    errors.push('Exercise inputs must be a non-empty array.')
  } else {
    exercise.inputs.forEach((input, index) => {
      if (!isObject(input)) {
        errors.push(`Exercise input ${index} must be an object.`)
        return
      }

      if (!isNonEmptyString(input.name)) errors.push(`Exercise input ${index} must include a name.`)
      if (!isNonEmptyString(input.label)) errors.push(`Exercise input ${index} must include a label.`)
      if (!isNonEmptyString(input.inputType)) errors.push(`Exercise input ${index} must include an inputType.`)
      if (!hasStringableValue(input.correctAnswer)) {
        errors.push(`Exercise input ${index} must include a string or numeric correctAnswer.`)
      }
    })
  }

  if (!Array.isArray(exercise.hints) || exercise.hints.some(hint => !isNonEmptyString(hint))) {
    errors.push('Exercise hints must be an array of non-empty strings.')
  }

  if (!isObject(exercise.explanation) || !Array.isArray(exercise.explanation.steps)) {
    errors.push('Exercise explanation.steps must be an array.')
  } else if (exercise.explanation.steps.some(step => !isNonEmptyString(step))) {
    errors.push('Exercise explanation.steps entries must be non-empty strings.')
  }

  return errors
}

export function assertValidUiExercise(exercise, context = 'exercise') {
  const errors = validateUiExercise(exercise)

  if (errors.length > 0) {
    throw new Error(`Invalid ${context}: ${errors.join(' ')}`)
  }

  return exercise
}
