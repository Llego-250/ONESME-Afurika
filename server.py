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
        except:
            self.send_json_response({'success': False, 'message': 'Invalid JSON'}, 400)
            return
        
        if self.path == '/api/verify-employee':
            self.verify_employee(data)
        elif self.path == '/api/verify-otp':
            self.verify_otp(data)
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
        
        cursor.execute('''
            INSERT INTO business_assets (user_id, business_type, capital, annual_turnover, annual_profit, tin)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (1, data['business_type'], data['capital'], data['annual_turnover'], data['annual_profit'], data.get('tin', '')))
        
        conn.commit()
        conn.close()
        
        self.send_json_response({'success': True, 'id': cursor.lastrowid})
    
    def save_sold_asset(self, data):
        errors = self.validate_sold_data(data)
        if errors:
            self.send_json_response({'success': False, 'errors': errors}, 400)
            return
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO sold_assets (user_id, asset_type, location, sale_amount)
            VALUES (?, ?, ?, ?)
        ''', (1, data['asset_type'], data['location'], data['sale_amount']))
        
        conn.commit()
        conn.close()
        
        self.send_json_response({'success': True, 'id': cursor.lastrowid})
    
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