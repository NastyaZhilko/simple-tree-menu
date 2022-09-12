import React, {useState} from "react";
import classes from "./TreeMenu.module.css"
import {ReactComponent as Folder} from './../../assets/folder.svg';
import {ReactComponent as File} from './../../assets/file.svg';
import {ReactComponent as FolderOpen} from './../../assets/opened-folder.svg';
import {ReactComponent as Plus} from './../../assets/plus.svg';
import {ReactComponent as Minus} from './../../assets/minus.svg';

const TreeMenu = ({item}: any) => {

    const [open, setOpen] = useState<boolean>(true)
    const openFolder = (name: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setOpen(!open);
        event.stopPropagation();
    }

    let children = null;
    if (item.children && item.children.length) {
        children = (
            <ul>
                {item.children.map((i: any, index: number) => (
                    <TreeMenu item={i} key={index}/>
                ))}
            </ul>
        );
    }

    return (
        <div>
            <li className={classes.list}>
                <div className={classes.imageBlock}>
                    {item.children.length
                        ?
                        (open
                            ?
                            (<>
                                <Minus className={classes.marker}
                                      onClick={(e: any) => openFolder(item.name, e)}/>
                                <FolderOpen className={classes.image}/>
                            </>)
                            : (<>
                                <Plus className={classes.marker}
                                      onClick={(e: any) => openFolder(item.name, e)}/>

                                <Folder className={classes.image}/>
                            </>))
                        : <File className={classes.image}/>
                    }
                    {item.name}
                </div>
                <div className={`${classes.containerMenuLinks} ${open && classes.activeMenu}`}>
                    {children}
                </div>
            </li>
        </div>
    );
}
export default TreeMenu;
