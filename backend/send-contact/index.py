import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту владельца"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    from_email = 'emmas@yandex.ru'
    to_email = 'emmas@yandex.ru'

    msg = MIMEMultipart('alternative')
    object_info = f" — {message}" if message else ""
    msg['Subject'] = f'Новая заявка: {name}{object_info}'
    msg['From'] = from_email
    msg['To'] = to_email

    object_row = ""
    if message:
        object_row = (
            '<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">'
            '<p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Интересующий объект</p>'
            '<p style="margin:4px 0 0;color:#1a1a1a;font-size:15px;">' + message + '</p>'
            '</td></tr>'
        )

    html = (
        '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">'
        '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">'
        '<tr><td align="center">'
        '<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">'
        '<tr><td style="background:#1a1a1a;padding:24px 32px;">'
        '<p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;">Новая заявка с сайта</p>'
        '<p style="margin:4px 0 0;color:#888888;font-size:13px;">Строительство бункеров</p>'
        '</td></tr>'
        '<tr><td style="padding:32px;">'
        '<table width="100%" cellpadding="0" cellspacing="0">'
        '<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">'
        '<p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Имя клиента</p>'
        '<p style="margin:4px 0 0;color:#1a1a1a;font-size:16px;font-weight:600;">' + name + '</p>'
        '</td></tr>'
        '<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">'
        '<p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Телефон</p>'
        '<p style="margin:4px 0 0;font-size:16px;"><a href="tel:' + phone + '" style="color:#1a1a1a;font-weight:600;text-decoration:none;">' + phone + '</a></p>'
        '</td></tr>'
        + object_row +
        '</table>'
        '<div style="margin-top:24px;background:#f9f9f9;border-radius:6px;padding:16px;">'
        '<p style="margin:0;color:#888;font-size:12px;">Ответьте на это письмо или позвоните клиенту как можно скорее.</p>'
        '</div>'
        '</td></tr>'
        '</table>'
        '</td></tr>'
        '</table>'
        '</body></html>'
    )

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
