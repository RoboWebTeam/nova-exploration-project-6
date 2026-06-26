declare global {
  interface Window {
    ym: (id: number, action: string, target?: string) => void
  }
}

const YM_ID = 101026698

export function ymGoal(target: string) {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(YM_ID, "reachGoal", target)
  }
}

export function saveUtm() {
  if (typeof window === "undefined") return
  const params = new URLSearchParams(window.location.search)
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
  const utm: Record<string, string> = {}
  utmKeys.forEach((key) => {
    const val = params.get(key)
    if (val) utm[key] = val
  })
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem("utm", JSON.stringify(utm))
  }
}

export function getUtm(): Record<string, string> {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(sessionStorage.getItem("utm") || "{}")
  } catch {
    return {}
  }
}
