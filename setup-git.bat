@echo off
echo Inicializando repositorio Git e enviando arquivos para o GitHub...
echo.
git init
git add .
git commit -m "feat: initial commit for Quiz Computacional"
git branch -M main
git remote add origin https://github.com/mdsspcom26-cmd/QUIZ-COMPUTACIONAL.git
git push -u origin main
echo.
echo Concluido!
pause
