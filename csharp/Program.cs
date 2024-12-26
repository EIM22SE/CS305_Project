using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

public class Program
{
    const string DATA_FILE = "candidates.json";
    const string QUESTIONS_FILE = "questions.json";
    public static void Main(string[] args){
        while (true)
        {
            Console.WriteLine("\nMenu:");
            Console.WriteLine("1. Fill out the survey");
            Console.WriteLine("2. Search responses");
            Console.WriteLine("3. Exit");
            Console.Write("Choose an option: ");

            var choice = Console.ReadLine();
        }
    }

    static Candidate CollectCandidateInfo()
    {
        if (!File.Exists(QUESTIONS_FILE))
        {
            Console.WriteLine($"Questions file '{QUESTIONS_FILE}' not found.");
            return null;
        }

        var questions = JsonConvert.DeserializeObject<List<Question>>(File.ReadAllText(QUESTIONS_FILE));
        var candidate = new Candidate();

        foreach (var question in questions)
        {
            if (question.Condition != null && !EvaluateCondition(candidate, question.Condition))
            {
                continue;
            }

            string response;
           
            do
            {
                Console.Write(question.QuestionText + " ");
                response = Console.ReadLine();

            } while (!ValidateResponse(question, response));

        }

        return candidate;
    }

    static bool EvaluateCondition(Candidate candidate, string condition)
    {
        var parts = condition.Split("==");
        if (parts.Length != 2) return false;

        var field = parts[0].Trim();
        var value = parts[1].Trim().Trim('\'');

        var property = typeof(Candidate).GetProperty(field);
        if (property == null) return false;

        var candidateValue = property.GetValue(candidate)?.ToString();
        return candidateValue == value;
    }

    static bool ValidateResponse(Question question, string response)
    {
        switch (question.Type)
        {
            case "email":
                return ValidateEmail(response);
            case "phone":
                return ValidatePhone(response);
            case "integer":
                return int.TryParse(response, out var value) && value >= 0;
            case "boolean":
                return response.Equals("yes", StringComparison.OrdinalIgnoreCase) || response.Equals("no", StringComparison.OrdinalIgnoreCase);
            default:
                return true;
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
            public List<string> Certifications { get; set; } = new List<string>();
            public int YearsOfExperience { get; set; }
            public List<string> Skills { get; set; } = new List<string>();
        }

        class Question
        {
            public string QuestionText { get; set; }
            public string Field { get; set; }
            public string Type { get; set; }
            public string Condition { get; set; }
        }
}