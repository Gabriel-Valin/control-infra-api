module.exports = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/Presentation/Adapter/**",
    "!<rootDir>/src/Presentation/Error/**",
    "!<rootDir>/src/Presentation/Middleware/**",
    "!<rootDir>/src/Presentation/Routes/**",
    "!<rootDir>/src/App.ts",
    "!<rootDir>/src/Server.ts",
    "!<rootDir>/src/OpenApi/**",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    "@/tests/(.+)": "<rootDir>/tests/$1",
    "@/(.+)": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.spec.ts"],
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "\\.ts$": "ts-jest",
  },
  clearMocks: true,
}
