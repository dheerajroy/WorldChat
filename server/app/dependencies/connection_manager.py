from fastapi import WebSocket
from uuid import uuid4
from datetime import datetime


class ConnectionManager:
    active_connections = {}

    @classmethod
    async def connect(cls, connection: WebSocket):
        await connection.accept()
        name = await connection.receive_text()
        cls.active_connections[connection] = {
            'id': str(uuid4()), 'name': name, 'joined_at': str(datetime.utcnow())}

    @classmethod
    async def disconnect(cls, connection: WebSocket):
        del cls.active_connections[connection]

    @classmethod
    async def broadcast(cls, sender: WebSocket, message: str):
        for connection in cls.active_connections.keys():
            await connection.send_json({'sender': cls.active_connections.get(sender), 'message': message})
