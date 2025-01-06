using Newtonsoft.Json;

namespace HiringSurvey
{
    public class Program
    {
        const string DATA_FILE = "candidates.json";
        const string QUESTIONS_FILE = "../questions.json";
        public static void Main(string[] args)
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

           static Candidate CollectCandidateInfo()
            {
                if (!File.Exists(QUESTIONS_FILE))
                {
                    Console.WriteLine($"Questions file '{QUESTIONS_FILE}' not found. Ensure the file exists in the specified path.");
                    return null;
                }

                List<Question> questions;
                try
                {
                    var fileContent = File.ReadAllText(QUESTIONS_FILE);
                    questions = JsonConvert.DeserializeObject<List<Question>>(fileContent) ?? new List<Question>();
                    if (questions == null || questions.Count == 0)
                    {
                        Console.WriteLine("No questions found in the file. Please check the content of 'questions.json'.");
                        return null;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error reading or deserializing 'questions.json': {ex.Message}");
                    return null;
                }

                var candidate = new Candidate();

                foreach (var question in questions)
                {
                    if (!string.IsNullOrEmpty(question.condition) && !EvaluateCondition(candidate, question.condition))
                    {
                        continue;
                    }

                    string response;
                    bool validResponse;

                    do
                    {
                        Console.WriteLine($"{question.question}");
                        response = Console.ReadLine();

                        validResponse = ValidateResponse(question, response);
                        if (!validResponse)
                        {
                            Console.WriteLine($"Invalid response. Please provide a valid answer for the question type '{question.type}'.");
                        }
                    } while (!validResponse);

                    SetFieldValue(candidate, question.field, response, question.type);
                }

                Console.WriteLine("\nAll questions answered successfully.");
                return candidate;
            }

            static bool EvaluateCondition(Candidate candidate, string condition)
            {
                var parts = condition.Split("==");
                if (parts.Length != 2)
                {
                    return false;
                }

                var field = parts[0].Trim();
                var expectedValue = parts[1].Trim().Trim('\'');

                var property = typeof(Candidate).GetProperty(field);
                if (property == null)
                {
                    return false;
                }

                var actualValue = property.GetValue(candidate);

                if (property.PropertyType == typeof(bool))
                {
                    if (bool.TryParse(expectedValue, out var expectedBoolValue))
                    {
                        return actualValue is bool actualBoolValue && actualBoolValue == expectedBoolValue;
                    }
                }

                if (property.PropertyType == typeof(int))
                {
                    if (int.TryParse(expectedValue, out var expectedIntValue))
                    {
                        return actualValue is int actualIntValue && actualIntValue == expectedIntValue;
                    }
                }

                return actualValue?.ToString() == expectedValue;
            }

            static bool ValidateResponse(Question question, string response)
            {
                return question.type switch
                {
                    "email" => ValidateEmail(response),
                    "phone" => ValidatePhone(response),
                    "integer" => int.TryParse(response, out var value) && value >= 0,
                    "boolean" => response.Equals("yes", StringComparison.OrdinalIgnoreCase) || response.Equals("no", StringComparison.OrdinalIgnoreCase),
                    _ => true,
                };
            }

           static void SetFieldValue(Candidate candidate, string field, string value, string type)
            {
                var property = typeof(Candidate).GetProperty(field);
                if (property == null) return;

                object parsedValue = type switch
                {
                    "integer" => int.TryParse(value, out var intValue) ? intValue : 0,
                    "boolean" => value.Equals("yes", StringComparison.OrdinalIgnoreCase),
                    "list" => value.Split(',').Select(item => item.Trim()).ToList(),
                    _ => value
                };

                property.SetValue(candidate, parsedValue);
            }


            static void SaveCandidateInfo(Candidate candidate)
            {
                var candidates = new List<Candidate>();

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

        }

       class Candidate
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public bool HasCertification { get; set; }
            public List<string> Certifications { get; set; } = new List<string>();
            public int YearsOfExperience { get; set; }
            public List<string> Skills { get; set; } = new List<string>();
            public bool ImmediateStart { get; set; }
            public string AvailableStart { get; set; }
            public bool HasManagementExperience { get; set; }
            public int PeopleManaged { get; set; }
            public bool CriminalRecord { get; set; }
            public string CriminalRecordDetails { get; set; }
            public bool HasReferences { get; set; }
            public List<string> References { get; set; } = new List<string>();
        }


        class Question
        {
            public string question { get; set; }
            public string field { get; set; }
            public string type { get; set; }
            public string condition { get; set; }
        }
    }
}