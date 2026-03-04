# AI Exercise Generation Guide for Mathrix

When generating Mathrix exercises using AI, you must strictly output a valid JSON object matching the `exercise_template.json` structure. The exercises must be appropriate for teenagers aged 11-14, ensuring they are not too simple but not impossibly complex. 

## Prompt Instructions to Generate an Exercise

Use the following guidelines when instructing an AI to generate a JSON exercise file:

### 1. Essential Parameters
Always specify the following in your prompt:
- **Topic**: (e.g., Algebra, Fractions, Geometry)
- **Target Age**: 11-14 years. Keep language accessible, encouraging, and clear.
- **Difficulty Level**: `easy`, `medium`, or `hard`.
- **Formatting Constraints**: The output must be **RAW JSON ONLY**. Do not prepend Markdown or explanatory text to the output file.

### 2. Properties to Define
The generated JSON **must** include the following keys:
- `id` (string): A unique kebab-case ID combining the topic, difficulty, and an identifier (e.g., `fractions-medium-005`).
- `topicId` (string): The general category (e.g., `algebra`).
- `topicName` (string): Human-readable topic name (e.g., `Algebra Basics`).
- `difficulty` (string): `easy`, `medium`, or `hard`.
- `instructions` (string): A brief, clear command for the user (e.g., "Solve for x").
- `question` (object):
  - `text` (string): The main body of the question ("What is the value of x?").
  - `mathExpression` (array of strings, optional): Used to store specific math formulas or lines of equations. Use `$$` around mathematical expressions if rendering with LaTeX.
- `inputs` (array of objects): Defines what the user needs to enter. **Supports multiple answers.**
  - `name` (string): Internal ID of the input (e.g., `x`, `numerator`).
  - `label` (string): Text shown beside the input (e.g., `x =`).
  - `inputType` (string): Type of HTML input (`number`, `text`).
  - `correctAnswer` (string/number): The exact expected value for validation.
- `hints` (array of strings): **Exactly 2-3 progressive hints.** The first should be a gentle nudge, the final should almost give the solution away.
- `explanation` (object):
  - `steps` (array of strings): A detailed, step-by-step walkthrough detailing how to arrive at the solution. Limit math jargon where possible, keeping it suitable for 11-14 year olds.

### 3. Example Prompt Template provided to AI
> "Generate a JSON file for a Mathrix exercise targeting children aged 11-14.
> **Topic**: Basic Algebra (Linear Equations)
> **Difficulty**: Medium
> The exercise should require the user to solve for two variables, X and Y.
> Ensure you provide exactly two contextual hints and a 4-5 step explanation. 
> Output ONLY valid JSON matching the Mathrix `exercise_template.json` structure. Include no markdown blocks or surrounding text."