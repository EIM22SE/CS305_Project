# CS305 Hiring Survey System

## Overview

The Hiring Survey System is a multi-language console-based application designed to facilitate the collection and management of candidate information during the hiring process. This project includes implementations in three programming languages: Python, C#, and JavaScript. Each version allows users to fill out a survey with their personal details, including contact information, certifications, years of experience, and skills. The collected data is stored in a JSON file, enabling easy retrieval and search functionality.

The C# version dynamically loads survey questions from a `questions.json` file, making it flexible and easy to update without modifying the code.

## Features

- **Dynamic Questions**: Questions are loaded from a JSON file, allowing easy customization and updates.
- **Conditional Questions**: Some questions are only asked based on previous responses (e.g., certifications, criminal records).
- **User Input**: Collects detailed information from candidates, including:
  - Name
  - Email (validated)
  - Phone number (validated)
  - Desired position
  - Certifications (if any)
  - Years of experience
  - Skills
  - Willingness to relocate
  - Desired salary range
  - Availability for immediate start
  - Weekly working hours
  - Management experience and details
  - Remote work experience
  - Tools and software used
  - Criminal record details (if any)
  - Educational background
  - References (if any)
  - Employment status
  - Interest in the position
  - Professional goals

- **Data Validation**: Ensures that email and phone number formats are correct and that numeric fields are valid.
- **Data Storage**: Saves survey responses in a `candidates.json` file for easy management.
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
- Newtonsoft.Json NuGet package

### JavaScript Version
- Node.js

## Installation

### Python Version

1. Clone the repository:
   ```bash
   git clone https://github.com/EIM22SE/CS305_Project.git
   cd cs305-hiring-survey/python
   ```

2. Run the application:
   ```bash
   python hiring_survey.py
   ```

### C# Version

1. Clone the repository:
   ```bash
   git clone https://github.com/EIM22SE/CS305_Project.git
   cd cs305-hiring-survey/csharp
   ```

2. Install the Newtonsoft.Json package:
   ```bash
   dotnet add package Newtonsoft.Json
   dotnet restore
   ```

3. Build and run the application:
   ```bash
   dotnet run
   ```

### JavaScript Version

1. Clone the repository:
   ```bash
   git clone https://github.com/EIM22SE/CS305_Project.git
   cd cs305-hiring-survey/javascript
   ```

2. Install dependencies and run the application:
   ```bash
   npm install
   node hiring_survey.js
   ```

## Usage

1. Upon running the application, you will see a menu with the following options:
   - Fill out the survey
   - Search responses
   - Exit

2. Choose an option by entering the corresponding number.

### Filling Out the Survey

When you select the "Fill out the survey" option, the application will dynamically load questions from `questions.json`. The following steps occur:

1. Each question is displayed to the user based on the JSON configuration.
2. Conditional questions are asked only if the conditions are met (e.g., certifications, criminal record details).
3. User responses are validated based on the question type (e.g., email, phone, integer).
4. All valid responses are stored in the `candidates.json` file.

### Searching Responses

To search for candidates, select the "Search responses" option from the main menu. You can search by:

- **Name**: Enter the name of the candidate you wish to find.
- **Skills**: Enter a skill, and the application will return candidates who possess that skill.

The application will display the search results, including the following details for each matching candidate:

- Name
- Email
- Phone
- Desired position
- Years of Experience
- Skills
- Willingness to relocate
- Certifications
- Management and remote work experience
- Educational background
- References
- Employment status
- Professional goals

If no candidates match your search criteria, the application will inform you that no candidates were found.

## Troubleshooting

If you encounter any issues while running the application, consider the following:

- **File Not Found**: Ensure that the `questions.json` and `candidates.json` files are in the same directory as the application. The application will create the `candidates.json` file if it does not exist.
- **Invalid Input**: If you receive validation errors, double-check the format of your email and phone number. Ensure that numeric inputs (e.g., years of experience, weekly working hours) are valid numbers.
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

For any inquiries or feedback, please reach out to the project maintainer.
