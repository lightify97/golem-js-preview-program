FROM python:3.12.0-alpine3.18

WORKDIR /golem/work
VOLUME /golem/input

COPY Dockerfile /golem/info/image-info
COPY similarities.py /golem/work/similarities.py
COPY requirements.txt /golem/work/requirements.txt

RUN pip install -r requirements.txt
