import { DEMO_PACKAGES } from '@/data/packages'

const KEY = 'himalayan_holidays_packages'

export function getPackages() {
  if (typeof window === 'undefined') return DEMO_PACKAGES
  try {
    const stored = localStorage.getItem(KEY)
    if (!stored) {
      localStorage.setItem(KEY, JSON.stringify(DEMO_PACKAGES))
      return DEMO_PACKAGES
    }
    return JSON.parse(stored)
  } catch {
    return DEMO_PACKAGES
  }
}

export function savePackage(pkg) {
  try {
    const pkgs = getPackages()
    const idx = pkgs.findIndex(p => p.id === pkg.id)
    if (idx >= 0) pkgs[idx] = pkg
    else pkgs.unshift(pkg)
    localStorage.setItem(KEY, JSON.stringify(pkgs))
    return true
  } catch {
    return false
  }
}

export function deletePackage(id) {
  try {
    const pkgs = getPackages().filter(p => p.id !== id)
    localStorage.setItem(KEY, JSON.stringify(pkgs))
    return true
  } catch {
    return false
  }
}

export function duplicatePackage(id) {
  try {
    const pkgs = getPackages()
    const original = pkgs.find(p => p.id === id)
    if (!original) return false
    const copy = {
      ...original,
      id: `pkg-${Date.now()}`,
      title: `${original.title} (Copy)`,
    }
    pkgs.unshift(copy)
    localStorage.setItem(KEY, JSON.stringify(pkgs))
    return true
  } catch {
    return false
  }
}

export function getPackageById(id) {
  return getPackages().find(p => p.id === id) || null
}
