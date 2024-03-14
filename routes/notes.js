const path = require('path');
const apiRouter = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => (err ? console.error(err) : console.info(`\nData written to ${destination}`)));

const readAndAppend = (content, file) => {
	fs.readFile(file, "utf8", (err, data) => {
		if (err) {
			console.error(err);
		} else {
			const parsedData = JSON.parse(data);
			parsedData.push(content);
			writeToFile(file, parsedData);
		}
	});
};

apiRouter.get("/notes", (req, res) => {
	readFromFile("./db/db.json")
		.then((data) => JSON.parse(data))
		.then((json) => {
			const result = json.filter((notes) => notes);
			return res.json(result);
		});
});

apiRouter.post("/notes", (req, res) => {
	const { title, text } = req.body;
	if (req.body) {
		const newNote = {
			title,
			text,
			id: uuidv4(),
		};

		readAndAppend(newNote, "./db/db.json");
		res.json(newNote);
		console.log(res.json);
	} else {
		console.log("error");
	}
});

module.exports = apiRouter;
