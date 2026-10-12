#!/usr/bin/env python3
"""Validate and append one product without overwriting existing records."""
import argparse
import json
import re
import shutil
import tempfile
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
PREFIX = 'window.SIZEUP_PRODUCTS='

def register(source, dry_run=False):
    p = json.loads(source.read_text(encoding='utf-8'))
    required = ['id', 'brand', 'name', 'category', 'price', 'condition',
                'description', 'measurements', 'photos', 'mercari']
    for field in required:
        if field not in p or p[field] is None or p[field] == '':
            raise ValueError(f'必須項目: {field}')
    if not re.fullmatch(r'su-[0-9]{4,}', p['id']):
        raise ValueError('IDはsu-0001形式')
    for field in ['brand', 'name', 'condition', 'description']:
        if not isinstance(p[field], str) or not p[field].strip():
            raise ValueError(f'{field}は空でない文字列')
    if type(p['price']) is not int or p['price'] <= 0:
        raise ValueError('価格は正の整数')
    if p['category'] not in ['TOPS', 'OUTER', 'BOTTOMS']:
        raise ValueError('カテゴリはTOPS/OUTER/BOTTOMS')
    m = p['measurements']
    if not isinstance(m, dict) or not m:
        raise ValueError('実寸は数値のオブジェクト')
    labels = {'bodyWidth': '身幅', 'length': '着丈', 'shoulder': '肩幅',
              'sleeve': '袖丈', 'waist': 'ウエスト', 'inseam': '股下',
              'rise': '股上', 'hem': '裾幅'}
    for k, v in m.items():
        if k not in labels or type(v) not in (float, int) or not 0 < v < 500:
            raise ValueError(f'実寸を確認: {k}')
    key, minimum = ('waist', 95) if p['category'] == 'BOTTOMS' else ('bodyWidth', 60)
    if m.get(key, 0) < minimum:
        raise ValueError(f'選定基準: {labels[key]}{minimum}cm以上')
    u = urlparse(p['mercari'])
    if (u.scheme != 'https' or u.netloc != 'jp.mercari.com'
            or not re.fullmatch(r'/item/m[0-9]+/?', u.path) or u.query or u.fragment):
        raise ValueError('メルカリ商品URLを確認')
    if not isinstance(p['photos'], list) or not p['photos']:
        raise ValueError('写真が最低1枚必要')
    photos = []
    for entry in p['photos']:
        if not isinstance(entry, str):
            raise ValueError('写真パスは文字列')
        path = (source.parent / entry).resolve()
        if not path.is_file() or path.suffix.lower() not in ['.jpg', '.jpeg', '.png', '.webp']:
            raise ValueError(f'写真ファイルを確認: {entry}')
        photos.append(path)
    target = ROOT / 'products.js'
    raw = target.read_text(encoding='utf-8')
    if PREFIX not in raw:
        raise ValueError('商品データ形式が異なるため停止')
    products = json.loads(raw.split(PREFIX, 1)[1].strip().rstrip(';'))
    if any(x['id'] == p['id'] for x in products):
        raise ValueError('ID重複: 既存商品は上書きしません')
    asset_dir = ROOT / 'assets' / 'products' / p['id']
    if asset_dir.exists():
        raise ValueError('既存の写真フォルダは上書きしません')
    record = {k: p[k] for k in ['id', 'brand', 'name', 'category', 'price', 'condition', 'description', 'mercari']}
    record.update(tagSize=p.get('tagSize', ''), measurements=m,
                  size=' / '.join(f'{labels[k]} {v}cm' for k, v in m.items()), sold=False)
    record['images'] = [f'assets/products/{p["id"]}/{i:02d}{path.suffix.lower()}' for i, path in enumerate(photos, 1)]
    record['image'] = record['images'][0]
    if not dry_run:
        asset_dir.parent.mkdir(parents=True, exist_ok=True)
        try:
            asset_dir.mkdir()
            for original, relative in zip(photos, record['images']):
                shutil.copy2(original, ROOT / relative)
            products.append(record)
            with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=ROOT, delete=False) as f:
                f.write('// 商品データ。新規登録はscripts/register_product.pyを使用。\n' + PREFIX + json.dumps(products, ensure_ascii=False, indent=2) + ';\n')
                temp = Path(f.name)
            temp.replace(target)
        except Exception:
            shutil.rmtree(asset_dir)
            raise
    print(json.dumps({'validated': True, 'dry_run': dry_run, 'id': record['id'], 'existing_count': len(products) - (0 if dry_run else 1), 'photos': len(photos)}, ensure_ascii=False))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('source', type=Path)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    try:
        register(args.source.resolve(), args.dry_run)
    except (ValueError, OSError, TypeError, KeyError) as exc:
        parser.exit(1, f'登録中止: {exc}\n')
