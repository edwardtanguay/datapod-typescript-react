(() => {
  type LogEntry = [timestamp: number, ...messages: string[]];

  const logEntry2: LogEntry = [2342, "2025-07-04 22:37:32", "rebooted"];
  const logEntry1: LogEntry = [2341, "2025-07-04 22:38:11", "error", "bad syntax in line 23"];

  console.log(logEntry1)
  console.log(logEntry2)
})();
