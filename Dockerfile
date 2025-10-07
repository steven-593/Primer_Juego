# Usar Python 3.10 slim
FROM python:3.10-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el proyecto al contenedor
COPY . .

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
