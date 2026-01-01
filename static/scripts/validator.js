class Validator {
    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        return input.replace(/[<>'"&]/g, '').trim();
    }
    
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    static validateEmployeeId(id) {
        return /^\d{3,6}$/.test(id);
    }
    
    static validatePhone(phone) {
        return /^\+?[\d\s-()]{10,15}$/.test(phone);
    }
    
    static validateAmount(amount) {
        const num = parseFloat(amount);
        return !isNaN(num) && num >= 0;
    }
    
    static validateDate(date) {
        const d = new Date(date);
        return d instanceof Date && !isNaN(d) && d <= new Date();
    }
    
    static validateRequired(value) {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    }
    
    static showError(element, message) {
        element.style.borderColor = '#e74c3c';
        let errorDiv = element.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '4px';
            element.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
    
    static clearError(element) {
        element.style.borderColor = '';
        const errorDiv = element.parentNode.querySelector('.error-message');
        if (errorDiv) errorDiv.remove();
    }
    
    static validateForm(form, rules) {
        let isValid = true;
        
        for (const [fieldName, fieldRules] of Object.entries(rules)) {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;
            
            this.clearError(field);
            const value = this.sanitizeInput(field.value);
            
            for (const rule of fieldRules) {
                if (rule.type === 'required' && !this.validateRequired(value)) {
                    this.showError(field, rule.message || 'This field is required');
                    isValid = false;
                    break;
                }
                if (rule.type === 'email' && value && !this.validateEmail(value)) {
                    this.showError(field, rule.message || 'Invalid email format');
                    isValid = false;
                    break;
                }
                if (rule.type === 'employeeId' && value && !this.validateEmployeeId(value)) {
                    this.showError(field, rule.message || 'Invalid employee ID');
                    isValid = false;
                    break;
                }
                if (rule.type === 'phone' && value && !this.validatePhone(value)) {
                    this.showError(field, rule.message || 'Invalid phone number');
                    isValid = false;
                    break;
                }
                if (rule.type === 'amount' && value && !this.validateAmount(value)) {
                    this.showError(field, rule.message || 'Invalid amount');
                    isValid = false;
                    break;
                }
                if (rule.type === 'date' && value && !this.validateDate(value)) {
                    this.showError(field, rule.message || 'Invalid date');
                    isValid = false;
                    break;
                }
            }
        }
        
        return isValid;
    }
}

class API {
    static async post(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    
    static async get(endpoint) {
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}