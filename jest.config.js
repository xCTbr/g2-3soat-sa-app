export default {
	// collectCoverage: true,
  // coverageDirectory: './coverage',
	// collectCoverageFrom: ["./src/**"], //['<rootDir>/**/__tests__/**/*.spec.js'],
  // testEnvironment: 'node',
  testMatch: ['<rootDir>/**/__tests__/**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  // coveragePathIgnorePatterns: ['node_modules', 'src/database', 'src/test', 'src/types'],
  transform: {
		"^.+\\.jsx?$": "babel-jest"
	},
	// coverageThreshold: {
	// 	global: {
	// 		lines: 90,
	// 		statements: 90
	// 	}
	// }
};