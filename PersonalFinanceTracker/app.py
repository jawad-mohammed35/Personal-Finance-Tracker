from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finance_tracker.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(100), nullable=False)

class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(100), nullable=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password:
            flash('Passwords do not match!', 'error')
            return redirect(url_for('register'))

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(username=username, password=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Registration successful! Please log in.', 'success')
            return redirect(url_for('index'))
        except:
            flash('Username already exists!', 'error')
            return redirect(url_for('register'))

    return render_template('register.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return redirect(url_for('dashboard'))
    else:
        flash('Invalid username or password', 'error')
        return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    user_id = session['user_id']
    incomes = Income.query.filter_by(user_id=user_id).all()
    budgets = Budget.query.filter_by(user_id=user_id).all()
    return render_template('dashboard.html', incomes=incomes, budgets=budgets)

@app.route('/add_income', methods=['POST'])
def add_income():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    amount = request.form['amount']
    category = request.form['category']
    date = request.form['date']
    new_income = Income(user_id=session['user_id'], amount=amount, category=category, date=date)
    db.session.add(new_income)
    db.session.commit()
    return redirect(url_for('dashboard'))

@app.route('/add_budget', methods=['POST'])
def add_budget():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    amount = request.form['amount']
    category = request.form['category']
    date = request.form['date']
    new_budget = Budget(user_id=session['user_id'], amount=amount, category=category, date=date)
    db.session.add(new_budget)
    db.session.commit()
    return redirect(url_for('dashboard'))

@app.route('/export', methods=['GET'])
def export():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    user_id = session['user_id']
    incomes = Income.query.filter_by(user_id=user_id).all()
    budgets = Budget.query.filter_by(user_id=user_id).all()

    income_data = [{'amount': income.amount, 'category': income.category, 'date': income.date} for income in incomes]
    budget_data = [{'amount': budget.amount, 'category': budget.category, 'date': budget.date} for budget in budgets]

    df_income = pd.DataFrame(income_data)
    df_budget = pd.DataFrame(budget_data)

    with pd.ExcelWriter('personal_finance_tracker.xlsx') as writer:
        df_income.to_excel(writer, sheet_name='Income', index=False)
        df_budget.to_excel(writer, sheet_name='Budget', index=False)

    return redirect(url_for('dashboard'))

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)