// small helper to hash a string using SubtleCrypto SHA-256
export async function hashString(str) {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    // fallback: simple no-op (not secure) - but browser environment should have SubtleCrypto
    return str
  }
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
  // convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}
