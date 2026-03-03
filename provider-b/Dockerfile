FROM oven/bun:1

WORKDIR /app

COPY . .

WORKDIR /app/apps/provider-b-api

EXPOSE 3002

CMD ["bun", "run", "src/index.ts"]
