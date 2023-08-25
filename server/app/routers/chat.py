from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from dependencies.connection_manager import ConnectionManager

router = APIRouter(prefix='/chat', tags=['chat'])

manager = ConnectionManager()


@router.websocket('/')
async def chat(connection: WebSocket):
    await manager.connect(connection)
    try:
        while True:
            data = await connection.receive_text()
            await manager.broadcast(connection, data)
    except WebSocketDisconnect:
        await manager.disconnect(connection)


@router.get('/', description='Connect this endpoint to a websocket to send and receive messages')
async def message():
    return 'Connect this endpoint to a websocket to send and receive messages'
