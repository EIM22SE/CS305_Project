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