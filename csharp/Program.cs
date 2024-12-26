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