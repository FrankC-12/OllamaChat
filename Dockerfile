# Usar la imagen base de Python
FROM python:3.12.3

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo requirements.txt en el contenedor
COPY ./requirements.txt /app/requirements.txt

# Instalar las dependencias listadas en el requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copiar todos los archivos de la aplicación en el contenedor
# COPY . /app
COPY . .


# Exponer el puerto que utiliza la aplicación
EXPOSE 10000


# Comando para correr la aplicación FastAPI
CMD ["uvicorn", "Backend.main:app", "--host", "0.0.0.0", "--port", "10000"]
