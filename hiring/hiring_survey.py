import json
import os
import re
from typing import Dict, List, Any

def validate_email(email: str) -> bool:
    """Validate email format."""
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None

def validate_phone(phone: str) -> bool:
    """Validate phone number format (simple validation)."""
    return re.match(r"^\d{3}-\d{3}-\d{4}$", phone) is not None

def get_personal_info() -> Dict[str, Any]:
    print("\n=== Hiring Survey ===")
    
    # Collecting personal information
    name = input("Enter your name: ")
    
    email = input("Enter your email: ")
    while not validate_email(email):
        print("Invalid email format. Please try again.")
        email = input("Enter your email: ")
    
    phone = input("Enter your phone number (format: xxx-xxx-xxxx): ")
    while not validate_phone(phone):
        print("Invalid phone number format. Please try again.")
        phone = input("Enter your phone number (format: xxx-xxx-xxxx): ")
    
    # Asking about certifications
    has_certification = input("Do you have any certifications? (yes/no): ").strip().lower()
    
    certification_name = ""
    if has_certification == "yes":
        certification_name = input("Enter the name of your certification: ")
    
    # Asking about experience
    years_of_experience = input("How many years of experience do you have in your field? ")
    while not years_of_experience.isdigit():
        print("Please enter a valid number.")
        years_of_experience = input("How many years of experience do you have in your field? ")
    
    # Asking about skills
    skills = input("List your skills (comma-separated): ").split(',')
    skills = [skill.strip() for skill in skills]  # Clean up whitespace
    
    return {
        "name": name,
        "email": email,
        "phone": phone,
        "has_certification": has_certification,
        "certification_name": certification_name,
        "years_of_experience": int(years_of_experience),
        "skills": skills
    }

def display_results(info):
    print("\n=== Submission Confirmation ===")
    print(f"Name: {info['name']}")
    print(f"Email: {info['email']}")
    print(f"Phone: {info['phone']}")
    print(f"Has Certification: {info['has_certification']}")
    if info['has_certification'] == "yes":
        print(f"Certification Name: {info['certification_name']}")
    print(f"Years of Experience: {info['years_of_experience']}")
    print(f"Skills: {', '.join(info['skills'])}")

def save_to_json(data, filename='survey_responses.json'):
    """Save survey response to a JSON file."""
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as file:
            responses = json.load(file)
    else:
        responses = []
    
    responses.append(data)
    
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(responses, file, indent=4)

def search_responses(responses):
    """Search for candidates based on name or skills."""
    search_term = input("Enter a name or skill to search for: ").strip().lower()
    found = False

    for response in responses:
        # Check if the 'name' key exists
        if 'name' in response and search_term in response['name'].lower():
            print(f"Found candidate: {response['name']}")
            found = True
            continue  # Skip to the next response after finding a match

        # Check if the 'skills' key exists
        if 'skills' in response and any(search_term in skill.lower() for skill in response['skills']):
            print(f"Found candidate with skill '{search_term}': {response['name']}")
            found = True

    if not found:
        print("No candidates found.")

def main():
    while True:
        print("\n=== Hiring Survey System ===")
        print("1. Fill out survey")
        print("2. Search responses")
        print("3. Exit")
        
        choice = input("Choose an option: ")
        
        if choice == '1':
            personal_info = get_personal_info()
            display_results(personal_info)
            save_to_json(personal_info)
        elif choice == '2':
            if os.path.exists('survey_responses.json'):
                with open('survey_responses.json', 'r', encoding='utf-8') as file:
                    responses = json.load(file)
                search_responses(responses)
            else:
                print("No survey responses found.")
        elif choice == '3':
            print("Exiting the program.")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()