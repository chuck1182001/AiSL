import sys
import AiSLLogic
import os
from os import listdir
from os.path import isfile, join

# path = "/root/AiSL/Backend/aisl-express/uploads"
# onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
# print(path)
model = AiSLLogic.load_model()
letter = AiSLLogic.predict("/root/AiSL/Backend/aisl-express/routes/uploads/image.jpg", model)
# for image in onlyfiles:
#     os.remove(image)
print(letter)

# print("hello")


sys.stdout.flush()