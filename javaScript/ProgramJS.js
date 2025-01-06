const fs = require('fs');
const readline = require('node:readline');
const path = require('path');


const ask = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

const dataFile = path.join(__dirname, '..', 'candidates.json');
const questionFile = path.join(__dirname, '..', 'questions.json');

class Candidate {
   constructor() {
      this.Name = '';
      this.Email = '';
      this.Phone = '';
      this.HasCertification = false;
      this.Certifications = [];
      this.YearsOfExperience = 0;
      this.Skills = [];
      this.ImmediateStart = false;
      this.ImmediateAvailable = '';
      this.HasManagerialExperience = false;
      this.PeopleManaged = 0;
      this.CriminalRecord = false;
      this.CriminalRecordDetails = '';
      this.HasReferences = false;
      this.References = [];
   }
}
class Question {
   constructor(question, field, type, condition) {
      this.question = question;
      this.field = field;
      this.type = type;
      this.condition = condition;
   }
}

function searchCandidates() {
    if (!fs.existsSync(dataFile)) {
        console.log("No candidates found.");
        return;
    }

    ask.question("Enter name or skill to search: ", (query) => {
        const jsonData = fs.readFileSync(dataFile, 'utf-8');
        const candidates = JSON.parse(jsonData);

        const results = candidates.filter(c =>
            c.Name.toLowerCase().includes(query.toLowerCase()) ||
            c.Skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
        );

        if (results.length > 0) {
            console.log("\nSearch Results:");
            results.forEach(candidate => {
                     console.log(`Name: ${candidate.Name}, Email: ${candidate.Email}, Phone: ${candidate.Phone}, ` +
                    `Experience: ${candidate.YearsOfExperience} years, Skills: ${candidate.Skills.join(', ')}, ` +
                    `Has Certifications: ${candidate.HasCertification ? 'Yes' : 'No'}, ` +
                    `Certifications: ${candidate.Certifications.length > 0 ? candidate.Certifications.join(', ') : 'None'}`);
               });      

        } else {
            console.log("No candidates found matching your query.");
        }
        main();
    });
}


function survey() {
   if (!fs.existsSync(questionFile)) {
      console.log(`Questions file '${questionFile}' not found. Ensure the file exists in the specified path.`);
      return;
   }

   let questions;

   try {
      const fileContent = fs.readFileSync(questionFile, 'utf-8');
      questions = JSON.parse(fileContent);

      if (!questions || questions.length === 0) {
         console.log("No questions found in the file. Please check the content of 'questions.json'.");
         return;
      }
   } catch (error) {
      console.log(`Error reading or deserializing the questions file: ${error.message}`); 
      return;
   }

   const candidate = new Candidate();

   const askQuestion = (index) => {
      if (index >= questions.length) {
         console.log('All questions answered succesfully.');
         saveCandidateInfo(candidate);
         console.log('Candidate information saved successfully.');
         
         main();
         return;
      }
      const question = questions[index];
      if (question.condition && !evaluateCondition(candidate, question.condition)) {
         askQuestion(index + 1);
         return;
      }

      ask.question(`${question.question}: \n `, (response) => {
         if(validateResponse(question, response)) {
            setFieldValue(candidate, question.field, response, question.type);
            askQuestion(index + 1);
         } else {
            console.log(`Invalid response. Please provide a valid answer for the question type '${question.type}'.`);
            askQuestion(index);
         }
      });
   };
   askQuestion(0);
} 

function saveCandidateInfo(candidate) { 
   let candidates = [];
   if(fs.existsSync(dataFile)) { 
      const jsonCandidates = fs.readFileSync(dataFile, 'utf8');
      candidates = JSON.parse(jsonCandidates);
   }

   candidates.push(candidate);
   const newJsonCandidates = JSON.stringify(candidates, null, 2);
   fs.writeFileSync(dataFile, newJsonCandidates);
}

function validateResponse(question, response) { 
   switch (question.type) { 
      case 'email':
         return validateEmail(response);
      case 'phone':
         return validatePhone(response);
      case 'integer':
         return !isNaN(parseInt(response) && parseInt(response) >= 0);
      case 'boolean':
         return ['yes', 'no'].includes(response.toLowerCase());
      default:
         return true;
   }
}

function setFieldValue(candidate, field, value, type) {
   switch (type) {
      case 'integer':
         candidate[field] = parseInt(value);
         break;
      case 'boolean':
         candidate[field] = value.toLowerCase() === 'yes'; // "yes" -> true, "no" -> false
         break;
      case 'list':
         candidate[field] = value.split(',').map((item) => item.trim());
         break;
      default:
         candidate[field] = value;
   }
}

function validateEmail(email) { 
   const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
   return emailRegex.test(email);
}
function validatePhone(phone) {
   const phoneRegex = /^\+?[1-9]\d{1,14}$/;
   return phoneRegex.test(phone);
}
   
function evaluateCondition(candidate, condition) {
   const parts = condition.split('==');
   if (parts.length !== 2) {
      return false;
   }

   const field = parts[0].trim();
   const expectedValue = parts[1].trim().replace(/'/g, ''); 

   if (!(field in candidate)) {
      console.log(`Field '${field}' not found in Candidate object.`);
      return false;
   }

   const actualValue = candidate[field];

   if (typeof actualValue === 'boolean') {
      return actualValue === (expectedValue.toLowerCase() === 'true'); 
   }

   if (typeof actualValue === 'number') {
      return actualValue === parseInt(expectedValue, 10);
   }

   return actualValue.toString() === expectedValue;
}


function showMenu() {
   console.log('\n\n Menu: ');
   console.log('1. Add Candidate. ');
   console.log('2. Search Candidate. ');
   console.log('3. Exit. ');
}

const menuOptions = {
   '1': () => { survey(); },
   '2': () => { searchCandidates(); },
   '3': () => {
      console.log('Exiting the application.');
      ask.close();
      process.exit(0);
   },
};

function main() {
   showMenu();
   ask.question('Chose an option: ', (choice) => { 
      const action = menuOptions[choice];
      if (action) {
         action();
      }else {
         console.log('Invalid option.');
         main();
      }
   });
}

console.log("Current directory: ", __dirname);
console.log("Looking for questions file at:", questionFile);


main();