const LOCALES = {
  en: {
    id: 'en',
    lang: 'en',
    dir: 'ltr',
    label: 'English',
  },
  he: {
    id: 'he',
    lang: 'he',
    dir: 'rtl',
    label: 'עברית',
  },
}

const UI_MESSAGES = {
  en: {
    languageLabel: 'Language',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    difficulty: 'Difficulty:',
    levels: {
      level01: 'Level 1',
      level02: 'Level 2',
      level03: 'Level 3',
      level05: 'Level 5',
      level07: 'Level 7',
    },
    emptyState: {
      title: 'Pick a topic to get started',
      description: 'Choose a math topic from the topics list to begin practising.',
    },
    errors: {
      exerciseLoad: 'Could not load this exercise.',
    },
    actions: {
      checkAnswers: 'Check Answers',
      checkAnswersTitle: 'Check your answers',
      giveHint: 'Give Hint',
      giveHintTitle: 'Get a hint',
      howToSolve: 'How to solve?',
      howToSolveTitle: 'Show the full solution',
      next: 'Next',
      nextTitle: 'Go to next exercise',
    },
    answerSectionTitle: 'Your Answer(s)',
    hintTitle: ({ count }) => (count > 1 ? 'Hints' : 'Hint'),
    solutionTitle: 'Step-by-step solution',
    scratchPad: {
      title: 'Scratch Pad',
      description: 'Your personal workspace - jot notes or work out your steps. This will not be checked.',
      placeholder: 'Write out your working, sketch your approach, or jot down notes here...',
    },
    feedback: {
      incorrect: ({ count }) => `Incorrect - ${count} attempt${count === 1 ? '' : 's'} remaining.`,
      correct: 'Correct! Great work!',
      failed: 'No more attempts. Click "How to solve?" to see the solution, or "Next" to continue.',
    },
    auth: {
      title: 'Account',
      loading: 'Checking your sign-in status...',
      notConfigured: 'Cloud sync is not configured yet. Add the Firebase environment variables to enable it.',
      signInHint: 'Sign in with Google to sync your progress across browsers and devices.',
      googleSignIn: 'Sign in with Google',
      signingIn: 'Signing in...',
      signOut: 'Sign out',
      signingOut: 'Signing out...',
      welcomeBack: 'Signed in',
    },
    sync: {
      disabled: 'Cloud sync unavailable',
      loading: 'Loading your cloud progress...',
      saving: 'Saving your progress...',
      ready: ({ time }) => (time ? `Last synced ${time}` : 'Cloud sync is on'),
      'signed-out': 'Saved on this device only',
      error: 'Cloud sync needs attention',
    },
    history: {
      count: ({ count }) => `${count} exercise${count === 1 ? '' : 's'}`,
      exercise: ({ index }) => `Exercise ${index}`,
    },
    mathrixLogoAlt: 'Mathrix logo',
  },
  he: {
    languageLabel: 'שפה',
    menu: 'תפריט',
    openMenu: 'פתחו תפריט',
    closeMenu: 'סגרו תפריט',
    difficulty: 'רמה:',
    levels: {
      level01: 'רמה 1',
      level02: 'רמה 2',
      level03: 'רמה 3',
      level05: 'רמה 5',
      level07: 'רמה 7',
    },
    emptyState: {
      title: 'בחרו נושא כדי להתחיל',
      description: 'בחרו נושא מתמטי מרשימת הנושאים כדי להתחיל לתרגל.',
    },
    errors: {
      exerciseLoad: 'לא הצלחנו לטעון את התרגיל הזה.',
    },
    actions: {
      checkAnswers: 'בדקו תשובות',
      checkAnswersTitle: 'בדקו את התשובות שלכם',
      giveHint: 'רמז',
      giveHintTitle: 'קבלו רמז',
      howToSolve: 'איך פותרים?',
      howToSolveTitle: 'הציגו את הפתרון המלא',
      next: 'הבא',
      nextTitle: 'עברו לתרגיל הבא',
    },
    answerSectionTitle: 'התשובות שלכם',
    hintTitle: ({ count }) => (count > 1 ? 'רמזים' : 'רמז'),
    solutionTitle: 'פתרון שלב אחר שלב',
    scratchPad: {
      title: 'טיוטה',
      description: 'מרחב העבודה האישי שלכם - כתבו הערות או שלבי פתרון. התוכן כאן לא נבדק.',
      placeholder: 'כתבו כאן את דרך הפתרון, רעיונות או הערות...',
    },
    feedback: {
      incorrect: ({ count }) => `לא נכון - נותרו עוד ${count} ${count === 1 ? 'ניסיון' : 'ניסיונות'}.`,
      correct: 'נכון! עבודה מצוינת!',
      failed: 'לא נשארו ניסיונות. לחצו על "איך פותרים?" כדי לראות את הפתרון, או על "הבא" כדי להמשיך.',
    },
    auth: {
      title: 'חשבון',
      loading: 'בודקים את מצב ההתחברות שלכם...',
      notConfigured: 'סנכרון הענן עדיין לא מוגדר. הוסיפו את משתני הסביבה של Firebase כדי להפעיל אותו.',
      signInHint: 'התחברו עם Google כדי לסנכרן את ההתקדמות שלכם בין דפדפנים ומכשירים.',
      googleSignIn: 'התחברות עם Google',
      signingIn: 'מתחברים...',
      signOut: 'התנתקות',
      signingOut: 'מתנתקים...',
      welcomeBack: 'מחוברים',
    },
    sync: {
      disabled: 'סנכרון הענן לא זמין',
      loading: 'טוענים את ההתקדמות שלכם מהענן...',
      saving: 'שומרים את ההתקדמות שלכם...',
      ready: ({ time }) => (time ? `הסנכרון האחרון היה ב־${time}` : 'סנכרון הענן פעיל'),
      'signed-out': 'השמירה היא רק על המכשיר הזה',
      error: 'סנכרון הענן דורש טיפול',
    },
    history: {
      count: ({ count }) => `${count} ${count === 1 ? 'תרגיל' : 'תרגילים'}`,
      exercise: ({ index }) => `תרגיל ${index}`,
    },
    mathrixLogoAlt: 'הלוגו של Mathrix',
  },
}

