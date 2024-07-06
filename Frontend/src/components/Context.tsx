
type Props = {
    title:String,
    messageId:string,
}

const Context = ({title,messageId}: Props) => {
  return (
    <div id={messageId} className='py-2 border text-lg hover:bg-green-400 hover:cursor-pointer'>
        {title}
    </div>
  )
}

export default Context