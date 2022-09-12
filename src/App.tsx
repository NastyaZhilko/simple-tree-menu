import React from 'react';
import {Header, TreeMenu} from "./components";

export type ItemType = {
    name: string
}

const Items = [
    {name: "root"},
    {name: "folder 1"},
    {name: "file 1 in folder 1"},
    {name: "folder 2"},
    {name: "folder 1 in folder 2"},
    {name: "file 1 folder 1 in folder 2"},
    {name: "file 2 folder 1 in folder 2"},
    {name: "folder 3"},
    {name: "folder 1 in folder 3"},
    {name: "file 1 folder 1 in folder 3"},
    {name: "file 2 folder 1 in folder 3"},
    {name: "file 3 folder 1 in folder 3"},
    {name: "folder 2 in folder 3"},
    {name: "file 1 folder 2 in folder 3"},
    {name: "file 2 folder 2 in folder 3"},
    {name: "file 3 folder 2 in folder 3"},
]

const map = Object.assign({}, ...Items.map(v =>
    ({[v.name]: Object.assign(v, {children: []})})
))

const arrayWithChildren = Object.values(map)

function createFolders(array: any) {
    for (let i = 0; i < array.length; i++) {
        if (i < array.length - 1 && array[i + 1]['name'].includes(array[i]['name'])) {
            array[i]['children'].push(array[i + 1]);
            array.splice(i + 1, 1)
            for (let j = 1; j < array.length; j++) {
                createFolders(array)
            }
        }
    }
    return array
}

const arrayWithFolders = createFolders(arrayWithChildren)

function createTreeStructure (array: any) {
    for(let i=0; i<array.length; i++){
        if (array[i]['children'].length>0){
            createFolders(array[i]['children'])
        }
    }
    return array
}

const treeStructure = createTreeStructure(arrayWithFolders)

function createRootArray(array: any) {
    let arr: any = []
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            arr.push(array[i])
        } else {
            arr[0]['children'].push(array[i])
        }
    }
    return arr
}
const finallyArray = createRootArray(treeStructure)


function App() {
    return (
        <>
            <Header/>
            <div style={{padding: '16px'}}>
                <TreeMenu item={finallyArray[0]}/>
            </div>
        </>
    );
}

export default App;
