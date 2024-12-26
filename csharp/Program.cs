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
}