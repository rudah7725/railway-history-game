@echo off
cd /d "%~dp0"
echo Railway game: http://127.0.0.1:8765   (stop: Ctrl+C)
where py >nul 2>nul
if errorlevel 1 (
  python -m http.server 8765 --bind 127.0.0.1
) else (
  py -m http.server 8765 --bind 127.0.0.1
)
pause
