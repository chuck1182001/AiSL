import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import torchvision
import torchvision.models as models
import torchvision.transforms as transforms
import numpy as np
from PIL import Image
import PIL
from rembg import remove 

# from google.colab import files 
import os

def predict(path, model):
    banana = Image.open(path)
    # print(path)

    
    bananacopy = banana.copy()
    bananacopy = bananacopy.convert('L')
    pixels = list(bananacopy.getdata())
    
    # Calculate average grayscale value
    # average_value = sum(pixels) / len(pixels)
    # stand = np.std(pixels)
    # 0.299 ∙ Red + 0.587 ∙ Green + 0.114 ∙ Blue
    
    # width = banana.width 
    # height = banana.height 
    # # print(width,height)
    # tempBanana = banana.load()

    # for row in range(height):
    #     for col in range(width):
    #         r,g,b = tempBanana[col, row]
    #         grayscale = 0.299 * r + 0.587 * g + 0.114 * b
    #         if(grayscale < average_value):
    #             tempBanana[col,row] = (0,0,0)
    
    banana = remove(banana)
    # Extracting the width and height  
    # of the image: 
    # tempBanana = Image.eval(banana, lambda x: 256 if 0 else print(x))

    banana.save('greyscale.png')
    # print("hello")

    transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Resize to match ResNet input size
        transforms.ToTensor(),  # Normalization
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    pixels = transform(banana.convert("RGB"))
    output = model(pixels.unsqueeze(0))

    probs = F.softmax(output, dim=1)
    predicted_class = torch.argmax(probs, dim = 1).item()
    if predicted_class < 10:
        letter = predicted_class + 48
    else:
        letter = predicted_class + 87
    
    return chr(letter)

def load_model():
    resnet50 = torchvision.models.resnet50(weights='ResNet50_Weights.DEFAULT')

    for param in resnet50.parameters():
        param.requires_grad = False  

    resnet50.fc = torch.nn.Linear(resnet50.fc.in_features, 36)
    # print(os.getcwd())
    # f = open('/root/AiSL/Backend/aisl-express/routes/aisl.pth', 'r')
    resnet50.load_state_dict(torch.load('/root/AiSL/Backend/aisl-express/routes/aisl.pth',  map_location=torch.device('cpu'))) 
    # f.close()
    resnet50.eval() # Set the model to evaluation mode
    return resnet50