export function generateReference(): string {
  const year = new Date().getFullYear();
  // Simple sequential counter – in production use a DB sequence
  // For now, we use a timestamp‑based suffix to ensure uniqueness
  const seq = Date.now().toString(36).toUpperCase().slice(-4);
  return `APO-${year}-${seq}`;
}
