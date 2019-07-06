module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "./test/.+\\.test\\.ts$",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  coverageReporters: ["text-summary", "lcov"]
};
