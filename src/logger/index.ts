import pino from "pino";

const transport = pino.transport({
  targets: [
    // Saída para o Arquivo (pino-roll)
    {
      target: "pino-roll",
      options: {
        file: "./logs/app-log",
        frequency: "daily",
        mkdir: true,
        dateFormat: "yyyy-MM-dd",
        limit: { count: 15 },
      },
    },
    // Saída para o Terminal
    {
      target: "pino-pretty", // Recomendo instalar: npm install pino-pretty
      options: {
        colorize: true,
      },
    },
  ],
});

const logger = pino(transport);

export default logger;
