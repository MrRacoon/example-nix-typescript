// Load environment variables from .env file
import dotenv from 'dotenv'
dotenv.config()

import ora from 'ora'
import chalk from 'chalk'
import { Command } from 'commander'
import inquirer from 'inquirer'
import * as R from 'ramda'

// Define types for user input
interface UserInput {
  numbers: string
  operation: 'Sum' | 'Average' | 'Max'
}

// Create a new CLI program with Commander.js
const program = new Command()

program
  .name('cli-tool')
  .description('A demo CLI tool using multiple libraries with TypeScript')
  .version('1.0.0')
  .showHelpAfterError() // Display help if there's an error

// Define the "process" subcommand
program
  .command('process')
  .description('Process user input')
  .action(async () => {
    console.log(chalk.blue('Welcome to the CLI tool!'))

    // Define questions for Inquirer.js
    const questions: any = [
      {
        type: 'input',
        name: 'numbers',
        message: 'Enter a list of numbers separated by commas:',
        validate: (input: string) => {
          return input.split(',').every((n) => !isNaN(Number(n)))
            ? true
            : 'Please enter a valid list of numbers.'
        },
      },
      {
        type: 'list',
        name: 'operation',
        message: 'Select an operation to perform:',
        choices: ['Sum', 'Average', 'Max'],
      },
    ]

    // Prompt the user
    const answers = await inquirer.prompt<UserInput>(questions)

    const spinner = ora('Processing your input...').start()

    try {
      // Parse numbers from user input
      const numbers = answers.numbers
        .split(',')
        .map((n) => parseFloat(n))
        .filter((n) => !isNaN(n))

      if (numbers.length === 0) {
        throw new Error('No valid numbers provided.')
      }

      // Perform the selected operation using Ramda
      let result: number | string | boolean | Date
      switch (answers.operation) {
        case 'Sum':
          result = R.sum(numbers)
          break
        case 'Average':
          result = R.mean(numbers)
          break
        case 'Max':
          result = R.reduce(R.max, -Infinity, numbers)
          break
        default:
          throw new Error('Invalid operation.')
      }

      spinner.succeed(chalk.green('Processing complete!'))
      console.log(chalk.yellow(`Result of ${answers.operation}: ${result}`))

      // Show a message using a secret from the environment
      if (process.env.SECRET_MESSAGE) {
        console.log(
          chalk.magenta(`Secret Message: ${process.env.SECRET_MESSAGE}`),
        )
      }
    } catch (error) {
      spinner.fail(chalk.red('Failed to process input.'))
      console.error(chalk.red((error as Error).message))
    }
  })

// Parse CLI arguments
program.parse(process.argv)
