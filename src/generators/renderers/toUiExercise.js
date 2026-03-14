import { getGeneratedTopicName } from '../topicManifests.js'
import { assertValidUiExercise } from '../../utils/exerciseContract.js'
import en from './locale/en.js'
import he from './locale/he.js'

const LOCALE_RENDERERS = {
  en,
  he,
}

function renderEquation(prompt) {
  const leftSide = prompt.expression.variableOnLeft
    ? `${prompt.expression.variable} ${prompt.expression.operator} ${prompt.expression.constant}`
    : `${prompt.expression.constant} ${prompt.expression.operator} ${prompt.expression.variable}`

  return `${leftSide} = ${prompt.expression.result}`
}

export function toUiExercise(instance, language = 'en') {
  const locale = LOCALE_RENDERERS[language] || LOCALE_RENDERERS.en
  const exercise = {
    id: instance.meta.sourceId,
    topicId: instance.meta.topicId,
    topicName: getGeneratedTopicName(instance.meta.topicId, language),
    difficulty: instance.meta.difficulty,
    instructions: locale.instructions(instance),
    question: {
      text: locale.questionText(instance),
      mathExpression: [`$$ ${renderEquation(instance.prompt)} $$`],
    },
    inputs: instance.answers.map(answer => ({
      name: answer.name,
      label: locale.inputLabel(answer, instance),
      inputType: answer.inputType,
      correctAnswer: answer.correctAnswer,
    })),
    hints: instance.hints.map(hint => locale.hint(hint, instance)),
    explanation: {
      steps: instance.explanation.steps.map((step, index) => locale.explanationStep(step, index + 1, instance)),
    },
  }

  return assertValidUiExercise(exercise, `generated UI exercise ${exercise.id}`)
}
