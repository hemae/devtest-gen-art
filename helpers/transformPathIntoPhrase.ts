export function upperCase(word: string): string {
    return word[0].toUpperCase() + word.slice(1)
}

export default function transformPathIntoPhrase(path: string): string {
    return upperCase(path.split('-').join(' '))
}
