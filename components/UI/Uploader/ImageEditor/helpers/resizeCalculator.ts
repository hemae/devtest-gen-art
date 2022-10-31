type GetResizedDimensionsOptionsType = {
    imageWidth: number
    imageHeight: number
    frameWidth: number
    frameHeight: number
}

export const getResizedScale = (options: GetResizedDimensionsOptionsType): number => {

    const {
        imageWidth, imageHeight, frameWidth, frameHeight
    } = options

    if (imageWidth >= imageHeight) {
        return frameWidth / imageWidth
    } else {
        return frameHeight / imageHeight
    }
}
