import solveOneStepLinearEquationFamily from '../families/algebra/solveOneStepLinearEquation.js'

const GENERATOR_FAMILIES = [solveOneStepLinearEquationFamily]
const GENERATOR_FAMILY_MAP = new Map(GENERATOR_FAMILIES.map(family => [family.id, family]))

export function getGeneratorFamily(familyId) {
  return GENERATOR_FAMILY_MAP.get(familyId) || null
}

export function listGeneratorFamilies() {
  return [...GENERATOR_FAMILIES]
}
