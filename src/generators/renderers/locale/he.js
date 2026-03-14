function formatMath(expression) {
  return `$$ ${expression} $$`
}

export default {
  instructions() {
    return 'פתרו עבור x.'
  },
  questionText() {
    return 'מה הערך של x?'
  },
  inputLabel(answer) {
    return `${answer.name} =`
  },
  hint(hint) {
    if (hint.kind === 'identify_inverse_operation') {
      return hint.operation === 'subtract'
        ? `חשבו איזה מספר, כשמוסיפים לו ${hint.value}, נותן את הסכום.`
        : `חשבו איזה מספר, כשמחסרים ממנו ${hint.value}, נותן את התוצאה.`
    }

    return hint.operation === 'subtract'
      ? `חסרו ${hint.value} משני האגפים כדי לבודד את x.`
      : `הוסיפו ${hint.value} לשני האגפים כדי לבודד את x.`
  },
  explanationStep(step, index) {
    if (step.kind === 'start_equation') {
      return `${index}. מתחילים עם ${formatMath(step.equation)}.`
    }

    if (step.kind === 'apply_inverse_to_both_sides') {
      const verb = step.operation === 'subtract' ? 'מחסרים' : 'מוסיפים'
      return `${index}. ${verb} ${step.value} משני האגפים: ${formatMath(step.equation)}.`
    }

    if (step.kind === 'simplify_result') {
      return `${index}. מפשטים: ${formatMath(step.resultEquation)}.`
    }

    return `${index}. בודקים: ${formatMath(step.checkEquation)} ✓`
  },
}
