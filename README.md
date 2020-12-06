<h1 align="center">:rocket: GoBarber-Backend :rocket:</h1>

<p align="center">This project was developed in GoStack Bootcamp from Rocketseat. It is the backend of an application for barbershops named GoBarber. The frontend can be accessed <a href="https://github.com/yesminmarie/gobarber-web">here</a> and the mobile version <a href="https://github.com/yesminmarie/gobarber-mobile">here</a>.</p>

<p align="center">
 <a href="#objective">Objective</a> •
 <a href="#technologies">Technologies</a> •
 <a href="#how-to-run">How to run the application</a> •
</p>

<h1 id="objective">:bulb: Objective</h1>
</p>This project allows the customer to make an appointment with a specific barber and the barber can see the appointments of a particular day. This project was developed using DDD, TDD and some SOLID principles.</p>

<h1 id="technologies">:rocket: Technologies</h1>

<p>It was used these technologies in this project.</p>

- [Node.js](https://nodejs.org/en/ "Node.js")
- [Typescript](https://www.typescriptlang.org/ "Typescript")
- [Express](http://expressjs.com/ "Express")
- [Typeorm](https://typeorm.io/#/ "Typeorm")
- [Tsyringe](https://github.com/microsoft/tsyringe/ "Tsyringe")
- [Jest](https://jestjs.io/ "Jest")
- [Celebrate](https://www.npmjs.com/package/celebrate "Celebrate")
- [Ethereal](https://ethereal.email/ "Ethereal") (For sending email in development environment)
- [Amazon Simple Email Service](https://aws.amazon.com/pt/ses/) (For sending email in production environment)
- [Postgres](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

<h1 id="how-to-run">:computer: How to run the application</h1>

<h2>Pre Requiriments</h2>

<p>You will need these tools instaled in your machine:</p>

- [Node.js](https://nodejs.org/en/ "Node.js")
- [Yarn](https://yarnpkg.com/ "Yarn")
- [Git](https://git-scm.com/ "Git")

```bash
# Clone this repository
$ git clone https://github.com/yesminmarie/gobarber-backend

# Go into the folder of the project
$ cd gobarber-backend

# Install the dependencies
$ yarn

# Run the migrations
yarn typeorm migration:run

# Run the project in developer mode
yarn dev:server
```
<hr>

Made with :heart: by Yesmin Marie
