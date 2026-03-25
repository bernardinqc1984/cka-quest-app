export const LEVELS = [
  { minXP: 0, icon: "🌱", name: "Padawan K8s" },
  { minXP: 100, icon: "⚡", name: "Kubectl Initié" },
  { minXP: 300, icon: "🐋", name: "Pod Wrangler" },
  { minXP: 600, icon: "🚀", name: "Deployer Pro" },
  { minXP: 1000, icon: "🛡️", name: "Cluster Guardian" },
  { minXP: 1500, icon: "⭐", name: "Node Master" },
  { minXP: 2200, icon: "👑", name: "CKA Ready" },
] as const;

export function levelForXP(xp: number) {
  const safe = Number.isFinite(xp) ? xp : 0;
  for (let i = LEVELS.length - 1; i >= 0; i -= 1) {
    if (safe >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

