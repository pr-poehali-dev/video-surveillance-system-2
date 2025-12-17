import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import BaseModel, EmailStr, Field, ValidationError
from typing import Dict, Any

class ContactForm(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=5, max_length=20)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=1000)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        form_data = ContactForm(**body_data)
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        admin_email = os.environ.get('ADMIN_EMAIL')
        
        if not all([smtp_host, smtp_user, smtp_password, admin_email]):
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'SMTP not configured'}),
                'isBase64Encoded': False
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка с сайта от {form_data.name}'
        msg['From'] = smtp_user
        msg['To'] = admin_email
        
        html_body = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
              <h2 style="color: #0EA5E9; border-bottom: 2px solid #0EA5E9; padding-bottom: 10px;">Новая заявка с сайта SecureTech</h2>
              
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 10px 0;"><strong style="color: #0EA5E9;">Имя:</strong> {form_data.name}</p>
                <p style="margin: 10px 0;"><strong style="color: #0EA5E9;">Телефон:</strong> {form_data.phone}</p>
                <p style="margin: 10px 0;"><strong style="color: #0EA5E9;">Email:</strong> {form_data.email}</p>
                <p style="margin: 10px 0;"><strong style="color: #0EA5E9;">Сообщение:</strong></p>
                <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 5px;">{form_data.message}</p>
              </div>
              
              <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
                Это автоматическое уведомление с сайта SecureTech
              </p>
            </div>
          </body>
        </html>
        """
        
        html_part = MIMEText(html_body, 'html', 'utf-8')
        msg.attach(html_part)
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена'
            }),
            'isBase64Encoded': False
        }
        
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid form data', 'details': e.errors()}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
