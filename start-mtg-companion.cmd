@echo off
setlocal

cd /d "%~dp0"

set "BUNDLED_NODE=C:\Users\annab\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
set "BUNDLED_PNPM=C:\Users\annab\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd"

if exist "%BUNDLED_NODE%\node.exe" (
  set "PATH=%BUNDLED_NODE%;%PATH%"
)

if not exist "node_modules" (
  echo Installing app dependencies...
  if exist "%BUNDLED_PNPM%" (
    call "%BUNDLED_PNPM%" install
  ) else (
    call pnpm install
  )
)

echo.
echo Starting MTG Companion...
echo Open http://127.0.0.1:5173 in your browser.
echo Keep this window open while you use the app.
echo.

if exist "%BUNDLED_PNPM%" (
  call "%BUNDLED_PNPM%" dev -- --port 5173
) else (
  call pnpm dev -- --port 5173
)

pause
