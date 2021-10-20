function PriorityIndicator (props){

  const classIndicator = 
    props.priority === 'very-high' ? 'bg-red-500'
      : props.priority === 'high' ? 'bg-yellow-500'
      : props.priority === 'normal' ? 'bg-green-500'
      : props.priority === 'low' ? 'bg-blue-500'
      : props.priority === 'very-low' ? 'bg-purple-500'
      : 'bg-white'

  return <div {...props} className={`${classIndicator} rounded-full h-2 w-2`}></div>
}

export default PriorityIndicator