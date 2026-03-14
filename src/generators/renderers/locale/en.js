function formatMath(expression) {
  return `$$ ${expression} $$`
}

export default {
  instructions() {
    return 'Solve for x.'
  },
  questionText() {
    return 'What is the value of x?'
  },
  inputLabel(answer) {
    return `${answer.name} =`
  },
  hint(hint) {
    if (hint.kind === 'identify_inverse_operation') {
      return hint.operation === 'subtract'
        ? `Think about what number plus ${hint.value} gives the total.`
        : `Think about what number minus ${hint.value} gives the total.`
    }

    return hint.operation === 'subtract'
      ? `Subtract ${hint.value} from both sides to isolate x.`
      : `Add ${hint.value} to both sides to isolate x.`
  },
  explanationStep(step, index) {
    if (step.kind === 'start_equation') {
      return `${index}. Start with ${formatMath(step.equation)}.`
    }

    if (step.kind === 'apply_inverse_to_both_sides') {
      const verb = step.operation === 'subtract' ? 'Subtract' : 'Add'
      return `${index}. ${verb} ${step.value} on both sides: ${formatMath(step.equation)}.`
    }

    if (step.kind === 'simplify_result') {
      return `${index}. Simplify: ${formatMath(step.resultEquation)}.`
    }

    return `${index}. Check: ${formatMath(step.checkEquation)} ✓`
  },
}
