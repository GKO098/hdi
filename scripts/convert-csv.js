const fs = require('fs-extra');
const { parse } = require('csv-parse/sync');
const path = require('path');

// CSVファイルを読み込んでJSONに変換する関数
async function convertCsvToJson(csvPath) {
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true
    });
    return records;
}

// メイン処理
async function main() {
    try {
        // 必要なディレクトリを作成
        await fs.ensureDir('data/generated');
        
        // CSVファイルのリストを取得
        const csvFiles = await fs.readdir('data/csv');
        const csvPaths = csvFiles.filter(file => file.endsWith('.csv'));
        
        // 各CSVファイルを処理
        for (const csvFile of csvPaths) {
            const jsonData = await convertCsvToJson(`data/csv/${csvFile}`);
            const jsonFileName = path.basename(csvFile, '.csv') + '.json';
            await fs.writeJson(`data/generated/${jsonFileName}`, jsonData, { spaces: 2 });
            console.log(`Converted ${csvFile} to ${jsonFileName}`);
        }
        
        console.log('All CSV files have been converted successfully!');
    } catch (error) {
        console.error('Error during conversion:', error);
        process.exit(1);
    }
}

main(); 
