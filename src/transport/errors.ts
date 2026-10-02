export class AiandApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "AiandApiError";
  }
}

/** ai& refused the key itself, as opposed to a network or server failure. */
export function isRejectedKey(error: unknown): boolean {
  return error instanceof AiandApiError && (error.status === 401 || error.status === 403);
}

export async function apiError(prefix: string, response: Response): Promise<AiandApiError> {
  const text = (await response.text().catch(() => "")).trim();
  let detail = text;
  try {
    const json = JSON.parse(text) as {
      error?: { message?: string } | string;
      detail?: string;
      message?: string;
      title?: string;
    };
    detail =
      typeof json.error === "string"
        ? json.error
        : json.error?.message ?? json.detail ?? json.message ?? json.title ?? text;
  } catch {
    /* Use the response text as-is. */
  }
  return new AiandApiError(
    `${prefix} (HTTP ${response.status})${detail ? `: ${detail.slice(0, 1000)}` : ""}`,
    response.status,
  );
}
