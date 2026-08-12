export function generateProtocol() {
  return `AVB-${crypto.randomUUID()}`;
}