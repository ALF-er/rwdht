const path = require("path");

module.exports = {
	roots: [path.resolve(__dirname, "./src")],
	displayName: "sandbox",
	testURL: "http://localhost:1234",
	setupFilesAfterEnv: [path.resolve(__dirname, "./src/jest.setup.ts")],
	moduleNameMapper: {
		"~(.*)$": "<rootDir>/src/$1"
	}
};
