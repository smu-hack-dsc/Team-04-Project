import image1 from '../_images/product1.jpg'
import image2 from '../_images/product1.jpg'
import image3 from '../_images/product1.jpg'
import image4 from '../_images/product1.jpg'

export const images: string[] = [image1.src, image2.src, image3.src, image4.src]

const imageByIndex = (index: number): string => images[index % images.length]

export default imageByIndex
