
type Props = {
    title:String,
    messageId:string,
}

const Context = ({title,messageId}: Props) => {
  return (
    <div id={messageId} className='py-2 border-b bg-bgSecondary text-lg hover:bg-secondary hover:text-bgPrimary hover:cursor-pointer'>
        {title}
    </div>
  )
}

export default Context