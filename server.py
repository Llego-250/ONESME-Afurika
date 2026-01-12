import http.server
import socketserver
import json
import sqlite3
import hashlib
import re
from urllib.parse import urlparse, parse_qs
from datetime import datetime
import os

PORT = 8000
DB_PATH = 'database/asset_declaration.db'

class AssetHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='static', **kwargs)
    
    def do_GET(self):
        if self.path == '/api/assets/count':
            self.get_asset_counts()
        elif self.path.startswith('/api/assets/view'):
            self.view_assets()
        else:
            super().do_GET()
    
    def get_asset_counts(self):
        conn = sqlite3.connect(DB_PATH)
        business_count = conn.execute('SELECT COUNT(*) FROM business_assets').fetchone()[0]
        sold_count = conn.execute('SELECT COUNT(*) FROM sold_assets').fetchone()[0]
        immovable_count = conn.execute('SELECT COUNT(*) FROM immovable_assets').fetchone()[0]
        movable_count = conn.execute('SELECT COUNT(*) FROM movable_assets').fetchone()[0]
        incorporeal_count = conn.execute('SELECT COUNT(*) FROM incorporeal_assets').fetchone()[0]
        conn.close()
        
        self.send_json_response({
            'business_assets': business_count,
            'sold_assets': sold_count,
            'immovable_assets': immovable_count,
            'movable_assets': movable_count,
            'incorporeal_assets': incorporeal_count
        })
    
    def view_assets(self):
        # Parse query parameters
        from urllib.parse import urlparse, parse_qs
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)
        
        asset_type = params.get('type', ['all'])[0]
        view_mode = params.get('view', ['card'])[0]
        
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        
        assets = []
        
        if asset_type == 'all' or asset_type == 'business':
            business_assets = conn.execute('SELECT *, "business" as type FROM business_assets').fetchall()
            assets.extend([dict(row) for row in business_assets])
        
        if asset_type == 'all' or asset_type == 'sold':
            sold_assets = conn.execute('SELECT *, "sold" as type FROM sold_assets').fetchall()
            assets.extend([dict(row) for row in sold_assets])
        
        if asset_type == 'all' or asset_type == 'immovable':
            immovable_assets = conn.execute('SELECT *, "immovable" as type FROM immovable_assets').fetchall()
            assets.extend([dict(row) for row in immovable_assets])
        
        if asset_type == 'all' or asset_type == 'movable':
            movable_assets = conn.execute('SELECT *, "movable" as type FROM movable_assets').fetchall()
            assets.extend([dict(row) for row in movable_assets])
        
        if asset_type == 'all' or asset_type == 'incorporeal':
            incorporeal_assets = conn.execute('SELECT *, "incorporeal" as type FROM incorporeal_assets').fetchall()
            assets.extend([dict(row) for row in incorporeal_assets])
        
        conn.close()
        
        self.send_json_response({
            'success': True,
            'assets': assets,
            'view_mode': view_mode,
            'total': len(assets)
        })
    
    def do_POST(self):
        if self.path.startswith('/api/'):
            self.handle_api()
        else:
            self.send_error(404)
    
    def handle_api(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            print(f"Received data: {data}")
        except Exception as e:
            print(f"JSON decode error: {e}")
            self.send_json_response({'success': False, 'message': 'Invalid JSON'}, 400)
            return
        
        if self.path == '/api/verify-employee':
            self.verify_employee(data)
        elif self.path == '/api/verify-otp':
            self.verify_otp(data)
        elif self.path == '/api/assets/immovable':
            self.save_immovable_asset(data)
        elif self.path == '/api/assets/movable':
            self.save_movable_asset(data)
        elif self.path == '/api/assets/incorporeal':
            self.save_incorporeal_asset(data)
        elif self.path == '/api/assets/business':
            self.save_business_asset(data)
        elif self.path == '/api/assets/sold':
            self.save_sold_asset(data)
        else:
            self.send_json_response({'success': False, 'message': 'Endpoint not found'}, 404)
    
    def verify_employee(self, data):
        employee_id = data.get('employeeId', '').strip()
        
        # Hard-coded test user
        if employee_id == '7516':
            self.send_json_response({'success': True, 'message': 'Employee verified'})
        else:
            self.send_json_response({'success': False, 'message': 'Employee not found'}, 401)
    
    def verify_otp(self, data):
        otp = data.get('otp', '').strip()
        
        # Hard-coded OTP for testing
        if otp == '123456':
            self.send_json_response({'success': True, 'message': 'OTP verified'})
        else:
            self.send_json_response({'success': False, 'message': 'Invalid OTP'}, 401)
    
    def save_business_asset(self, data):
        errors = self.validate_business_data(data)
        if errors:
            self.send_json_response({'success': False, 'errors': errors}, 400)
            return
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        try:
            cursor.execute('''
                INSERT INTO business_assets (user_id, business_type, capital, annual_turnover, annual_profit, tin)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (1, data['business_type'], data['capital'], data['annual_turnover'], data['annual_profit'], data.get('tin', '')))
            
            conn.commit()
            asset_id = cursor.lastrowid
            print(f"Business asset saved with ID: {asset_id}")
            self.send_json_response({'success': True, 'id': asset_id})
        except Exception as e:
            print(f"Error saving business asset: {e}")
            self.send_json_response({'success': False, 'error': str(e)}, 500)
        finally:
            conn.close()
    
    def save_sold_asset(self, data):
        errors = self.validate_sold_data(data)
        if errors:
            self.send_json_response({'success': False, 'errors': errors}, 400)
            return
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        try:
            cursor.execute('''
                INSERT INTO sold_assets (user_id, asset_type, location, sale_amount)
                VALUES (?, ?, ?, ?)
            ''', (1, data['asset_type'], data['location'], data['sale_amount']))
            
            conn.commit()
            asset_id = cursor.lastrowid
            print(f"Sold asset saved with ID: {asset_id}")
            self.send_json_response({'success': True, 'id': asset_id})
        except Exception as e:
            print(f"Error saving sold asset: {e}")
            self.send_json_response({'success': False, 'error': str(e)}, 500)
        finally:
            conn.close()
    
    def validate_business_data(self, data):
        errors = {}
        
        if not data.get('business_type', '').strip():
            errors['business_type'] = 'Business type is required'
        
        for field in ['capital', 'annual_turnover', 'annual_profit']:
            try:
                value = float(data.get(field, 0))
                if value < 0:
                    errors[field] = f'{field.replace("_", " ").title()} must be positive'
            except (ValueError, TypeError):
                errors[field] = f'Invalid {field.replace("_", " ")}'
        
        return errors
    
    def save_immovable_asset(self, data):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO immovable_assets 
            (user_id, asset_type, owner, location, estimated_value, asset_source, upi, 
             date_acquired, is_joint, joint_percentage, is_bought, seller_name, 
             acquisition_value, is_loan, bank_name, installment, loan_amount, 
             loan_clear_date, is_rent, monthly_rent)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            1, data.get('asset_type', 'residential'), data.get('owner', ''),
            data.get('location', ''), data.get('estimated_value', 0), data.get('asset_source', ''),
            data.get('upi', ''), data.get('date_acquired', ''), data.get('is_joint', 0),
            data.get('joint_percentage', 0), data.get('is_bought', 0), data.get('seller_name', ''),
            data.get('acquisition_value', 0), data.get('is_loan', 0), data.get('bank_name', ''),
            data.get('installment', ''), data.get('loan_amount', 0), data.get('loan_clear_date', ''),
            data.get('is_rent', 0), data.get('monthly_rent', 0)
        ))
        
        conn.commit()
        conn.close()
        
        self.send_json_response({'success': True, 'id': cursor.lastrowid})
    
    def save_movable_asset(self, data):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO movable_assets 
            (user_id, asset_type, description, owner, location, estimated_value, 
             asset_source, date_acquired, is_joint, joint_percentage, is_bought, 
             seller_name, acquisition_value, is_loan, bank_name, installment, 
             loan_amount, loan_clear_date, spent_amount, economical_income)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            1, data.get('asset_type', 'vehicle'), data.get('description', ''),
            data.get('owner', ''), data.get('location', ''), data.get('estimated_value', 0),
            data.get('asset_source', ''), data.get('date_acquired', ''), data.get('is_joint', 0),
            data.get('joint_percentage', 0), data.get('is_bought', 0), data.get('seller_name', ''),
            data.get('acquisition_value', 0), data.get('is_loan', 0), data.get('bank_name', ''),
            data.get('installment', ''), data.get('loan_amount', 0), data.get('loan_clear_date', ''),
            data.get('spent_amount', 0), data.get('economical_income', 0)
        ))
        
        conn.commit()
        conn.close()
        
        self.send_json_response({'success': True, 'id': cursor.lastrowid})
    
    def save_incorporeal_asset(self, data):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO incorporeal_assets 
            (user_id, asset_type, company_name, share_amount, debt_amount, debt_source, 
             nature_of_debt, location, tin, dividend)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            1, data.get('asset_type', 'shares'), data.get('company_name', ''),
            data.get('share_amount', 0), data.get('debt_amount', 0), data.get('debt_source', ''),
            data.get('nature_of_debt', ''), data.get('location', ''), data.get('tin', ''),
            data.get('dividend', '')
        ))
        
        conn.commit()
        conn.close()
        
        self.send_json_response({'success': True, 'id': cursor.lastrowid})
    
    def validate_sold_data(self, data):
        errors = {}
        
        if not data.get('asset_type', '').strip():
            errors['asset_type'] = 'Asset type is required'
        
        if not data.get('location', '').strip():
            errors['location'] = 'Location is required'
        
        try:
            value = float(data.get('sale_amount', 0))
            if value <= 0:
                errors['sale_amount'] = 'Sale amount must be positive'
        except (ValueError, TypeError):
            errors['sale_amount'] = 'Invalid sale amount'
        
        return errors
    
    def send_json_response(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), AssetHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        httpd.serve_forever()