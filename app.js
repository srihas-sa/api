const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/players/", async (request, response) => {
  const getQuery = `SELECT * FROM cricket_team`;
  const bookarray = await db.all(getQuery);
  response.send(bookarray);
});

app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { player_name, jersey_number, role } = playerDetails;
  const addPlayerQuery = `
    INSERT INTO
      cricket_team(playerName,jerseyNumber,role)
    VALUES
      (
        ,
       
        '${playerName}',
        ${jerseyNumber},
        ${role},
      );`;

  const dbResponse = await db.run(addPlayerQuery);
  const bookId = dbResponse.lastID;
  response.send({ bookId: bookId });
});
