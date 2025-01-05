const fs = require('fs');
const { stdin } = require('node:process');
const readline = require('node:readline');

const ask = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

const dataFile = 'candidates.json';
const questionFile = 'questions.json';

class Candidate {
   constructor() {
      this.Name = '';
      this.Email = '';
      this.Phone = '';
      this.HasCertification = false;
      this.Certifications = [];
      this.YearsOfExperience = 0;
      this.Skills = [];
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

function survey() {
   if (!fs.existsSync(questionFile)) {
      console.log(`Questions file '${questionFile}' not found. Ensure the file exists in the specified path.`);
      return;
   }

   let questions;

   try {
      const fileContent = JSON.parse(fs.readFileSync(questionFile, 'utf8'));
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

   const askQestion = (index) => {
      if (index >= questions.length) {
         console.log('All questions answered succesfully.');
         saveCandidateInfo(candidate);
         console.log('Candidate information saved successfully.');
         showMenu();
         main();
         return;
      }
      const question = questions[index];
      if (question.condition && !evaluateCondition(candidate, question.condition)) {
         askQestion(index + 1);
         return;
      }

      ask.question(`${question.question}: \n `, (response) => {
         if(validateResponse(question, response)) {
            setFieldValue(candidate, question.field, response, question.type);
            askQestion(index + 1);
         } else {
            console.log(`Invalid response. Please provide a valid answer for the question type '${question.type}'.`);
            askQestion(index);
         }
      });
      
   };
} 

function saveCandidateInfo(candidate) { 
   let candidates = [];
   if(fs.existsSync(dataFile)) { 
      const jsonCandidates = fs.readFileSync(dataFile, 'utf8');
      candidates = JSON.parse(fileContent);
   }

   candidates.push(candidate);
   const newJsonCandidates = JSON.stringify(candidates, null, 2);
   fs.writeFileSync(dataFile, newJsonCandidates);
}

function validateResponse(question, response) { 
   //todo
}

function setFieldValue(candidate, field, value, type) { 
   //todo
}

   
   function evaluateCondition(candidate, condition) {
      const parts = condition.split('==');

      if (parts.length !== 2) { return false; }

      const field = parts[0].trim();
      const value = parts[1].trim();

      return candidate[field] === value;
   }

function showMenu() {
   console.log('Menu: ');
   console.log('1. Add Candidate. ');
   console.log('2. Search Candidate. ');
   console.log('3. Exit. ');
}

const menuOptions = {
   '1': () => { saveCandidateInfo(); },
   '2': () => { searchCandidates(); },
   '3': () => {
      console.log('Exiting the application.');
      ask.close();
      process.exit(0);
   },
};

function main() {
   ask.question('Enter your choice: ', (choice) => { 
      const action = menuOptions[choice];
      if (action) {
         action();
      }else {
         console.log('Invalid option.');
         main();
      }
   });
}



main();