@echo off
setlocal
cd /d "%~dp0"
echo.
echo  TiAuto Finance Intelligence
echo  Exact Telkom Finance Intelligence architecture, tailored for TiAuto
echo.
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed. Check your network or npm registry and run npm install again.
    pause
    exit /b 1
  )
)
echo Starting application...
call npm run dev
