# To The Closet

Welcome to To The Closet – Your gateway to sustainable luxury fashion. Discover a world where elegance meets eco-consciousness. Our platform offers exquisite clothing rentals, allowing you to indulge in luxury while reducing your carbon footprint. Join us in redefining fashion with a sustainable twist and make a positive impact on both style and the environment.

## Features

- Browse a curated selection of luxury clothing items.
- Rent clothing items for special occasions or everyday wear.
- Contribute to a circular fashion economy and reduce environmental impact.

### Image Search

Enhance your shopping experience with our advanced image search feature:

- **User Image Upload**: Users can upload images of clothing items they're interested in.
- **Image to Vector Embeddings**: Uploaded images are processed using TensorFlow to generate vector embeddings, compact mathematical representations.
- **Pinecone Vector Database**: Vector embeddings are stored in the Pinecone database, optimized for efficient similarity searches.
- **Precise Recommendations**: Based on similarity scores, the system retrieves clothing items with the most similar vector embeddings. This process ensures accurate and tailored recommendations for visually similar clothing items.


### Text Search

Effortlessly find the perfect attire using our AI-powered text search feature:

- **User Input Search**: Users can search for clothing items using natural language queries, such as descriptions or keywords.
- **OpenAI Chat API**: User inputs, along with meticulously designed prompts, are sent to the OpenAI Chat API. The user inputs are processed to extract keywords that align with our categories. OpenAI sends back a JSON response which adheres to a format specified in the prompt.
- **Filter Function**: The generated JSON responses are processed by a filter function. This function refines and organizes the results to provide users with a tailored list of related products.

## Technologies Used

- Frontend: Next.js (React framework) deployed on Vercel
- Backend: Python (Flask framework) deployed on AWS ECR and ECS
- Database: Postgresql database deployed on AWS RDS
- Image: AWS S3 Bucket
- AI: TensorFlow, Pinecone Vector Database, OpenAI Chat API

## Getting Started

#### Clone the project
```
git clone https://github.com/smu-hack-dsc/Team-04-Project.git
```

### Next.js Frontend

#### Install dependencies
```
npm install
```

#### Run development server
```
npm run dev
```

### Next.js Frontend

#### Access Python backend folder
```
cd backend
```

#### Run backend server using Docker
```
docker build -t tothecloset .
```

#### Run backend server using Docker
```
docker run tothecloset
```


