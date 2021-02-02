# All The Beans

[Working Example](http://ismt.xyz)

This project uses dotnet core 5.0 mvc along with angular v11. This project contains 2 projects; the API and the front end. The API runs on dotnet core and utilises a token based authentication system.

##### Limitations
At present, only one instance of the user can be active on the website at one time. This is because the API saves the user token in the 'Users' table. This should be in it's own table within the database so that any one user can log in from multiple devices and stay logged in on each. With this table we could create some kind of sessions page which allows the user to view how many devices are logged in, and be able to log them out from the website.

To store the days of the week, the database contains the day number (Monday = 1 etc). this could be extended to user the DayOfMonth if it's needed to have a different bean per day of the month with only a small change in the GetBeanOfTheDay method from the API, and the styling changed in the front end.

Anyone is able to register and  Add/Edit/Delete beans. An idea to get around this could be to put the register page behind the AuthGuard created in angular, so only registered users can add new users. To implement this wihtout creating a pre made user, it would need to implement some sort of installation flow for the first use of the website (how WordPress does it as an example).

**This project uses SQLite for the DB. This is only due to cost limitations. to run this project with SQL, uncomment line 36 in Startup.cs and comment out line 37. Make sure to Add-Migration and subsequently Update-Database.**

### Requirements

  - Node.js (this project is built will version 14 installed)
  - Dotnet Core v5 SDK/Runtime

### Build/Run

- To build and run this project, navigate to the 'scripts' directory and run the runApi.ps1 and runFrontend.ps1 files
* DIY API - Navigate to 'src/AllTheBeansApi' and execute the following:
    * dotnet build /property:Configuration=Debug
    * dotnet-ef database update **only if you change to sqlserver
    * dotnet run

* DIY Front end - Navigate to 'src/AllTheBeansAngular' and execute the following:
    * npm install
    * ng serve --open


If all goes well your browser will open to the home page of the site.

### Navigating the website
The main page is a landing page which shows the bean of the day. If there is no bean for today configured, then the page will state that.

To access the dashboard, navigate to /#/dashboard. 
On first run, you will need to register a user (/#/register) as there is no pre-configured user. Once logged in you can then add/edit and delete beans, as well as set the active bean for a certain week day.
