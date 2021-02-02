Set-Location -Path ../src\allthebeansangular
Write-Output "Installing Modules"
npm install

Write-Output "Build and running (localhost:4200)"
ng serve --open