from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/survey', methods=['GET', 'POST'])
def survey():
    if request.method == 'POST':
        age_group = request.form.get('age')
        if age_group == 'under18':
            return redirect(url_for('under18'))
        elif age_group == '18to35':
            return redirect(url_for('adult'))
        elif age_group == 'over35':
            return redirect(url_for('over35'))
    return render_template('survey.html')

@app.route('/under18', methods=['GET', 'POST'])
def under18():
    if request.method == 'POST':
        # Handle under 18 responses
        school = request.form.get('school')
        # Process other questions here...
        return redirect(url_for('thank_you'))
    return render_template('under18.html')

@app.route('/adult', methods=['GET', 'POST'])
def adult():
    if request.method == 'POST':
        employment = request.form.get('employment')
        # Process other questions here...
        return redirect(url_for('thank_you'))
    return render_template('adult.html')

@app.route('/over35', methods=['GET', 'POST'])
def over35():
    if request.method == 'POST':
        marital_status = request.form.get('marital_status')
        # Process other questions here...
        return redirect(url_for('thank_you'))
    return render_template('over35.html')

@app.route('/thank_you')
def thank_you():
    return "Thank you for completing the survey!"

if __name__ == '__main__':
    app.run(debug=True)