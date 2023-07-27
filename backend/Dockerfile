# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files to the working directory
COPY . .

# Copy the .env file into the container
COPY .env .

# Set environment variables from .env file
ENV $(cat .env | grep -v ^# | xargs)

# Expose port
EXPOSE 5000

# Set the entry point command for the container
CMD ["python", "app.py"]
