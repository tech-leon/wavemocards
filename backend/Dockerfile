# set base image (host OS)
FROM python:3.12.5-slim

# set the working directory in the container
WORKDIR /backend

# copy the dependencies file to the working directory
COPY requirements.txt .

# install dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/backend

# copy the content of the local app directory to the working directory
COPY ./app /app_backup

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80

# command to run on container start
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]