import boto3
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Скачивает видео строительства и загружает в S3"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    video_url = "https://ia800209.us.archive.org/15/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"

    req = urllib.request.Request(video_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as response:
        video_data = response.read(50 * 1024 * 1024)

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    s3.put_object(
        Bucket='files',
        Key='videos/hero-bunker.mp4',
        Body=video_data,
        ContentType='video/mp4'
    )

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/files/videos/hero-bunker.mp4"

    import json
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url})
    }