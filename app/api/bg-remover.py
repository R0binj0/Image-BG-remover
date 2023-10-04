from rembg import remove
from PIL import Image

in_path = "inpath/InputImage.png"
out_path = "outpath/OutputImage.png"

image_input = Image.open(in_path)
output = remove(image_input)
output.save(out_path)
print("Done")