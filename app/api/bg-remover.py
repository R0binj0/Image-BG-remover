from rembg import remove
from PIL import Image
import io
import base64

def process_image(in_path, out_path):
    image_input = Image.open(in_path)
    output = remove(image_input)
    output.save(out_path)

if __name__ == "__main__":
    in_path = "inpath/InputImage.png"
    out_path = "outpath/OutputImage.png"

    process_image(in_path, out_path)

    # Read the processed image as bytes
    with open(out_path, "rb") as image_file:
        image_data = image_file.read()

    # Encode the image data as a base64 string
    base64_image = base64.b64encode(image_data).decode("utf-8")

    print(base64_image)
