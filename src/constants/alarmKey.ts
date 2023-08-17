export const alarmKeys = {
    all: ["alarm"] as const,
    detail: (id: number) => [...alarmKeys.all, id] as const,
  };