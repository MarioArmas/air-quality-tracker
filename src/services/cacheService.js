const TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

const lsGet = (key) => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { data, expiresAt } = JSON.parse(raw)
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key)
      return null
    }
    return data
  } catch {
    return null
  }
}

const lsSet = (key, data) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ data, expiresAt: Date.now() + TTL_MS })
    )
  } catch {
    // localStorage might be full or unavailable — fail silently
  }
}

// ─── In-memory store ───────────────────────────────────────────────────────────

const memoryStore = new Map()

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns cached data for `key`, checking memory first then localStorage.
 * Returns null on a miss (or after TTL expiry).
 */
export const cacheGet = (key) => {
  if (memoryStore.has(key)) return memoryStore.get(key)

  const stored = lsGet(key)
  if (stored !== null) {
    memoryStore.set(key, stored) // warm up memory for next call
    return stored
  }

  return null
}

/**
 * Stores `data` under `key` in both memory and localStorage.
 */
export const cacheSet = (key, data) => {
  memoryStore.set(key, data)
  lsSet(key, data)
}
