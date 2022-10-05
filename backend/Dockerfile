FROM python:3.10-slim

WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
# Peer-dependencies of pm4py
RUN apt-get update && apt-get install -y \
    libxml2-dev \
    libxslt-dev \
    python3-cvxopt \
    graphviz \
    graphviz-dev \
    librsvg2-dev
COPY ./app /code/app
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
