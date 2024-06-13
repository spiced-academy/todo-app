interface Client {
    id: string;
    send: (data: string) => void;
}

const clients: Record<string, (data: string) => void> = {}

export function addClient(client: Client) {
    clients[client.id] = client.send
    console.log("new client", client)
    console.log("clients", clients)
}

export function removeClient(id: string) {
    console.log("remove client", id)
    delete clients[id]
}

export function sendMessage(clientId: string, message: string) {
    const client = clients[clientId]
    if (client) {
        client(message)
        console.log("message sent", clientId, message)
    }
}