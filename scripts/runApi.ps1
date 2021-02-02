Set-Location -Path ..\src\AllTheBeansApi
Write-Output "Building Api"
dotnet build /property:Configuration=Debug

Write-Output "Api Running"
dotnet run
