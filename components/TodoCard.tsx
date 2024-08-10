"use client"

import { XCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'

type Props  = {
    todo: Todo,
    index: number,
    id: TypedColumn,
    innerRef: (element: HTMLElement | null) => void,
    draggableProps: DraggableProvidedDraggableProps,
    dragHandleProps: DraggableProvidedDragHandleProps
}

const TodoCard = ({todo, index, id, innerRef, draggableProps, dragHandleProps}: Props) => {
  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef} className='bg-white rounded-md shadow-md space-y-2 px-2 py-3'>
      <h1 className='text-md flex justify-between'>{todo.title} <button className='text-red-500 hover:text-red-600 '><XCircleIcon className='h-6 w-6 ml-5'/></button></h1>

      {/* if image exists... add image here */}
    </div>
  )
}

export default TodoCard
