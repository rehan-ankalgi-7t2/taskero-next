import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number
}

const idToColumnText: {
    [key in TypedColumn]: string
} = {
    "todo": "To Do",
    "inprogress": "In Progress",
    "done": "Done"
}

const Column = ({id, todos, index}: Props) => {
    // console.log(`from Column Component => `, index);
  return (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='p-5 '>
                {/* render droppable todos in the columns */}
                <Droppable droppableId={index.toString()} type='card'>
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className={`p-2 rounded-xl shadow-sm ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}>
                            <h2 className='text-lg font-bold flex justify-between mb-5'>
                                {idToColumnText[id]}
                                <span className='font-bold bg-gray-50 text-gray-500 rounded-full p-2 text-xs h-8 w-8 text-center'>{todos.length}</span>
                            </h2>

                            {/* map all todos */}
                            <div className='space-y-2'>
                                {todos.map((todo, index) => (
                                    <Draggable draggableId={todo.$id} key={todo.$id} index={index}>
                                        {(provided) => (
                                            <TodoCard 
                                                todo={todo}
                                                index={index}
                                                id={id}
                                                innerRef={provided.innerRef}
                                                draggableProps={provided.draggableProps}
                                                dragHandleProps={provided.dragHandleProps}
                                                />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}

                                <div className='flex items-center justify-end p-2' >
                                    <button className=' text-green-500 hover:text-green-600'>
                                        <PlusCircleIcon className='h-10 w-10'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        )}
    </Draggable>
  )
}

export default Column