function getMessage(messages, key) {
  return key.split('.').reduce((value, part) => value?.[part], messages)
}

function resolveInputTranslations(overlayInputs) {
  if (!Array.isArray(overlayInputs)) return new Map()

  return new Map(
    overlayInputs
      .filter(input => input?.name)
      .map(input => [input.name, input])
  )
}

export function getLocale(language = 'en') {
  return LOCALES[language] || LOCALES.en
}

export function getSupportedLocales() {
  return Object.values(LOCALES)
}

export function translate(language, key, params = {}) {
  const localeMessages = UI_MESSAGES[language] || UI_MESSAGES.en
  const fallbackMessage = getMessage(UI_MESSAGES.en, key)
  const message = getMessage(localeMessages, key) ?? fallbackMessage ?? key

  if (typeof message === 'function') {
    return message(params)
  }

  return message
}

export function localizeTopic(topic, language = 'en') {
  const overlay = topic?.translations?.[language]

  if (!overlay?.name) {
    return topic
  }

  return {
    ...topic,
    name: overlay.name,
  }
}

export function localizeTopics(topics = [], language = 'en') {
  return topics.map(topic => localizeTopic(topic, language))
}

export function localizeExercise(exercise, language = 'en') {
  const overlay = exercise?.translations?.[language]

  if (!overlay) {
    return exercise
  }

  const localizedInputs = resolveInputTranslations(overlay.inputs)

  return {
    ...exercise,
    topicName: overlay.topicName ?? exercise.topicName,
    instructions: overlay.instructions ?? exercise.instructions,
    question: {
      ...exercise.question,
      text: overlay.question?.text ?? exercise.question?.text,
    },
    inputs: (exercise.inputs || []).map(input => {
      const inputOverlay = localizedInputs.get(input.name)
      if (!inputOverlay) return input

      return {
        ...input,
        label: inputOverlay.label ?? input.label,
      }
    }),
    hints: overlay.hints ?? exercise.hints,
    explanation: {
      ...exercise.explanation,
      steps: overlay.explanation?.steps ?? exercise.explanation?.steps,
    },
  }
}