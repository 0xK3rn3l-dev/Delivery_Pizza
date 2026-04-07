FROM node:24-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY yarn.lock* ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение (компилируем TypeScript в JS)
RUN npm run build

# ---- Финальный образ ----
FROM node:24-alpine

WORKDIR /app

# Копируем собранный код из builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main"]