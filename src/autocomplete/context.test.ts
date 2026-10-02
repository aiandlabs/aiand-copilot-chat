import assert from "node:assert/strict";
import test from "node:test";
import { buildCompletionWindow, isChatInputDocument, isCompletionDocument } from "./context";

/** Splits a document written with one `|` cursor marker into its text and the cursor offset. */
function atCursor(marked: string): { text: string; offset: number } {
  const offset = marked.indexOf("|");
  assert.ok(offset >= 0 && marked.indexOf("|", offset + 1) < 0, "mark the cursor with exactly one |");
  return { text: marked.slice(0, offset) + marked.slice(offset + 1), offset };
}

test("keeps exactly prefixLines full lines above the cursor", () => {
  const { text, offset } = atCursor("l1\nl2\nl3|cursor");
  const window = buildCompletionWindow(text, offset, { prefixLines: 2, suffixChars: 0 });
  assert.equal(window.prefix, "l1\nl2\nl3");
  assert.equal(window.suffix, "");
});

test("drops lines beyond the prefix budget", () => {
  const { text, offset } = atCursor("x\nl1\nl2\nl3|");
  const window = buildCompletionWindow(text, offset, { prefixLines: 2, suffixChars: 0 });
  assert.equal(window.prefix, "l1\nl2\nl3");
});

test("keeps the cursor line and a bounded suffix", () => {
  const { text, offset } = atCursor("ab|cd");
  const window = buildCompletionWindow(text, offset, { prefixLines: 0, suffixChars: 1 });
  assert.equal(window.prefix, "ab");
  assert.equal(window.suffix, "c");
});

test("clamps offsets outside the document", () => {
  const window = buildCompletionWindow("abc", 99, { prefixLines: 1, suffixChars: 0 });
  assert.equal(window.prefix, "abc");
});

test("classifies chat input and code documents", () => {
  assert.equal(isChatInputDocument({ scheme: "chatSessionInput" }), true);
  assert.equal(isChatInputDocument({ scheme: "sessions-chat" }), true);
  assert.equal(isCompletionDocument({ scheme: "file" }), true);
  assert.equal(isCompletionDocument({ scheme: "untitled" }), true);
  assert.equal(isCompletionDocument({ scheme: "chatSessionInput" }), false);
  assert.equal(isCompletionDocument({ scheme: "output" }), false);
});
