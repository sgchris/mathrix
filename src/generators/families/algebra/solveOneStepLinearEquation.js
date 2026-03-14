function formatEquation(prompt, solutionOverride = null) {
  const value = solutionOverride ?? prompt.expression.variable
  const leftSide = prompt.expression.variableOnLeft
    ? `${value} ${prompt.expression.operator} ${prompt.expression.constant}`
    : `${prompt.expression.constant} ${prompt.expression.operator} ${value}`

  return `${leftSide} = ${prompt.expression.result}`
}

function buildIntermediateEquation(prompt, inverseOperation, value) {
  const equation = formatEquation(prompt)
  const operatorSymbol = inverseOperation === 'subtract' ? '-' : '+'

  return `${equation.replace(' = ', ` ${operatorSymbol} ${value} = `)} ${operatorSymbol} ${value}`
}

function buildCheckEquation(prompt, solution) {
  return formatEquation(prompt, String(solution))
}

function createCandidate(random) {
  const mode = random.pick(['addition', 'subtraction'])
  const variableOnLeft = random.boolean()
  const constant = random.int(2, 9)

  if (mode === 'addition') {
    const solution = random.int(2, 16)
    return {
      operator: '+',
      inverseOperation: 'subtract',
      variableOnLeft,
      constant,
      solution,
      result: solution + constant,
    }
  }

  const solution = random.int(constant + 1, 18)
  return {
    operator: '-',
    inverseOperation: 'add',
    variableOnLeft,
    constant,
    solution,
    result: solution - constant,
  }
}

function isValidCandidate(candidate) {
  return candidate.solution > 0
    && candidate.result > 0
    && candidate.result <= 25
    && candidate.constant > 0
}

function createExercise(candidate, context) {
  const prompt = {
    kind: 'solve_for_variable',
    variable: 'x',
    template: candidate.operator === '+' ? 'one-step-addition' : 'one-step-subtraction',
    expression: {
      variable: 'x',
      variableOnLeft: candidate.variableOnLeft,
      operator: candidate.operator,
      constant: candidate.constant,
      result: candidate.result,
    },
  }
  const resultEquation = `x = ${candidate.solution}`
  const checkEquation = buildCheckEquation(prompt, candidate.solution)

  return {
    meta: {
      topicId: context.topicId,
      familyId: context.familyId,
      difficulty: context.difficulty,
      seed: context.seed,
      generatorVersion: context.generatorVersion,
      sourceId: context.exerciseId,
    },
    prompt,
    answers: [
      {
        name: 'x',
        inputType: 'number',
        correctAnswer: String(candidate.solution),
      },
    ],
    hints: [
      {
        kind: 'identify_inverse_operation',
        operation: candidate.inverseOperation,
        value: candidate.constant,
      },
      {
        kind: 'apply_inverse_to_both_sides',
        operation: candidate.inverseOperation,
        value: candidate.constant,
      },
    ],
    explanation: {
      steps: [
        {
          kind: 'start_equation',
          equation: formatEquation(prompt),
        },
        {
          kind: 'apply_inverse_to_both_sides',
          operation: candidate.inverseOperation,
          value: candidate.constant,
          equation: buildIntermediateEquation(prompt, candidate.inverseOperation, candidate.constant),
        },
        {
          kind: 'simplify_result',
          resultEquation,
        },
        {
          kind: 'check_solution',
          checkEquation,
        },
      ],
    },
  }
}

const solveOneStepLinearEquationFamily = {
  id: 'solve-one-step-linear-equation',
  topicId: 'algebra',
  generatorVersion: 1,
  supportedDifficulties: ['level01'],
  maxAttempts: 12,
  generateCandidate({ random }) {
    return createCandidate(random)
  },
  isValidCandidate(candidate) {
    return isValidCandidate(candidate)
  },
  createExercise(candidate, context) {
    return createExercise(candidate, context)
  },
}

export default solveOneStepLinearEquationFamily
