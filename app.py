from flask import Flask, request, jsonify, session
import sqlite3
import hashlib
import re
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

DB_PATH = 'database/asset_declaration.db'

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def validate_input(data, rules):
    errors = {}
    for field, field_rules in rules.items():
        value = data.get(field, '')
        
        if 'required' in field_rules and not value:
            errors[field] = 'This field is required'
            continue
            
        if value:
            if 'email' in field_rules and not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', value):
                errors[field] = 'Invalid email format'
            elif 'employee_id' in field_rules and not re.match(r'^\d{3,6}$', value):
                errors[field] = 'Invalid employee ID'
            elif 'phone' in field_rules and not re.match(r'^\+?[\d\s-()]{10,15}$', value):
                errors[field] = 'Invalid phone number'
            elif 'amount' in field_rules:
                try:
                    float(value)
                except ValueError:
                    errors[field] = 'Invalid amount'
            elif 'date' in field_rules:
                try:
                    datetime.strptime(value, '%Y-%m-%d')
                except ValueError:
                    errors[field] = 'Invalid date format'
    
    return errors

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    validation_rules = {
        'employee_id': ['required', 'employee_id'],
        'password': ['required']
    }
    
    errors = validate_input(data, validation_rules)
    if errors:
        return jsonify({'success': False, 'errors': errors}), 400
    
    conn = get_db()
    user = conn.execute(
        'SELECT * FROM users WHERE employee_id = ?',
        (data['employee_id'],)
    ).fetchone()
    
    if user and user['password_hash'] == hashlib.sha256(data['password'].encode()).hexdigest():
        session['user_id'] = user['id']
        session['user_name'] = user['name']
        return jsonify({'success': True, 'user': dict(user)})
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/profile', methods=['GET'])
def get_profile():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    conn = get_db()
    user = conn.execute(
        'SELECT * FROM users WHERE id = ?',
        (session['user_id'],)
    ).fetchone()
    
    return jsonify({'success': True, 'user': dict(user)})

@app.route('/api/assets/immovable', methods=['POST'])
def create_immovable_asset():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    data = request.get_json()
    
    validation_rules = {
        'asset_type': ['required'],
        'estimated_value': ['required', 'amount'],
        'asset_source': ['required'],
        'date_acquired': ['required', 'date']
    }
    
    errors = validate_input(data, validation_rules)
    if errors:
        return jsonify({'success': False, 'errors': errors}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO immovable_assets 
        (user_id, asset_type, owner, location, estimated_value, asset_source, upi, 
         date_acquired, is_joint, joint_percentage, is_bought, seller_name, 
         acquisition_value, is_loan, bank_name, installment, loan_amount, 
         loan_clear_date, is_rent, monthly_rent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        session['user_id'], data.get('asset_type'), data.get('owner'),
        data.get('location'), data.get('estimated_value'), data.get('asset_source'),
        data.get('upi'), data.get('date_acquired'), data.get('is_joint', 0),
        data.get('joint_percentage'), data.get('is_bought', 0), data.get('seller_name'),
        data.get('acquisition_value'), data.get('is_loan', 0), data.get('bank_name'),
        data.get('installment'), data.get('loan_amount'), data.get('loan_clear_date'),
        data.get('is_rent', 0), data.get('monthly_rent')
    ))
    
    conn.commit()
    return jsonify({'success': True, 'id': cursor.lastrowid})

@app.route('/api/assets/movable', methods=['POST'])
def create_movable_asset():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    data = request.get_json()
    
    validation_rules = {
        'asset_type': ['required'],
        'estimated_value': ['required', 'amount'],
        'asset_source': ['required'],
        'date_acquired': ['required', 'date']
    }
    
    errors = validate_input(data, validation_rules)
    if errors:
        return jsonify({'success': False, 'errors': errors}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO movable_assets 
        (user_id, asset_type, description, owner, location, estimated_value, 
         asset_source, date_acquired, is_joint, joint_percentage, is_bought, 
         seller_name, acquisition_value, is_loan, bank_name, installment, 
         loan_amount, loan_clear_date, spent_amount, economical_income)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        session['user_id'], data.get('asset_type'), data.get('description'),
        data.get('owner'), data.get('location'), data.get('estimated_value'),
        data.get('asset_source'), data.get('date_acquired'), data.get('is_joint', 0),
        data.get('joint_percentage'), data.get('is_bought', 0), data.get('seller_name'),
        data.get('acquisition_value'), data.get('is_loan', 0), data.get('bank_name'),
        data.get('installment'), data.get('loan_amount'), data.get('loan_clear_date'),
        data.get('spent_amount'), data.get('economical_income')
    ))
    
    conn.commit()
    return jsonify({'success': True, 'id': cursor.lastrowid})

@app.route('/api/assets/business', methods=['POST'])
def create_business_asset():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    data = request.get_json()
    
    validation_rules = {
        'business_type': ['required'],
        'capital': ['required', 'amount'],
        'annual_turnover': ['required', 'amount'],
        'annual_profit': ['required', 'amount']
    }
    
    errors = validate_input(data, validation_rules)
    if errors:
        return jsonify({'success': False, 'errors': errors}), 400
    
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO business_assets (user_id, business_type, capital, annual_turnover, annual_profit, tin)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        session['user_id'], data.get('business_type'), data.get('capital'),
        data.get('annual_turnover'), data.get('annual_profit'), data.get('tin')
    ))
    
    conn.commit()
    return jsonify({'success': True, 'id': cursor.lastrowid})

if __name__ == '__main__':
    app.run(debug=True)