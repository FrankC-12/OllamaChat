FROM python:3.11

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . .

EXPOSE 10000

CMD ["uvicorn", "Backend.main:app", "--host", "0.0.0.0", "--port", "10000"]
