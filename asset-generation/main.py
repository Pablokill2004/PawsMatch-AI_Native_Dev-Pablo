import os
import json
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel
from typing import List

# Load environment variables
load_dotenv()

class PetProfile(BaseModel):
    id: int
    name: str
    bio: str

class PetProfiles(BaseModel):
    profiles: List[PetProfile]

def main():
    if not os.getenv("GEMINI_API_KEY"):
        print("Error: GEMINI_API_KEY environment variable not set.")
        print("Please copy .env.example to .env and add your API key.")
        return

    client = genai.Client()
    model = 'gemini-3-flash-preview'

    prompt = (
        "Generate 50 dog profiles for an adoption app called PawsMatch. "
        "Each profile needs: "
        "- id: a unique integer. "
        "- name: a catchy name for the dog. "
        "- bio: a 3-line adoption-focused biography in Spanish, highlighting why they are a great pet. "
    )

    print(f"Generating 50 pet profiles using {model}...")
    
    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt,
            config={
                'response_mime_type': 'application/json',
                'response_schema': PetProfiles,
                'temperature': 0.7,
            },
        )
        
        # Ensure the output directory is clean
        with open("pets.json", "w", encoding="utf-8") as f:
            f.write(response.text)
            
        print("Successfully generated profiles and saved to pets.json.")
        
    except Exception as e:
        print(f"An error occurred during generation: {e}")

if __name__ == "__main__":
    main()
