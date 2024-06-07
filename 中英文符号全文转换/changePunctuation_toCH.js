const fs = require('fs');
const path = require('path');


function replacePunctuation(data){
    return  data.replace(/,/g, '，')
                .replace(/\./g, '。')
                .replace(/\?/g, '？')
                .replace(/!/g, '！')
                .replace(/:/g, '：')
                .replace(/;/g, '；')
                .replace(/"/g, '“')
                .replace(/'/g, '‘')
                .replace(/`/g, '·')
                .replace(/</g, '《')
                .replace(/>/g, '》')
                .replace(/-/g, '—')
                .replace(/\[/g, '【')
                .replace(/\]/g, '】')
                .replace(/\(/g, '（')
                .replace(/\)/g, '）')
                .replace(/{/g, '「')
                .replace(/}/g, '」')
                .replace(/\[/g, '『')
                .replace(/\]/g, '』')
                .replace(/\[/g, '〔')
                .replace(/\]/g, '〕')
                .replace(/\[/g, '［')
                .replace(/\]/g, '］')
                .replace(/\[/g, '︻')
                .replace(/\]/g, '︼');
}



function changeTxtFile() {
    // 读取目录下的第一个txt文件
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // 过滤出txt文件
        const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

        if (!txtFiles[0]) return console.error('no file');

        // 读取txt文件的内容
        const filePath = path.join(directoryPath, txtFiles[0]);

        // 获取文件名和文件扩展名
        const fileName = path.basename(filePath, '.txt');

        // 构造新文件名
        const newFileName = `${fileName}_ch.txt`;

        // 构造新文件路径
        const newFilePath = path.join(directoryPath, newFileName);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            // 将中文标点替换为英文标点
            let content = replacePunctuation(data);

            // 将替换后的内容写回文件
            fs.writeFile(newFilePath, content, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
                console.log('Punctuation converted successfully!');
            });
        });
    });




}



// 定义要读取的目录路径
const directoryPath = './txtFolder';
changeTxtFile();
