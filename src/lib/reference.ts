export function generateReference(): string {
  const year = new Date().getFullYear();
  const seq = Date.now().toString(36).toUpperCase().slice(-4);
  return `APO-${year}-${seq}`;
}
