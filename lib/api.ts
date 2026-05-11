import type { LocationData, Message } from "./types";

export async function getMessages(limit = 50): Promise<Message[]> {
  const { messages } = (await import("@/data/messages.json")) as {
    messages: Message[];
  };
  return messages.slice(0, Math.min(limit, 50));
}

export async function getLocationData(): Promise<LocationData> {
  return (await import("@/data/locations.json")) as unknown as LocationData;
}
