import csv
import json
import re
from typing import Dict, List, Any

def parse_place_with_timestamp(place_str: str) -> Dict[str, Any]:
    """
    場所の文字列から再生時間と場所名を分離する
    例: "10:55 道の駅たるみず" -> {"name": "道の駅たるみず", "timestamp": "10:55", "type": "road_facility"}
    """
    # 時間表記（HH:MM）のパターン
    time_pattern = r'^(\d{1,2}:\d{2})\s+(.+)$'
    match = re.match(time_pattern, place_str)
    
    if match:
        timestamp, name = match.groups()
        return {
            "name": name.strip(),
            "timestamp": timestamp.strip(),
            "type": determine_place_type(name.strip())
        }
    else:
        return {
            "name": place_str.strip(),
            "type": determine_place_type(place_str.strip())
        }

def determine_place_type(place_name: str) -> str:
    """場所の名前からタイプを推測する"""
    patterns = {
        'road_facility': r'(SA|PA|道の駅|パーキング|サービスエリア)',
        'station': r'(駅|ステーション)',
        'nature': r'(山|川|湖|滝|渓谷|峠|海|池|沼|岬|崎|浜|島)',
        'historical': r'(神社|寺|城|古墳|史跡)',
        'hot_spring': r'(温泉|銭湯|湯)',
        'restaurant': r'(食堂|レストラン|うどん|そば|ラーメン|カレー|食事|定食|丼|弁当)',
        'cafe': r'(カフェ|珈琲|コーヒー|スターバックス)',
        'shopping': r'(ショッピング|アウトレット|イオン|市場)',
        'park': r'(公園|ランド|パーク|遊園地)',
        'museum': r'(博物館|美術館|資料館)',
        'convenience_store': r'(コンビニ|セブン|ファミリーマート|ローソン)',
    }
    
    for type_name, pattern in patterns.items():
        if re.search(pattern, place_name):
            return type_name
    return 'other'

def parse_cost(value: str) -> float:
    """コスト値を数値に変換"""
    try:
        return float(value) if value.strip() else 0
    except ValueError:
        return 0

def parse_advertisers(advertiser_str: str) -> List[str]:
    """
    広告者の文字列をリストに変換する
    例: "広告者の方々：hoge さん\nfuga さん" -> ["hoge", "fuga"]
    """
    if not advertiser_str:
        return []
    
    # "広告者の方々："を除去
    content = advertiser_str.replace('広告者の方々：', '').strip()
    
    # 改行で分割し、各行から "さん" を除去して空白を削除
    advertisers = [
        name.replace('さん', '').strip()
        for name in content.split('\n')
        if name.strip()
    ]
    
    return advertisers

def parse_topics(topics_str: str) -> List[str]:
    """
    話題の文字列をリストに変換する
    例: "道中話した他の話\n\n　topic1\ntopic2" -> ["topic1", "topic2"]
    """
    if not topics_str:
        return []
    
    # "道中話した他の話\n\n　"を除去
    content = topics_str.replace('道中話した他の話\n\n　', '').strip()
    
    # 改行で分割して空白を削除
    topics = [
        topic.strip()
        for topic in content.split('\n')
        if topic.strip()
    ]
    
    return topics


def parse_material(material_str: str) -> Dict[str, List[Dict[str, str]]]:
    """
    素材の文字列をタイプ別のリストに変換する
    例: "画像：\n　素材名　権利者　URL" -> 
        {"image": [{"name": "素材名", "creator": "権利者", "source": "URL"}]}
    音声の場合は「、」で区切られた各項目をnameとして扱う
    例: "音声：\n　ボイス1、ボイス2" ->
        {"voice": [{"name": "ボイス1"}, {"name": "ボイス2"}]}
    """
    if not material_str:
        return {}
    
    # 素材の種類と日本語表記のマッピング
    type_markers = {
        '画像：': 'image',
        '動画：': 'video',
        '音声：': 'voice',
        '音楽：': 'music',
        '効果音：': 'effect',
    }
    
    current_type = None
    categorized = {
        'image': [],
        'video': [],
        'voice': [],
        'music': [],
        'effect': [],
        'other': []
    }
    
    # 行ごとに処理
    for line in material_str.split('\n'):
        line = line.strip()
        if not line:
            continue
            
        # 種類の判定
        is_type_marker = False
        for marker, type_name in type_markers.items():
            if line.startswith(marker):
                current_type = type_name
                is_type_marker = True
                break
        
        # 種類マーカーがない場合は前の種類と同じ
        if not is_type_marker and line != '　' and current_type:
            # 行頭の全角スペースを削除
            material = line.lstrip('　 ')
            if material:
                if current_type == 'voice':
                    # 音声の場合は、区切られた各項目をnameとして扱う
                    for voice in material.split('、'):
                        if voice.strip():
                            if voice.startswith('VOICEVOX:'):
                                categorized[current_type].append({'name': voice.strip()})
                            else:
                                categorized[current_type].append({'name': 'VOICEVOX:' + voice.strip()})
                else:
                    # その他の場合は全角スペースで区切って3つの情報を取得
                    parts = material.split('　')
                    material_info = {
                        'name': parts[0].strip() if len(parts) > 0 else '',
                        'creator': parts[1].strip() if len(parts) > 1 else '',
                        'source': parts[2].strip() if len(parts) > 2 else ''
                    }
                    # 空の値を持つキーを削除
                    material_info = {k: v for k, v in material_info.items() if v}
                    if material_info:
                        categorized[current_type].append(material_info)
    
    # 空のリストを持つキーを削除
    return {k: v for k, v in categorized.items() if v}

