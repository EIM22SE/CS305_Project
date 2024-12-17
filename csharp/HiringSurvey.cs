using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace HiringSurvey
{
    class Program
    {
        const string DATA_FILE = "candidates.json";

        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("\nMenu:");
                Console.WriteLine("1. Fill out the survey");
                Console.WriteLine("2. Search responses");
                Console.WriteLine("3. Exit");
                Console.Write("Choose an option: ");
                var choice = Console.ReadLine();

                if (choice == "1")
                {
                    var candidate = CollectCandidateInfo();
                    SaveCandidateInfo(candidate);
                    Console.WriteLine("Candidate information saved successfully.");
                }
                else if (choice == "2")
                {
                    Console.Write("Enter name or skill to search: ");
                    var query = Console.ReadLine();
                    SearchCandidates(query);
                }
                else if (choice == "3")
                {
                    Console.WriteLine("Exiting the application.");
                    break;
                }
                else
                {
                    Console.WriteLine("Invalid choice. Please try again.");
                }
            }
        }

        static Candidate CollectCandidateInfo()
        {
            Console.Write("Enter your name: ");
            var name = Console.ReadLine();

            string email;
            do
            {
                Console.Write("Enter your email: ");
                email = Console.ReadLine();
            } while (!ValidateEmail(email));

            string phone;
            do
            {
                Console.Write("Enter your phone number (e.g., +1234567890): ");
                phone = Console.ReadLine();
            } while (!ValidatePhone(phone));

            Console.Write("Do you have any certifications? (yes/no): ");
            var hasCertification = Console.ReadLine().ToLower() == "yes";
            List<string> certifications = new List<string>();

            if (hasCertification)
            {
                Console.Write("Enter your certifications (comma-separated): ");
                certifications = Console.ReadLine().Split(',').Select(c => c.Trim()).ToList();
            }

            int yearsOfExperience;
            do
            {
                Console.Write("Enter your years of experience: ");
            } while (!int.TryParse(Console.ReadLine(), out yearsOfExperience) || yearsOfExperience < 0);

            Console.Write("Enter your skills (comma-separated): ");
            var skills = Console.ReadLine().Split(',').Select(s => s.Trim()).ToList();

            return new Candidate
            {
                Name = name,
                Email = email,
                Phone = phone,
                HasCertification = hasCertification,
                Certifications = certifications,
                YearsOfExperience = yearsOfExperience,
                Skills = skills
            };
        }

        static void SaveCandidateInfo(Candidate candidate)
        {
            List<Candidate> candidates = new List<Candidate>();

            if (File.Exists(DATA_FILE))
            {
                var jsonData = File.ReadAllText(DATA_FILE);
                candidates = JsonConvert.DeserializeObject<List<Candidate>>(jsonData);
            }

            candidates.Add(candidate);
            var newJsonData = JsonConvert.SerializeObject(candidates, Formatting.Indented);
            File.WriteAllText(DATA_FILE, newJsonData);
        }

        static void SearchCandidates(string query)
        {
            if (!File.Exists(DATA_FILE))
            {
                Console.WriteLine("No candidates found.");
                return;
            }

            var jsonData = File.ReadAllText(DATA_FILE);
            var candidates = JsonConvert.DeserializeObject<List<Candidate>>(jsonData);

            var results = candidates.Where(c => c.Name.IndexOf(query, StringComparison.OrdinalIgnoreCase) >= 0 ||
                                                 c.Skills.Any(skill => skill.IndexOf(query, StringComparison.OrdinalIgnoreCase) >= 0)).ToList();

            if (results.Count > 0)
            {
                Console.WriteLine("\nSearch Results:");
                foreach (var candidate in results)
                {
                    Console.WriteLine($"Name: {candidate.Name}, Email: {candidate.Email}, Phone: {candidate.Phone}, " +
                                      $"Experience: {candidate.YearsOfExperience} years, Skills: {string.Join(", ", candidate.Skills)}, " +
                                      $"Has Certifications: {(candidate.HasCertification ? "Yes" : "No")}, " +
                                      $"Certifications: {(candidate.Certifications.Count > 0 ? string.Join(", ", candidate.Certifications) : "None")}");
                }
            }
            else
            {
                Console.WriteLine("No candidates found matching your query.");
            }
        }

        static bool ValidateEmail(string email)
        {
            var emailRegex = new System.Text.RegularExpressions.Regex(@"^[^@]+@[^@]+\.[^@]+$");
            return emailRegex.IsMatch(email);
        }

        static bool ValidatePhone(string phone)
        {
            var phoneRegex = new System.Text.RegularExpressions.Regex(@"^\+?[1-9]\d{1,14}$");
            return phoneRegex.IsMatch(phone);
        }

        class Candidate
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public bool HasCertification { get; set; }
            public List<string> Certifications { get; set; }
            public int YearsOfExperience { get; set; }
            public List<string> Skills { get; set; }
        }
    }
}