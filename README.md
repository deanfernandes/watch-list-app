# WatchListApp
## Requirements:
* .NET SDK 6.0 or higher
  * Download: https://dotnet.microsoft.com/download
* SQL Server
  * If you don’t have it installed, download it from [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
## Installation:
1. `git clone https://github.com/deanfernandes/watch-list-app.git`
2. `cd watch-list-app`
3. `dotnet restore`
4. `dotnet ef database update`
5. `dotnet run`
## Test:
https://localhost:7086/swagger