import assert from 'node:assert/strict'
import test from 'node:test'
import { buildGeneratedExerciseId, parseExerciseIdentity } from '../utils/exerciseId.js'
import { validateUiExercise } from '../utils/exerciseContract.js'
import { mergeTopicsWithGenerativeExercises, supportsGenerativeExercise } from '../utils/exerciseSources/generativeExerciseSource.js'
import { createExerciseInstance } from './engine/createExerciseInstance.js'
import { toUiExercise } from './renderers/toUiExercise.js'
import { listGeneratedExerciseIdsForTopic } from './topicManifests.js'

test('parseExerciseIdentity handles static and generated IDs', () => {
  const staticIdentity = parseExerciseIdentity('algebra-level01-026')
  assert.equal(staticIdentity.sourceType, 'static')
  assert.equal(staticIdentity.topicId, 'algebra')
  assert.equal(staticIdentity.levelId, 'level01')
  assert.equal(staticIdentity.serial, 26)

  const generatedId = buildGeneratedExerciseId({
    topicId: 'algebra',
    familyId: 'solve-one-step-linear-equation',
    difficulty: 'level01',
    seed: '000101',
  })
  const generatedIdentity = parseExerciseIdentity(generatedId)

  assert.equal(generatedIdentity.sourceType, 'generated')
  assert.equal(generatedIdentity.topicId, 'algebra')
  assert.equal(generatedIdentity.familyId, 'solve-one-step-linear-equation')
  assert.equal(generatedIdentity.levelId, 'level01')
  assert.equal(generatedIdentity.serial, 101)
})

test('algebra topic manifests expose a generated seed pool in mixed mode', () => {
  const generatedIds = listGeneratedExerciseIdsForTopic('algebra')

  assert.equal(generatedIds.length, 24)
  assert.equal(supportsGenerativeExercise('algebra', generatedIds[0]), true)

  const mergedTopics = mergeTopicsWithGenerativeExercises([
    {
      id: 'algebra',
      name: 'Algebra',
      exercises: ['algebra-level01-026'],
    },
  ])

  assert.equal(mergedTopics[0].exercises.includes('algebra-level01-026'), true)
  assert.equal(mergedTopics[0].exercises.includes(generatedIds[0]), true)
})

test('generated algebra exercises are deterministic and locale-safe', () => {
  const generatedId = buildGeneratedExerciseId({
    topicId: 'algebra',
    familyId: 'solve-one-step-linear-equation',
    difficulty: 'level01',
    seed: '000101',
  })

  const firstInstance = createExerciseInstance({ exerciseId: generatedId })
  const secondInstance = createExerciseInstance({ exerciseId: generatedId })

  assert.deepEqual(firstInstance, secondInstance)

  const englishExercise = toUiExercise(firstInstance, 'en')
  const hebrewExercise = toUiExercise(firstInstance, 'he')

  assert.deepEqual(validateUiExercise(englishExercise), [])
  assert.deepEqual(validateUiExercise(hebrewExercise), [])
  assert.equal(englishExercise.id, generatedId)
  assert.equal(hebrewExercise.id, generatedId)
  assert.notEqual(englishExercise.instructions, hebrewExercise.instructions)
  assert.deepEqual(englishExercise.question.mathExpression, hebrewExercise.question.mathExpression)
  assert.equal(englishExercise.inputs[0].correctAnswer, firstInstance.answers[0].correctAnswer)
})