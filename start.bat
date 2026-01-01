@echo off
echo Setting up Asset Declaration System...

echo Initializing database...
cd database
python init_db.py
cd ..

echo Starting server...
python server.py

pause