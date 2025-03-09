// Format the zero-cache logs for better readability
// usage: zero-cache-dev -p src/db/schema.ts 2>&1 | node format_logs.mjs

import readline from 'readline';
import chalk from 'chalk';
import boxen from 'boxen';
import { stdout } from 'process';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

function formatLogEntry(logEntry) {
	try {
		const logData = JSON.parse(logEntry);
		let title = chalk.cyan.bold('Log Entry');
		let borderColor = 'cyan';

		switch (logData.level) {
			case 'ERROR':
				title = chalk.red.bold('ERROR');
				borderColor = 'red';
				break;
			case 'WARN':
				title = chalk.yellow.bold('WARNING');
				borderColor = 'yellow';
				break;
			case 'WARNING':
				title = chalk.yellow.bold('WARNING');
				borderColor = 'yellow';
				break;
			case 'INFO':
				title = chalk.blue.bold('INFO');
				borderColor = 'blue';
				break;
			case 'DEBUG':
				title = chalk.magenta.bold('DEBUG');
				borderColor = 'magenta';
				break;
		}

		const formattedText = Object.entries(logData)
			.filter(([key]) => key !== 'level')
			.map(([key, value]) => `${chalk.bold(key)}: ${value}`)
			.join('\n');

		return boxen(formattedText, {
			title,
			padding: 1,
			borderColor,
			borderStyle: 'round',
			width: stdout.columns - 4
		});
	} catch {
		return boxen(logEntry, {
			title: chalk.blue.bold('INFO'),
			padding: 1,
			borderColor: 'blue',
			borderStyle: 'round',
			width: stdout.columns - 4
		});
	}
}

rl.on('line', (line) => {
	console.log(formatLogEntry(line.trim()));
});
