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

### JS Version

1. Clone the repository:
   ```bash
   git clone https://github.com/EIM22SE/CS305_Project.git
   cd cs305-hiring-survey/javascript

2. Install dependencies and run the application:
   ```bash
   npm install
   node hiring_survey.js

## Overview

1.Upon running the application, you will see a menu with the following options:
  Fill out the survey
  Search responses
  Exit

2.Choose an option by entering the corresponding number.

3.Follow the prompts to fill out the survey or search for candidates.

## Example Interaction

### Filling Out the Survey

When prompted, the interaction may look like this:

=== Hiring Survey ===
Enter your name: John Doe
Enter your email: john.doe@example.com
Enter your phone number (format: xxx-xxx-xxxx): 123-456-7890
Do you have any certifications? (yes/no): yes
Enter the name of your certification: Certified Python Developer
How many years of experience do you have in your field? 5
List your skills (comma-separated): Python, Java, SQL

### Searching for Responses

When searching for candidates, the interaction may look like this:

Enter a name or skill to search for: Python
Found candidate with skill 'python': John Doe
