import fs from 'fs';

export function getData(path) {
    const data = fs.readFileSync(path, 'utf8');
    return data;
}