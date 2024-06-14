interface Client {
    id: string;
    send: (data: string) => void;
}

const clients: Record<string, (data: string) => void> = {}

export function addClient(client: Client) {
    clients[client.id] = client.send
}

export function removeClient(id: string) {
    delete clients[id]
}

export function sendMessage(clientId: string, message: string) {
    const client = clients[clientId]
    if (client) {
        client(message)
    }
}
    }
}