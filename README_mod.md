# CS305 Hiring Survey System

## Overview

The Hiring Survey System is a multi-language console-based application designed to facilitate the collection and management of candidate information during the hiring process. This project includes implementations in three programming languages: Python, C#, and JavaScript. Each version allows users to fill out a survey with their personal details, including contact information, certifications, years of experience, and skills. The collected data is stored in a JSON file, enabling easy retrieval and search functionality.

## Features

- **User  Input**: Collects personal information from candidates, including:
  - Name
  - Email (validated)
  - Phone number (validated)
  - Certifications (if any)
  - Years of experience
  - Skills (comma-separated)
  
- **Data Validation**: Ensures that email and phone number formats are correct and that years of experience is a valid number.

- **Data Storage**: Saves survey responses in a JSON file, allowing for easy data management.

- **Search Functionality**: Enables users to search for candidates based on name or skills.

- **User-Friendly Interface**: Provides a simple command-line interface for interaction.


## Versions

This project includes implementations in the following programming languages:

- **Python**: Located in the `python` directory.
- **C#**: Located in the `csharp` directory.
- **JavaScript**: Located in the `javascript` directory.

## Requirements

### Python Version
- Python 3.x

### C# Version
- .NET Core SDK

### JavaScript Version
- Node.js


## Installation

### Python Version

1. Clone the repository:
   ```bash
   git clone https://github.com/EIM22SE/CS305_Project.git
   cd cs305-hiring-survey/python

2. Run the application:
   ```bash
   python hiring_survey.py

### C# Version

1. Clone the repository:
   ```bash
   git clone https://github.com/EIM22SE/CS305_Project.git
   cd cs305-hiring-survey/csharp

2. Build and run the application:
   ```bash
   dotnet run

### JavaScript Version

1. Clone the repository:
   ```bash
   git clone https://github.com/EIM22SE/CS305_Project.git
   cd cs305-hiring-survey/javascript

2. Install dependencies and run the application:
   ```bash
   npm install
   node hiring_survey.js


## Overview

1. Upon running the application, you will see a menu with the following options:
  Fill out the survey
  Search responses
  Exit

2. Choose an option by entering the corresponding number.

3. Follow the prompts to fill out the survey or search for candidates.

## Filling Out the Survey

When you select the "Fill out the survey" option, you will be prompted to enter the following details:

1. **Name**: Enter your full name.
2. **Email Address**: Provide your email address. The application will validate the format to ensure it is correct. If the format is invalid, you will be prompted to re-enter your email.
3. **Phone Number**: Enter your phone number in the format `+1234567890`. The application will validate the format. If it is invalid, you will be asked to try again.
4. **Certifications**: Indicate whether you have any certifications by answering "yes" or "no". If you answer "yes", you will be prompted to enter your certifications as a comma-separated list.
5. **Years of Experience**: Enter the number of years you have worked in your field. The application will validate that this is a non-negative integer.
6. **Skills**: List your skills as a comma-separated list.

After entering all the information, the application will display a summary of your candidate information for your review. If everything looks correct, the data will be saved to a JSON file (`candidates.json`).

## Searching Responses

To search for candidates, select the "Search responses" option from the main menu. You can search by:

- **Name**: Enter the name of the candidate you wish to find. The application will look for matches in the candidate names stored in the JSON file.
- **Skills**: You can also search by skills. Enter a skill, and the application will return candidates who possess that skill.

The application will display the search results, including the following details for each matching candidate:

- Name
- Email
- Phone
- Years of Experience
- Skills
- Whether they have certifications
- List of certifications (if any)

If no candidates match your search criteria, the application will inform you that no candidates were found.

## Troubleshooting

If you encounter any issues while running the application, consider the following:

- **File Not Found**: Ensure that the `candidates.json` file is in the same directory as the application. The application will create this file if it does not exist.
- **Invalid Input**: If you receive validation errors, double-check the format of your email and phone number. Ensure that years of experience is a non-negative integer.
- **Dependencies**: Make sure you have the required dependencies installed for the respective programming language version you are using.

## Contributing

Contributions are welcome! If you would like to contribute to the Hiring Survey System, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear messages.
4. Push your changes to your forked repository.
5. Create a pull request detailing your changes.

Please ensure that your code adheres to the existing style and includes appropriate tests where applicable.

## Acknowledgments

- Thanks to all contributors who have helped improve this project.

## Contact

For any inquiries or feedback, please reach out to the project maintainer at.
