import assert from "node:assert/strict";
import test from "node:test";
import { apiKeyFromConfiguration, credentialRefForApiKey, qualifiedModelId, resolveCredential } from "./provider-profile";

test("normalizes native provider-entry API keys without exposing them", () => {
  assert.equal(apiKeyFromConfiguration({ apiKey: "  Aiand-secret  " }), "Aiand-secret");
  assert.equal(apiKeyFromConfiguration({ apiKey: "" }), undefined);
  assert.equal(apiKeyFromConfiguration({}), undefined);
});

test("keeps legacy and native provider-entry model IDs distinct", () => {
  const reference = credentialRefForApiKey("entry-key");
  assert.match(reference, /^key-[a-f0-9]{16}$/);
  assert.equal(qualifiedModelId("legacy", "glm-5.2"), "glm-5.2");
  assert.equal(qualifiedModelId(reference, "glm-5.2"), `${reference}::glm-5.2`);
});

test("lists the default group only once the legacy command has stored a key", () => {
  assert.equal(resolveCredential(undefined, undefined), undefined);
  assert.deepEqual(resolveCredential(undefined, "legacy-key"), { apiKey: "legacy-key", credentialRef: "legacy" });
});

test("a provider entry lists models only with its own key", () => {
  assert.equal(resolveCredential({}, "legacy-key"), undefined);
  assert.equal(resolveCredential({ apiKey: " " }, undefined), undefined);
  const entry = resolveCredential({ apiKey: "entry-key" }, "legacy-key");
  assert.equal(entry?.apiKey, "entry-key");
  assert.match(entry?.credentialRef ?? "", /^key-[a-f0-9]{16}$/);
});

test("an entry holding the command-stored key is left to the default group", () => {
  assert.equal(resolveCredential({ apiKey: "legacy-key" }, "legacy-key"), undefined);
  assert.equal(resolveCredential({ apiKey: " legacy-key " }, "legacy-key"), undefined);
});
