FROM python:3.11
ENV PYTHONUNBUFFERED 1

# Install requirements
RUN apt-get update && apt-get install -y --no-install-recommends \
        curl \
		cmake \
		libboost-all-dev \
        wamerican \
	&& rm -rf /var/lib/apt/lists/*

# Download source
RUN cd /opt \
    && curl -LO https://dsg.uwaterloo.ca/watdiv/watdiv_v06.tar \
    && tar -xvf watdiv_v06.tar \
    && rm watdiv_v06.tar

# Compile
ENV BOOST_HOME /usr/lib/
RUN cd /opt/watdiv \
    && make

RUN mkdir /app
RUN mkdir /app/logs
WORKDIR /app

# Add convenience generator
ADD generate-bulk.sh /opt/watdiv/bin/Release/generate-bulk.sh

COPY requirements.txt /app/
RUN pip install -r /app/requirements.txt

COPY . /app/

CMD python manage.py runserver 0.0.0.0:8000
