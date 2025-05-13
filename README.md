# WatchListApp
https://trello.com/b/OklWvAD2/watch-list-app-kanban
## Demo
[![Demo](https://img.youtube.com/vi/VLTY5rcABRo/0.jpg)](https://youtu.be/VLTY5rcABRo)
## Backend
### Requirements:
* **.NET SDK** 6.0 or higher
  * Download: https://dotnet.microsoft.com/download
* **SQL Server**
  * If you don’t have it installed, download it from [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
### Installation:
1. `git clone https://github.com/deanfernandes/watch-list-app.git`
2. `cd watch-list-app\backend\DeanFernandes.WatchListApp`
3. `dotnet restore`
4. `cd DeanFernandes.WatchListApp.API`
5. `dotnet ef database update`
6. `dotnet run --launch-profile https`
### Test:
https://localhost:7086/swagger

## Frontend
### Requirements:
* **Node.js** (v14 or higher) — [Download Node.js](https://nodejs.org/)
### Installation:
1. `cd watch-list-app\frontend\watch-list-app`
2. `npm install`
3. `npm start`
### Test:
http://localhost:3000
