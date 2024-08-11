import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { GetRoomMessagesResponse } from "../http/get-room-messages"

interface useMessagesWebsocketsParams{
    roomId: string
}
type WebhookMessage = 
| {kind: 'message_created', value: {id: string, message:string }}
| {kind: 'message_answered', value: {id: string}}
| {kind: 'message_reactions_increased', value: {id: string, count: number}}
| {kind: 'message_reactions_decreased', value: {id: string, count: number}};

export function useMessagesWebsockets({roomId}: useMessagesWebsocketsParams){
 const queryClient = useQueryClient()
    return(
         useEffect(()=> {
        const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`)
        ws.onopen = () => {
            console.log('Websocket Connected!')
        }

        ws.onmessage = (event) => {
            const data: WebhookMessage = JSON.parse(event.data)

            switch(data.kind){
                case 'message_created':
                queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
                    return{
                        messages: [
                            ...(state?.messages ?? []),
                        {
                            id: data.value.id,
                            text: data.value.message,
                            amountOfReactions: 1,
                            answered: false
                        }
                        ],
                    }
                })    
                break;
                case 'message_answered':
            queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
                if(!state){
                    return undefined
                }    
                return{
                        messages: state.messages.map(item => {
                            if(item.id === data.value.id){
                                return{...item, answered: true}
                            }
                            return item
                        }),
                    }
                })    
                break;
                case 'message_reactions_decreased':
                case 'message_reactions_increased':
                 queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
                if(!state){
                    return undefined
                }    
                return{
                        messages: state.messages.map(item => {
                            if(item.id === data.value.id){
                                return{...item, amountOfReactions: data.value.count}
                            }
                            return item
                        }),
                    }
                })    
                break;
            }
        }

        return () => {ws.close()}
    
    },[roomId, queryClient])
    )

}