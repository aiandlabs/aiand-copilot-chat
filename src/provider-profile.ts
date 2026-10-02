import { credentialReference } from "./auth/auth";

export function apiKeyFromConfiguration(
  configuration: Readonly<Record<string, unknown>>,
): string | undefined {
  const value = configuration.apiKey;
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function credentialRefForApiKey(apiKey: string, legacyApiKey: string | undefined): string {
  return legacyApiKey === apiKey ? "legacy" : `key-${credentialReference(apiKey)}`;
}

/**
 * The key and credential reference a model list is built for. A provider entry
 * uses only its own key; the default group lists models only once the legacy
 * command has stored a key, so an added entry is not shadowed by a second,
 * keyless copy of the catalog.
 */
export function resolveCredential(
  configuration: Readonly<Record<string, unknown>> | undefined,
  legacyApiKey: string | undefined,
): { apiKey: string; credentialRef: string } | undefined {
  if (configuration) {
    const apiKey = apiKeyFromConfiguration(configuration);
    return apiKey ? { apiKey, credentialRef: credentialRefForApiKey(apiKey, legacyApiKey) } : undefined;
  }
  return legacyApiKey ? { apiKey: legacyApiKey, credentialRef: "legacy" } : undefined;
}

export function qualifiedModelId(credentialRef: string, modelId: string): string {
  return credentialRef === "legacy" ? modelId : `${credentialRef}::${modelId}`;
}
