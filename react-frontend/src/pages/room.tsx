import { useParams } from "react-router-dom"
import amaLogo from '../assets/ama-logo.svg'
import { Share2 } from "lucide-react"
import { toast } from "sonner"
import { Messages } from "../components/messages"
import { Suspense } from "react"
import { CreateMessageForm } from "../components/create-message-form"

export function Room(){

    function handleShareRoom(){
        const url = window.location.href.toString()

        if (navigator.share !== undefined && navigator.canShare()){
            navigator.share({url})
        }else {
            navigator.clipboard.writeText(url)

            toast.info('The room URL was copied to your clipboard.')
        }
    }


    const { roomId } = useParams()
    return (
        <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
            <div className="items-center flex gap-3 px-3">
                <img src={amaLogo} alt="AMA" className="h-5" />
                
                <span className="text-sm text-zinc-500 truncate">
                    Room Code: <span className="text-zinc-300">{roomId}</span>
                </span>

                <button
                type="submit"
                onClick={handleShareRoom}
                className="ml-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm px-3 py-1.5 gap-1.5 flex items-center rounded-lg"
                >
                    Share
                    <Share2 className="size-4"/>
                </button>
            </div>
            
                <div className="w-full bg-zinc-900 h-px"/>

                <CreateMessageForm/>

               <Suspense fallback={<p>Loading...</p>}>
                <Messages/>
               </Suspense>
        </div>
    )
}