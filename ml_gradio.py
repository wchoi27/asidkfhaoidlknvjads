import gradio as gr
from ultralytics import YOLO
import cv2
# Load the model once
my_model = YOLO('best.pt')

def predict(image):
    # Predict with the uploaded image
    results = my_model.predict(image)

    boxes = results[0].boxes
    names = results[0].names

    if boxes and len(boxes.cls) > 0:
        class_ids = boxes.cls.int().tolist()
        label = names[class_ids[0]]  # Take the first detection
        return f'This seems to be a(n) {label.title()}'
    else:
        return 'No damage was found'

with gr.Blocks() as demo:
    uploaded_image = gr.Image(label="Upload your scan here", type="filepath")  # <-- Image component
    output_text = gr.Label(label="Prediction Result")  # <-- Label to show the prediction
    uploaded_image.change(
        fn=predict,
        inputs=uploaded_image,
        outputs=output_text
    )

demo.launch()
