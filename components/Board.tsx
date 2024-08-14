"use client"
import { useBoardStore } from '@/store/boardStore';
import React, { useEffect } from 'react'
import { DragDropContext, Droppable, DroppableProps } from 'react-beautiful-dnd';
import Column from './Column';

const Board = () => {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState, state.updateTodoInDB]);
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

        // step needed as indices are stored as numbers in instead of id's in dnd
        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const endColIndex = columns[Number(destination.droppableId)];


        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos
        }

        const endCol: Column = {
            id: endColIndex[0],
            todos: endColIndex[1].todos
        }

        if(!startCol || !endCol) return

        // if the card is picked up and drop in the same place... do nothing!
        if(source.index === destination.index && startCol === endCol) return;

        const newTodos = startCol.todos;
        const [movedTodo] = newTodos.splice(source.index, 1);

        if(startCol.id === endCol.id){
            // same column task drag
            newTodos.splice(destination.index, 0, movedTodo)
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }
            const newColumns = new Map(board.columns)
            newColumns.set(startCol.id, newCol)
            setBoardState({...board, columns: newColumns})
        } else {
            // dragging the task card to a different column
            const finishTodos = Array.from(endCol.todos);
            finishTodos.splice(destination.index, 0, movedTodo)
            
            const newColumns = new Map(board.columns)
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            newColumns.set(startCol.id, newCol)
            newColumns.set(endCol.id, {
                id: endCol.id,
                todos: finishTodos
            })

            // update in DB
            updateTodoInDB(movedTodo, endCol.id)

            setBoardState({...board, columns: newColumns})
        }

        
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
