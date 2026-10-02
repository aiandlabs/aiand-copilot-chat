import { credentialReference } from "./auth/auth";

export function apiKeyFromConfiguration(
  configuration: Readonly<Record<string, unknown>>,
): string | undefined {
  const value = configuration.apiKey;
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function credentialRefForApiKey(apiKey: string): string {
  return `key-${credentialReference(apiKey)}`;
}

/**
 * The key a model group lists with. A provider entry always lists with its own key;
 * the default group lists only with a command-stored key that no entry already uses.
 */
export function resolveCredential(
  configuration: Readonly<Record<string, unknown>> | undefined,
  legacyApiKey: string | undefined,
  entryKeys: ReadonlySet<string>,
): { apiKey: string; credentialRef: string } | undefined {
  if (configuration) {
    const apiKey = apiKeyFromConfiguration(configuration);
    return apiKey ? { apiKey, credentialRef: credentialRefForApiKey(apiKey) } : undefined;
  }
  return legacyApiKey && !entryKeys.has(legacyApiKey) ? { apiKey: legacyApiKey, credentialRef: "legacy" } : undefined;
}

export function qualifiedModelId(credentialRef: string, modelId: string): string {
  return credentialRef === "legacy" ? modelId : `${credentialRef}::${modelId}`;
}
