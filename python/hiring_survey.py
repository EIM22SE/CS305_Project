import json
import os
import re

data_file = "candidates.json"
questions_file = "../questions.json"

###
def collect_candidate_info():
    if not os.path.exists(questions_file):
        print(f"Questions file '{questions_file}' not found. Ensure the file exists.")
        return None

    try:
        with open(questions_file, 'r') as f:
            questions = json.load(f)
            if not questions:
                print("No questions found in the file. Please check 'questions.json'.")
                return None
    except Exception as e:
        print(f"Error reading or deserializing 'questions.json': {e}")
        return None

    candidate = {}

    for question in questions:

        if "condition" in question and not evaluate_condition(candidate, question["condition"]):
            continue

        while True:
            response = input(f"{question['question']} ")
            if validate_response(question, response):
                set_field_value(candidate, question["field"], response, question["type"])
                break
            else:
                print(f"Invalid response. Please provide a valid answer for the question type '{question['type']}'.")

    print("\nAll questions answered successfully.")
    return candidate
