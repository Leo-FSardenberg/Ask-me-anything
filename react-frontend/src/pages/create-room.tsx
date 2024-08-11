import { ArrowRight } from 'lucide-react'
import amaLogo from '../assets/ama-logo.svg'
import { useNavigate } from 'react-router-dom'
import { createRoom } from '../http/create-room'
import { toast } from 'sonner'

export function CreateRoom(){
    const navigate = useNavigate()

   async function handleCreateRoom(data:FormData){
        const theme = data.get('theme')?.toString()
        if(!theme){
            return
        }
       try {
       const { roomId } = await createRoom({ theme })
        navigate(`/room/${roomId}`)
    } catch{
       toast.error("Failed to create room")
       
    }
    }
    return (
        <main className="h-screen flex items-center px-4">
            <div className="max-w-[450px] flex flex-col gap-6">
                <img src={amaLogo} alt="AMA"
                className="h-10"
                />
                <p className="leading-relaxed to-zinc-300 text-center">
                    Create a public AMA(ask me anything) Room and prioritize the community's most important questions.
                </p>
                <form
                action={handleCreateRoom}
                 className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:ring-1 ring-orange-400 ring-offset-2 ring-offset-zinc-950">
                    <input
                    className="text-sm bg-transparent flex-1 mx-2 outline-none placeholder:text-zinc-500 text-zinc-100" 
                    autoComplete="off"
                    type="text" name="theme" id="" 
                    placeholder="Room name"/>

                    <button type="submit"
                    className="bg-orange-400 transition-colors hover:bg-orange-500 text-orange-950 font-medium text-sm px-3 py-1.5 gap-1.5 flex items-center rounded-lg">
                        Create room
                        <ArrowRight className="size-4"/>
                    </button>
                </form>
            </div>
        </main>
    )
}