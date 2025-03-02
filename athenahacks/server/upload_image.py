import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
import json
from pymongo import MongoClient

cloudinary.config(
    cloud_name="ddljplnnq",
    api_key="439499381572265",
    api_secret="PgFn4cd356CsMV44vjOAc8-jvoQ"
)

# MONGODB_URI = os.environ['MONGODB_URI']
client = MongoClient('mongodb+srv://devankshi:devapwd@outfitmatch.s4hpn.mongodb.net/?retryWrites=true&w=majority&appName=outfitmatch')
db = client['outfitmatch']
collection = db['outfits']

# Path to your images directory
base_dir = "../src/assets/img"

# Process images
metadata_list = []

# Function to recursively upload files


def upload_images(directory, cloudinary_folder=""):
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)

            # Maintain folder structure by removing base_dir from path
            relative_path = os.path.relpath(root, base_dir)
            cloudinary_upload_folder = os.path.join(cloudinary_folder, relative_path).replace("\\", "/")
            
            parts = cloudinary_upload_folder.split("/")

            if (len(parts) < 3):
                gender = ''
                type = ''
            else:
                gender = parts[1]
                type = parts[2]

            try:
                upload_result = cloudinary.uploader.upload(file_path, folder=cloudinary_upload_folder)
                image_metadata = {
                    "filename": file,
                    "gender": gender,
                    "outfit_type": type,
                    "cloudinary_url": upload_result["secure_url"],
                    "folder": cloudinary_upload_folder,
                    "width": upload_result["width"],
                    "height": upload_result["height"],
                    "format": upload_result["format"],
                    "created_at": upload_result["created_at"],
                    "bytes": upload_result["bytes"],
                }
                collection.insert_one(image_metadata)

                print(f"Uploaded: {file} -> {cloudinary_upload_folder}")

            except Exception as e:
               print(f"Error uploading {file}: {e}")


upload_images(base_dir, "outfits101")

with open("metadata.json", "w") as json_file:
    json.dump(metadata_list, json_file, indent=4)

print("Upload complete. Metadata stored in MongoDB and JSON file.")