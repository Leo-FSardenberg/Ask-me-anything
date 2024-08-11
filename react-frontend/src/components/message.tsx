import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps{
    id: string
    text: string
    amountOfReactions: number
    answered?: boolean
}


export function Message({
    id: messageId,
    text,
    answered=false,
    amountOfReactions}:MessageProps) {

    const [hasReacted, setHasReacted] = useState(false)
    const {roomId} = useParams()

    if(!roomId){
        throw new Error('The messages component must be used within room page')
    }

    async function createMessageReactionAction(){
       if(!roomId){
        return
       }
        try {
            await createMessageReaction({messageId, roomId})
        } catch{
            toast.error("Falied to upvote")
        }
        
        setHasReacted(true)
    }
    async function removeMessageReactionAction(){
           if(!roomId){
        return
       }
        try {
            await removeMessageReaction({messageId, roomId})
        } catch{
            toast.error("Falied to remove upvote")
        }
        setHasReacted(false)
    }
    return(
        <li data-answered={answered} 
        className="data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none ml-4 leading-relaxed text-zinc-100">
            {text}

           {hasReacted ? (
            <button
            onClick={removeMessageReactionAction} 
            type="button"
            className="mt-3 flex items-center text-sm font-medium gap-2 text-orange-400 hover:text-orange-500"
            >
                <ArrowUp className="size-4"/>
                Upvote {amountOfReactions}
            </button>)
            : (<button
            onClick={createMessageReactionAction}
            type="button"
            className="mt-3 flex items-center text-sm font-medium gap-2 text-zinc-400 hover:text-zinc-300"
            >
                <ArrowUp className="size-4"/>
                 Upvote {amountOfReactions}
            </button>

            )}
         </li>
    )
}