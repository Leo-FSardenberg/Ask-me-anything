import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateMessageForm(){
       const {roomId} = useParams()

    if(!roomId){
        throw new Error('The messages component must be used within room page')
    }
   async function createMessageAction(data:FormData) {
    const message = data.get('message')?.toString()
    if(!message || !roomId){return}

    try{
        await createMessage({message, roomId})
    } catch {
        toast.error("Failed to send message. Try again.")
    }
   }
   
    return(
        <form
        action={createMessageAction}
        className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:ring-1 ring-orange-400 ring-offset-2 ring-offset-zinc-950">
            <input
            className="text-sm bg-transparent flex-1 mx-2 outline-none placeholder:text-zinc-500 text-zinc-100" 
            autoComplete="off"
            type="text" 
            name="message" 
            placeholder="Ask your questions"
            required
            />

            <button type="submit"
            className="bg-orange-400 transition-colors hover:bg-orange-500 text-orange-950 font-medium text-sm px-3 py-1.5 gap-1.5 flex items-center rounded-lg">
                Ask question
                <ArrowRight className="size-4"/>
            </button>
        </form>
    )
}