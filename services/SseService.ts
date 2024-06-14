interface Client {
    id: string;
    send: (data: unknown) => void;
}

const clients: Record<string, (data: unknown) => void> = {}

export function addClient(client: Client) {
    clients[client.id] = client.send
}

export function removeClient(id: string) {
    delete clients[id]
}

export function sendMessage(clientId: string, message: unknown) {
    const client = clients[clientId]
    if (client) {
        client(message)
    }
}
    }
}