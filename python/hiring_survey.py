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

def evaluate_condition(candidate, condition):
    try:
        ###################################################################################
        condition = condition.replace("== true", "== True").replace("== false", "== False")
        return eval(condition, {}, candidate)
    except Exception as e:
        print(f"Error evaluating condition '{condition}': {e}")
        return False

def validate_response(question, response):
    if question["type"] == "email":
        return validate_email(response)
    elif question["type"] == "phone":
        return validate_phone(response)
    elif question["type"] == "integer":
        return response.isdigit() and int(response) >= 0
    elif question["type"] == "boolean":
        return response.lower() in ["yes", "no"]
    else:
        return True

def set_field_value(candidate, field, value, field_type):
    if field_type == "integer":
        candidate[field] = int(value)
    elif field_type == "boolean":
        candidate[field] = value.lower() == "yes"
    elif field_type == "list":
        candidate[field] = [item.strip() for item in value.split(",")]
    else:
        candidate[field] = value

def save_candidate_info(candidate):
    candidates = []

    if os.path.exists(data_file):
        with open(data_file, 'r') as f:
            candidates = json.load(f)

    candidates.append(candidate)

    with open(data_file, 'w') as f:
        json.dump(candidates, f, indent=4)

