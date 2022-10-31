export default function (...args: boolean[]): boolean {
    let returnedValue = false
    args.forEach(arg => {
        returnedValue = returnedValue || arg
    })
    return returnedValue
}
