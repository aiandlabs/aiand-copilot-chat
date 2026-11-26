/**
 * Configuration surface for experimental inline code suggestions.
 *
 * Suggestions are strictly opt-in: `aiandCopilot.inlineSuggestions` defaults
 * to false and the provider checks the setting live on every request, so
 * toggling needs no reload.
 */

export const CONFIG_SECTION = "aiandCopilot";

export const INLINE_SUGGESTIONS_SETTING = "inlineSuggestions";
export const INLINE_SUGGESTIONS_MODEL_SETTING = "inlineSuggestionsModel";
export const INLINE_SUGGESTIONS_CHAT_INPUT_SETTING = "inlineSuggestionsChatInput";
export const INLINE_DEBOUNCE_MS_SETTING = "inlineSuggestionsDebounceMs";
export const INLINE_TIMEOUT_MS_SETTING = "inlineSuggestionsTimeoutMs";
export const INLINE_MAX_TOKENS_SETTING = "inlineSuggestionsMaxTokens";
export const INLINE_PREFIX_LINES_SETTING = "inlineSuggestionsPrefixLines";
export const INLINE_SUFFIX_CHARS_SETTING = "inlineSuggestionsSuffixChars";

/** Measured ~0.35s TTFB / ~0.45s total on 2026-10-30. */
export const DEFAULT_INLINE_MODEL = "deepseek-ai/deepseek-v4.1-flash-1017";

// The picker writes its choice to Global settings even when it is the default,
// so a package.json default change never reaches those users.
const RETIRED_INLINE_MODELS: ReadonlyMap<string, string> = new Map([
  ["deepseek-ai/deepseek-v4-flash", DEFAULT_INLINE_MODEL],
  ["deepseek-ai/deepseek-v4.1-flash", DEFAULT_INLINE_MODEL],
  ["moonshotai/kimi-k2.7-code", DEFAULT_INLINE_MODEL],
  ["zai-org/glm-5.2", DEFAULT_INLINE_MODEL],
  ["qwen/qwen3.6-27b", "qwen/qwen3.8-27b"],
  ["deepseek-ai/deepseek-v4-pro", "deepseek-ai/deepseek-v4-pro-0813"],
]);

/** The configured inline model, with retired ids moved to their replacement. */
export function inlineModelId(configured: string | undefined): string {
  const id = configured?.trim();
  if (!id) return DEFAULT_INLINE_MODEL;
  return RETIRED_INLINE_MODELS.get(id.toLowerCase()) ?? id;
}
export const DEFAULT_INLINE_DEBOUNCE_MS = 300;
export const DEFAULT_INLINE_TIMEOUT_MS = 3_000;
export const DEFAULT_INLINE_MAX_TOKENS = 128;
export const DEFAULT_INLINE_PREFIX_LINES = 10;
export const DEFAULT_INLINE_SUFFIX_CHARS = 300;
export const DEFAULT_INLINE_SUGGESTIONS_CHAT_INPUT = false;

export function clampNumber(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}
