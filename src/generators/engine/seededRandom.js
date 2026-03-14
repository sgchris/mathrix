function hashSeed(seed) {
  let hash = 2166136261

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

export function createSeededRandom(seed) {
  let state = hashSeed(seed)

  function next() {
    state += 0x6D2B79F5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }

  return {
    next,
    int(min, max) {
      const lower = Math.ceil(min)
      const upper = Math.floor(max)
      return Math.floor(next() * (upper - lower + 1)) + lower
    },
    pick(values = []) {
      if (values.length === 0) return undefined
      return values[this.int(0, values.length - 1)]
    },
    boolean() {
      return next() >= 0.5
    },
  }
}
