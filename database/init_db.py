import sqlite3
import hashlib

def create_database():
    conn = sqlite3.connect('asset_declaration.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        job_title TEXT,
        department TEXT,
        phone TEXT,
        status TEXT DEFAULT 'active',
        role TEXT DEFAULT 'employee',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Immovable assets
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS immovable_assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        asset_type TEXT NOT NULL,
        owner TEXT,
        location TEXT,
        estimated_value REAL NOT NULL,
        asset_source TEXT NOT NULL,
        upi TEXT,
        date_acquired DATE NOT NULL,
        is_joint BOOLEAN DEFAULT 0,
        joint_percentage REAL,
        is_bought BOOLEAN DEFAULT 0,
        seller_name TEXT,
        acquisition_value REAL,
        is_loan BOOLEAN DEFAULT 0,
        bank_name TEXT,
        installment TEXT,
        loan_amount REAL,
        loan_clear_date DATE,
        is_rent BOOLEAN DEFAULT 0,
        monthly_rent REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Movable assets
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS movable_assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        asset_type TEXT NOT NULL,
        description TEXT,
        owner TEXT,
        location TEXT,
        estimated_value REAL NOT NULL,
        asset_source TEXT NOT NULL,
        date_acquired DATE NOT NULL,
        is_joint BOOLEAN DEFAULT 0,
        joint_percentage REAL,
        is_bought BOOLEAN DEFAULT 0,
        seller_name TEXT,
        acquisition_value REAL,
        is_loan BOOLEAN DEFAULT 0,
        bank_name TEXT,
        installment TEXT,
        loan_amount REAL,
        loan_clear_date DATE,
        spent_amount REAL,
        economical_income REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Incorporeal assets
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS incorporeal_assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        asset_type TEXT NOT NULL,
        company_name TEXT,
        share_amount REAL,
        debt_amount REAL,
        debt_source TEXT,
        nature_of_debt TEXT,
        location TEXT,
        tin TEXT,
        dividend TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Business assets
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS business_assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        business_type TEXT NOT NULL,
        capital REAL NOT NULL,
        annual_turnover REAL NOT NULL,
        annual_profit REAL NOT NULL,
        tin TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Sold assets
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sold_assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        asset_type TEXT NOT NULL,
        location TEXT NOT NULL,
        sale_amount REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Insert default admin user
    admin_password = hashlib.sha256('admin123'.encode()).hexdigest()
    cursor.execute('''
    INSERT OR IGNORE INTO users (employee_id, name, email, password_hash, job_title, department, role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', ('7516', 'Afurika ONESME', 'onesme@rra.gov.rw', admin_password, 'TAX OFFICER', 'Small and Medium Taxpayers', 'admin'))
    
    conn.commit()
    conn.close()
    print("Database created successfully!")

if __name__ == "__main__":
    create_database()