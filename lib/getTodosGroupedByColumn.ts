import { database } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const data = await database.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!);

    const todos = data.documents;

    const columns = todos.reduce((accumulator, todo) => {
        if(!accumulator.get(todo.status)){
            accumulator.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        accumulator.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && {image: JSON.parse(todo.image)})
        })

        return accumulator;
    }, new Map<TypedColumn, Column>)

    // console.log("columns => ", columns);

    // if fetched data does not have all 3 columns data (missing from todo, inprogress and done) populate the missing ones with empty array
    const columnTypes : TypedColumn[] = ["todo", "inprogress", "done"];

    columnTypes.forEach(columnType => {
        if(!columns.get(columnType)){
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    });

    // sort the columns in the "columnType Array fashion"
    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a,b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))

        // OR 👇

        // [...columns.entries()].sort((a,b) => (
        //     columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        // ))
    )

    const board: Board = {
        columns: sortedColumns
    }

    return board;
}