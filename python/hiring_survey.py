import json
import re
import os

DATA_FILE = 'candidates.json'

def validate_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None


def validate_phone(phone):
    return re.match(r"^\+?[1-9]\d{1,14}$", phone) is not None


def validate_years_of_experience(years):
    return years.isdigit() and int(years) >= 0


def collect_candidate_info():
    name = input("Enter your name: ")

    email = input("Enter your email: ")
    while not validate_email(email):
        print("Invalid email format. Please try again.")
        email = input("Enter your email: ")

    phone = input("Enter your phone number (e.g., +1234567890): ")
    while not validate_phone(phone):
        print("Invalid phone number format. Please try again. Use the format: +1234567890")
        phone = input("Enter your phone number (e.g., +1234567890): ")

    has_certification = input("Do you have any certifications? (yes/no): ").strip().lower()
    certifications = []
    if has_certification == "yes":
        certifications = input("Enter your certifications (comma-separated): ").split(',')

    years_of_experience = input("Enter your years of experience: ")
    while not validate_years_of_experience(years_of_experience):
        print("Invalid input. Please enter a valid number of years.")
        years_of_experience = input("Enter your years of experience: ")

    skills = input("Enter your skills (comma-separated): ").split(',')

    candidate_info = {
        "name": name,
        "email": email,
        "phone": phone,
        "has_certification": has_certification == "yes",  # Store as boolean
        "certifications": [cert.strip() for cert in certifications],
        "years_of_experience": int(years_of_experience),
        "skills": [skill.strip() for skill in skills]
    }

    print("\n=== Candidate Information ===")
    print(f"Name: {candidate_info['name']}")
    print(f"Email: {candidate_info['email']}")
    print(f"Phone: {candidate_info['phone']}")
    print(f"Has Certifications: {'Yes' if candidate_info['has_certification'] else 'No'}")
    print(f"Certifications: {', '.join(candidate_info['certifications']) if certifications else 'None'}")
    print(f"Years of Experience: {candidate_info['years_of_experience']}")
    print(f"Skills: {', '.join(candidate_info['skills'])}")

    return candidate_info


def save_candidate_info(candidate):
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            data = json.load(file)
    else:
        data = []

    data.append(candidate)

    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)


def search_candidates(query):
    if not os.path.exists(DATA_FILE):
        print("No candidates found.")
        return

    with open(DATA_FILE, 'r') as file:
        candidates = json.load(file)

    results = [c for c in candidates if
               query.lower() in c['name'].lower() or any(query.lower() in skill.lower() for skill in c['skills'])]

    if results:
        print("\nSearch Results:")
        for candidate in results:
            print(
                f"Name: {candidate['name']}, Email: {candidate['email']}, Phone: {candidate['phone']}, "
                f"Experience: {candidate['years_of_experience']} years, Skills: {', '.join(candidate['skills'])}, "
                f"Has Certifications: {'Yes' if candidate['has_certification'] else 'No'}, "
                f"Certifications: {', '.join(candidate['certifications']) if candidate['certifications'] else 'None'}")
    else:
        print("No candidates found matching your query.")


def main():
    while True:
        print("\nMenu:")
        print("1. Fill out the survey")
        print("2. Search responses")
        print("3. Exit")

        choice = input("Choose an option: ")

        if choice == '1':
            candidate_info = collect_candidate_info()
            save_candidate_info(candidate_info)
            print("Candidate information saved successfully.")
        elif choice == '2':
            query = input("Enter name or skill to search: ")
            search_candidates(query)
        elif choice == '3':
            print("Exiting the application.")
            break
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()