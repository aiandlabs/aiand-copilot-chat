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

/** Each key lists its models in exactly one group, so the picker never shows a model twice. */
export function resolveCredential(
  configuration: Readonly<Record<string, unknown>> | undefined,
  legacyApiKey: string | undefined,
): { apiKey: string; credentialRef: string } | undefined {
  if (configuration) {
    const apiKey = apiKeyFromConfiguration(configuration);
    // An entry holding the command-stored key would repeat the default group's list.
    if (!apiKey || apiKey === legacyApiKey) return undefined;
    return { apiKey, credentialRef: credentialRefForApiKey(apiKey) };
  }
  return legacyApiKey ? { apiKey: legacyApiKey, credentialRef: "legacy" } : undefined;
}

export function qualifiedModelId(credentialRef: string, modelId: string): string {
  return credentialRef === "legacy" ? modelId : `${credentialRef}::${modelId}`;
}
