export default async function safeAsync(
  promise,
  fallback = null,
  logLabel = ""
) {
  try {
    const result = await promise;
    return result;
  } catch (error) {
    if (logLabel) {
      console.warn(`${logLabel} failed:`, error.message || error);
    } else {
      console.warn("safeAsync error:", error.message || error);
    }
    return fallback;
  }
}
