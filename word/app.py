from flask import Flask, request, jsonify, render_template
from collections import Counter
import jieba

app = Flask(__name__)

# Define stop words
stop_words = {'the', 'is', 'and', 'a', 'of', 'to', '的', '了', '和', '是'}

# Word frequency function
def word_frequency_analysis(text):
    text = text.lower()
    words = jieba.lcut(text)
    filtered_words = [word for word in words if word not in stop_words]
    word_count = Counter(filtered_words)
    return word_count.most_common()

# Route for serving the main HTML page
@app.route('/')
def home():
    return render_template('app.html')

# Route for file upload and processing
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    text = file.read().decode('utf-8')
    result = word_frequency_analysis(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)