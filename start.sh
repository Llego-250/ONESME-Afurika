#!/bin/bash

echo "Setting up Asset Declaration System..."

# Create database
echo "Initializing database..."
cd database
python init_db.py
cd ..

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run the application
echo "Starting Flask application..."
python app.py