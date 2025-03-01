from google import genai

client = genai.Client(api_key="AIzaSyBtSd9R2-fhiDqVaWvdCdvk0MtD_DKD4SM")

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="Explain how AI works",
)

print(response.text)