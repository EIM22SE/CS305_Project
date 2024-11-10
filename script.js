function showQuestions() {
    const ageGroup = document.getElementById("age").value;
    document.getElementById("under18Questions").classList.add("hidden");
    document.getElementById("adultQuestions").classList.add("hidden");
    document.getElementById("over35Questions").classList.add("hidden");

    if (ageGroup === "under18") {
        document.getElementById("under18Questions").classList.remove("hidden");
    } else if (ageGroup === "18to35") {
        document.getElementById("adultQuestions").classList.remove("hidden");
    } else if (ageGroup === "over35") {
        document.getElementById("over35Questions").classList.remove("hidden");
    }
}

function showSchoolQuestions() {
    const schoolStatus = document.getElementById("school").value;
    document.getElementById("schoolQuestions").classList.toggle("hidden", schoolStatus !== "yes");
}

function showHobbyQuestions() {
    const hobby = document.getElementById("hobbiesUnder18").value;
    document.getElementById("sportsQuestions").classList.add("hidden");
    document.getElementById("artsQuestions").classList.add("hidden");
    document.getElementById("gamingQuestions").classList.add("hidden");

    if (hobby === "sports") {
        document.getElementById("sportsQuestions").classList.remove("hidden");
    } else if (hobby === "arts") {
        document.getElementById("artsQuestions").classList.remove("hidden");
    } else if (hobby === "gaming") {
        document.getElementById("gamingQuestions").classList.remove("hidden");
    }
}

function showEmploymentQuestions() {
    const employmentStatus = document.getElementById("employment").value;
    document.getElementById("jobQuestions").classList.toggle("hidden", employmentStatus !== "yes");
}

function showAdultHobbyQuestions() {
    const hobby = document.getElementById("hobbiesAdult").value;
    document.getElementById("travelingQuestions").classList.add("hidden");
    document.getElementById("readingQuestions").classList.add("hidden");
    document.getElementById("fitnessQuestions").classList.add("hidden");

    if (hobby === "traveling") {
        document.getElementById("travelingQuestions").classList.remove("hidden");
    } else if (hobby === "reading") {
        document.getElementById("readingQuestions").classList.remove("hidden");
    } else if (hobby === "fitness") {
        document.getElementById("fitnessQuestions").classList.remove("hidden");
    }
}

function showMaritalQuestions() {
    const maritalStatus = document.getElementById("maritalStatus").value;
    document.getElementById("childrenQuestions").classList.toggle("hidden", maritalStatus !== "married");

    if (maritalStatus === "married") {
        document.getElementById("childrenQuestions").classList.remove("hidden");
    } else {
        document.getElementById("childrenQuestions").classList.add("hidden");
        document.getElementById("childrenAgeQuestions").classList.add("hidden"); // Hide if not married
    }
}

document.getElementById("children").addEventListener("change", function () {
    const hasChildren = this.value;
    document.getElementById("childrenAgeQuestions").classList.toggle("hidden", hasChildren !== "yes");
});