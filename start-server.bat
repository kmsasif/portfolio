@echo off
title Asif Portfolio Server
echo Starting Local Web Server for Asif's Portfolio...
start "" "http://localhost:3000"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
