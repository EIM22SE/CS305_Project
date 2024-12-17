const fs = require('fs');
const readline = require('readline');

const DATA_FILE = 'candidates.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function validateEmail(email) {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}

function validateYearsOfExperience(years) {
    return /^\d+$/.test(years) && parseInt(years) >= 0;
}

function collectCandidateInfo() {
    return new Promise((resolve) => {
        rl.question("Enter your name: ", (name) => {
            rl.question("Enter your email: ", (email) => {
                while (!validateEmail(email)) {
                    console.log("Invalid email format. Please try again.");
                    email = rl.question("Enter your email: ");
                }

                rl.question("Enter your phone number (e.g., +1234567890): ", (phone) => {
                    while (!validatePhone(phone)) {
                        console.log("Invalid phone number format. Please try again. Use the format: +1234567890");
                        phone = rl.question("Enter your phone number (e.g., +1234567890): ");
                    }

                    rl.question("Do you have any certifications? (yes/no): ", (hasCertification) => {
                        let certifications = [];
                        if (hasCertification.toLowerCase() === "yes") {
                            rl.question("Enter your certifications (comma-separated): ", (certs) => {
                                certifications = certs.split(',').map(cert => cert.trim());
                                askExperienceAndSkills(name, email, phone, certifications, resolve);
                            });
                        } else {
                            askExperienceAndSkills(name, email, phone, certifications, resolve);
                        }
                    });
                });
            });
        });
    });
}

function askExperienceAndSkills(name, email, phone, certifications, resolve) {
    rl.question("Enter your years of experience: ", (yearsOfExperience) => {
        while (!validateYearsOfExperience(yearsOfExperience)) {
            console.log("Invalid input. Please enter a valid number of years.");
            yearsOfExperience = rl.question("Enter your years of experience: ");
        }

        rl.question("Enter your skills (comma-separated): ", (skills) => {
            const candidateInfo = {
                name,
                email,
                phone,
                hasCertification: certifications.length > 0,
                certifications,
                yearsOfExperience: parseInt(yearsOfExperience),
                skills: skills.split(',').map(skill => skill.trim())
            };

            console.log("\n=== Candidate Information ===");
            console.log(`Name: ${candidateInfo.name}`);
            console.log(`Email: ${candidateInfo.email}`);
            console.log(`Phone: ${candidateInfo.phone}`);
            console.log(`Has Certifications: ${candidateInfo.hasCertification ? 'Yes' : 'No'}`);
            console.log(`Certifications: ${certifications.length > 0 ? certifications.join(', ') : 'None'}`);
            console.log(`Years of Experience: ${candidateInfo.yearsOfExperience}`);
            console.log(`Skills: ${candidateInfo.skills.join(', ')}`);

            resolve(candidateInfo);
        });
    });
}

function saveCandidateInfo(candidate) {
    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        const fileData = fs.readFileSync(DATA_FILE);
        data = JSON.parse(fileData);
    }

    data.push(candidate);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
}

function searchCandidates(query) {
    if (!fs.existsSync(DATA_FILE)) {
        console.log("No candidates found.");
        return;
    }

    const fileData = fs.readFileSync(DATA_FILE);
    const candidates = JSON.parse(fileData);

    const results = candidates.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );

    if (results.length > 0) {
        console.log("\nSearch Results:");
        results.forEach(candidate => {
            console.log(`Name: ${candidate.name}, Email: ${candidate.email}, Phone: ${candidate.phone}, ` +
                `Experience: ${candidate.yearsOfExperience} years, Skills: ${candidate.skills.join(', ')}, ` +
                `Has Certifications: ${candidate.hasCertification ? 'Yes' : 'No'}, ` +
                `Certifications: ${candidate.certifications.length > 0 ? candidate.certifications.join(', ') : 'None'}`);
        });
    } else {
        console.log("No candidates found matching your query.");
    }
}

function main() {
    const menu = () => {
        console.log("\nMenu:");
        console.log("1. Fill out the survey");
        console.log("2. Search responses");
        console.log("3. Exit");

        rl.question("Choose an option: ", (choice) => {
            if (choice === '1') {
                collectCandidateInfo().then(candidateInfo => {
                    saveCandidateInfo(candidateInfo);
                    console.log("Candidate information saved successfully.");
                    menu(); // Show menu again after saving
                });
            } else if (choice === '2') {
                rl.question("Enter name or skill to search: ", (query) => {
                    searchCandidates(query);
                    menu(); // Show menu again after searching
                });
            } else if (choice === '3') {
                console.log("Exiting the application.");
                rl.close();
            } else {
                console.log("Invalid choice. Please try again.");
                menu(); // Show menu again for invalid choice
            }
        });
    };

    menu(); // Start the menu
}

main();