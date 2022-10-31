export function parseLocale(acceptLanguage: string): string {

    const languages: string[][] = acceptLanguage.split(';')
        .map(item => item.split(','))
        .filter(item => !!item.find(el => el === el.toLowerCase()))

    const languagesAndWeights: [number, string][] = languages
        .filter(item => !!item.find(el => el.includes('q')))
        .filter(item => !!item.find(el => !el.includes('q')))
        .map(item => item.map(el => el.includes('q') ? +el.replace('q=', '') : el) as [number, string])
        .sort((item1, item2) => {
            if (item1[0] < item2[0]) return 1
            if (item1[0] > item2[0]) return -1
            else return 0
        })

    if (languagesAndWeights.length) return languagesAndWeights[0][1]

    return languages.find(item => item.find(el => !el.includes('q')))!.find(el => el === el.toLowerCase())!
}
