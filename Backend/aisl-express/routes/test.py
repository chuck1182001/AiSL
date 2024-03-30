import sys
import AiSLLogic
## image classification stuff
print("hello")
model = AiSLLogic.load_model()
letter = AiSLLogic.predict("/root/AiSL/Backend/aisl-express/uploads/catTestImage.png", model)
print(letter)


sys.stdout.flush()