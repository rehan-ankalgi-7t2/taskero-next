"use client"
import { useBoardStore } from '@/store/boardStore';
import React, { useEffect } from 'react'
import { DragDropContext, Droppable, DroppableProps } from 'react-beautiful-dnd';
import Column from './Column';

const Board = () => {
    const [board, getBoard, setBoardState] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState]);
    useEffect(() => {
        getBoard();
    }, [getBoard]);
    // console.log(board);

    const handleOnDragEnd = (result: DropResult) => {
        const {source, destination, type} = result;

        console.log(source);
        console.log(destination);
        console.log(type);

        // if the item is dropped in non droppable area
        if(!destination){
            return
        }

        // handle column drop
        if(type === "column"){
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangedColumns = new Map(entries);
            board.columns = rearrangedColumns;

            setBoardState({...board, columns: rearrangedColumns})
        }

        // handle todo drop
        // if(type === "card"){
            
        // }

        
    }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
            {/* to avoid the error: Invariant failed: Cannot find droppable entry with id [board] => change the droppableId from "board" to "board-xx", hope this helps */}
        <Droppable droppableId="board-xx" direction='horizontal' type='column'> 
            {(provided) => (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto' {...provided.droppableProps} ref={provided.innerRef}>
                    {Array.from(board.columns.entries()).map(([id, column], index) => (
                        <Column key={id} id={id} todos={column.todos} index={index}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
  )
}

export default Board
