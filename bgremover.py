from flask import Flask, request, jsonify
import cv2
import numpy as np
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

def remove_background(image_data):
    image_np = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

    success, processed_image = cv2.imencode(".jpg", image)
    if success:
        return processed_image.tobytes()
    else:
        return None

@app.route('/process-image', methods=['POST'])
def process_image():
    try:
        image_data = request.files['image'].read()
        processed_image = remove_background(image_data)
        if processed_image:
            return jsonify({'success': True, 'processed_image': processed_image.tolist()})
        else:
            return jsonify({'success': False, 'error': 'Image processing failed'}), 500
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5050) 
