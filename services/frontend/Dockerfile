# ==========================================
# Stage 1: Build & Install Dependencies
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

# ==========================================
# Stage 2: Production Final Image
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# إنشاء مستخدم غير جذر لتعزيز الأمان
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# نسخ التبعيات والكود المصدري
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# تغيير الملكية للمستخدم غير الجذر
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
