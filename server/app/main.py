from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat

app = FastAPI(title='WorldChat API')

origins = ['http://localhost'] # Add client server URL to this list if the client is hosted separately

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def index():
    return 'Welcome To WorldChat!'


app.include_router(chat.router)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', reload=True)
