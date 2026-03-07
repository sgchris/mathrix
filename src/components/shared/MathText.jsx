import katex from 'katex'

// Renders a string that may contain $$...$$ LaTeX expressions.
// displayMode=true renders block-level (centered) math; false renders inline.
export default function MathText({ text, displayMode = false }) {
  if (!text) return null

  const parts = text.split(/(\$\$[^$]+\$\$)/g)

  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\$\$(.+)\$\$$/s)
        if (match) {
          const latex = match[1].trim()
          const html = katex.renderToString(latex, {
            throwOnError: false,
            displayMode,
          })
          return (
            <span
              key={i}
              className={displayMode ? 'math-block' : 'math-inline'}
              dir="ltr"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        }
        if (part) return <span key={i}>{part}</span>
        return null
      })}
    </>
  )
}
