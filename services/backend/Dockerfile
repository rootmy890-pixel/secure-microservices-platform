# ==========================================
# Stage 1: Build Dependencies
# ==========================================
FROM python:3.11-slim AS builder

WORKDIR /app

# تثبيت المتطلبات في مجلد مؤقت
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ==========================================
# Stage 2: Final Runtime Image
# ==========================================
FROM python:3.11-slim AS runner

WORKDIR /app

# إنشاء مستخدم غير جذر (Non-root user) لتعزيز الأمان
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# نسخ المكتبات المثبتة فقط من مرحلة البناء
COPY --from=builder /install /usr/local
COPY . .

# تغيير ملكية الملفات للمستخدم الجديد
RUN chown -R appuser:appgroup /app

# التحول للمستخدم غير الجذر
USER appuser

EXPOSE 8000

# تشغيل التطبيق عبر uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
