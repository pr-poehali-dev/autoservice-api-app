import json
from typing import Dict, Any, List
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления уведомлениями автосервиса
    Args: event с httpMethod, body, queryStringParameters, headers
          context с request_id
    Returns: HTTP response с уведомлениями или статусом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    user_id = event.get('headers', {}).get('X-User-Id', 'user_1')
    
    if method == 'GET':
        notifications = get_user_notifications(user_id)
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'notifications': notifications,
                'count': len(notifications)
            })
        }
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        action = body.get('action')
        
        if action == 'mark_read':
            notification_id = body.get('notification_id')
            result = mark_notification_read(user_id, notification_id)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(result)
            }
        
        if action == 'update_settings':
            settings = body.get('settings', {})
            result = update_notification_settings(user_id, settings)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(result)
            }
        
        if action == 'send_notification':
            notification_data = body.get('notification')
            result = send_notification(user_id, notification_data)
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps(result)
            }
    
    if method == 'DELETE':
        query_params = event.get('queryStringParameters', {})
        notification_id = query_params.get('id')
        
        if notification_id:
            result = delete_notification(user_id, notification_id)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(result)
            }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'})
    }


def get_user_notifications(user_id: str) -> List[Dict[str, Any]]:
    mock_notifications = [
        {
            'id': 1,
            'type': 'ready',
            'title': 'Ваш автомобиль готов!',
            'message': 'Замена масла и фильтров завершена. Автомобиль готов к выдаче.',
            'time': '10 минут назад',
            'timestamp': '2025-11-30T14:50:00',
            'carModel': 'Toyota Camry',
            'isRead': False
        },
        {
            'id': 2,
            'type': 'in_progress',
            'title': 'Работы в процессе',
            'message': 'Диагностика двигателя в работе. Ожидаемое время готовности: 2 часа.',
            'time': '1 час назад',
            'timestamp': '2025-11-30T14:00:00',
            'carModel': 'Honda Accord',
            'isRead': False
        },
        {
            'id': 3,
            'type': 'reminder',
            'title': 'Напоминание о ТО',
            'message': 'Рекомендуем пройти плановое ТО в течение 2 недель.',
            'time': '2 дня назад',
            'timestamp': '2025-11-28T10:00:00',
            'carModel': 'Toyota Camry',
            'isRead': True
        }
    ]
    
    return [n for n in mock_notifications if not n.get('isRead', False)]


def mark_notification_read(user_id: str, notification_id: int) -> Dict[str, Any]:
    return {
        'success': True,
        'notification_id': notification_id,
        'message': 'Notification marked as read'
    }


def delete_notification(user_id: str, notification_id: str) -> Dict[str, Any]:
    return {
        'success': True,
        'notification_id': notification_id,
        'message': 'Notification deleted'
    }


def update_notification_settings(user_id: str, settings: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'success': True,
        'settings': settings,
        'message': 'Notification settings updated'
    }


def send_notification(user_id: str, notification_data: Dict[str, Any]) -> Dict[str, Any]:
    channels = []
    
    if notification_data.get('push_enabled'):
        channels.append('push')
    if notification_data.get('sms_enabled'):
        channels.append('sms')
    if notification_data.get('email_enabled'):
        channels.append('email')
    
    return {
        'success': True,
        'notification_id': 4,
        'channels_sent': channels,
        'timestamp': datetime.now().isoformat(),
        'message': f'Notification sent via {", ".join(channels)}'
    }
