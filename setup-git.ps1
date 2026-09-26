# Script de inicializacao e envio do projeto para o GitHub
Write-Host "Inicializando repositorio Git e enviando arquivos para o GitHub..." -ForegroundColor Green

git init
git add .
git commit -m "feat: initial commit for Quiz Computacional"
git branch -M main
git remote add origin https://github.com/mdsspcom26-cmd/QUIZ-COMPUTACIONAL.git
git push -u origin main

Write-Host "Concluido com sucesso!" -ForegroundColor Green