def parse_references(reference_str: str) -> List[Dict[str, str]]:
    """
    参考文献の文字列を構造化されたリストに変換する
    例: "参考文献：\n　名前\n　　URL" -> [{"name": "名前", "source": "URL"}]
    """
    if not reference_str:
        return []
    
    references = []
    current_ref = {}
    
    # 行ごとに処理
    for line in reference_str.split('\n'):
        if not line or line == '参考文献：':
            continue
            
        # 行頭の全角スペースの数を数える
        indent = 0
        while line.startswith('　'):
            indent += 1
            line = line[1:]
        
        if indent == 1:
            # 前の参考文献があれば保存
            if current_ref:
                references.append(current_ref)
            # 新しい参考文献を開始
            current_ref = {'name': line.strip()}
        elif indent == 2 and current_ref:
            # URLを追加
            current_ref['source'] = line.strip()
    
    # 最後の参考文献を保存
    if current_ref:
        references.append(current_ref)
    
    return references

def convert_csv_to_json(csv_path: str, output_path: str):
    trips = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if not row['id'] or not row['date']:
                continue

            # 車両情報
            car_parts = row['car_model'].split('　') if row['car_model'] else ['', '']
            manufacturer = car_parts[0] if len(car_parts) > 0 else ''
            model = car_parts[1] if len(car_parts) > 1 else ''

            # 参加者リスト
            participants = [p.strip() for p in row['participants'].split('\n') if p.strip()] if row['participants'] else []

            # 場所リスト（タイムスタンプ付き）
            places = []
            if row['places']:
                for place in row['places'].split('\n'):
                    place = place.strip()
                    if place:
                        places.append(parse_place_with_timestamp(place))

            # コスト情報
            costs = {
                'meal': parse_cost(row['cost_meal']),
                'toll_road': parse_cost(row['cost_toll_road']),
                'fuel': parse_cost(row['cost_fuel']),
                'rental_car': parse_cost(row['cost_rental_car']),
                'entrance_fee': parse_cost(row['cost_entrance_fee']),
                'parking': parse_cost(row['cost_parking']),
                'hotel': parse_cost(row['cost_hotel']),
                'plane': parse_cost(row['cost_plane']),
                'train': parse_cost(row['cost_train']),
                'bus': parse_cost(row['cost_bus']),
                'ship': parse_cost(row['cost_ship']),
                'equipment': parse_cost(row['cost_equipment']),
                'other': parse_cost(row['cost_other']),
                'total': parse_cost(row['cost_total'])
            }

            # メタデータ
            metadata = {
                'weather': row['weather'] if row['weather'] else None,
                'upload_date': row['upload_date'] if row['upload_date'] else None,
                'video_title': row['video_title'] if row['video_title'] else None,
                'niconico': row['niconico'] if row['niconico'] else None,
                'youtube': row['youtube'] if row['youtube'] else None,
                'series': row['series'] if row['series'] else None,
                'summary': row['summary'] if row['summary'] else None,
                'itinerary': row['itinerary'] if row['itinerary'] else None,
                'event': row['event'] if row['event'] else None,
                'material': parse_material(row['material']),
                'reference': parse_references(row['reference']),
                'advertiser': parse_advertisers(row['advertiser']),
                'topics': parse_topics(row['topics'])
            }

            # トリップデータ
            trip = {
                'id': int(row['id']),
                'date': row['date'],
                'vehicle': {
                    'manufacturer': manufacturer,
                    'model': model
                },
                'participants': participants,
                'places': places,
                'distance': parse_cost(row['distance']),
                'costs': costs,
                'metadata': {k: v for k, v in metadata.items() if v}  # 空でない値のみ
            }

            trips.append(trip)

    # 1つのJSONファイルとして保存
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump({'trips': trips}, f, ensure_ascii=False, indent=2)

# 使用例
convert_csv_to_json('data/summary_table.csv', 'data/trips_new.json')
