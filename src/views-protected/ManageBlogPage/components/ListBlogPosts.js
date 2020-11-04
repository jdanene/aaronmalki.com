import React, {useState, useEffect, useContext} from "react";
import {AppContext} from "../../../context";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {getKeyFromSingelton} from "../../../context/useBlogPost";
import BlogPostItem from "./BlogPostItem";
import {blog_states} from "../../../constants/contants";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import UploadBlog from "./UploadBlog";
import {colorScheme} from "../../../constants";

const useStyles = makeStyles((theme) => ({
    table: {
        display: "flex", flexGrow: 1, margin: theme.spacing(2), borderRadius: 6
    }
}));

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: 'transparent',

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : colorScheme.other.backgroundComplementary,
    padding: grid,
    width: 346,
    overflowY: "auto",
    border: '5 solid green',
    height: '75vh',
    borderRadius: 2,
    margin: 5

});

const COLUMNS_NAMES = [blog_states.main_featured, blog_states.featured, blog_states.posts];
const COLUMN_COLORS = [colorScheme.general.shabby_chic,colorScheme.general.other_blue,colorScheme.general.dark_purple ]
const TableHeader = ({colIdx}) => {
    return (
        <div style={{display: 'flex', flexDirection:'column'}}>
            <Typography variant="h6" color="textSecondary" component="h6">{COLUMNS_NAMES[colIdx]}</Typography>
            <Divider style={{margin:5}}/>
            <UploadBlog blogState={COLUMNS_NAMES[colIdx]} color={COLUMN_COLORS[colIdx]}/>
        </div>
    )
};
//export const blog_states = {
// featured: "featured",
//    posts: "posts",
//  main_featured: "main_featured"

//BlogPostItem { post,path }


const getListArrayFromPosts = (blogPosts) => {
    let post_array = [[], [], []];

    if (COLUMNS_NAMES[0] in blogPosts) {
        post_array[0] = Object.keys(blogPosts[COLUMNS_NAMES[0]]).map((key) => {

            return {post: {...blogPosts[COLUMNS_NAMES[0]][key]}, key}
        })

    }

    if (COLUMNS_NAMES[1] in blogPosts) {
        post_array[1] = Object.keys(blogPosts[COLUMNS_NAMES[1]]).map((key) => {
            return {post: {...blogPosts[COLUMNS_NAMES[1]][key]}, key}
        })
    }

    if (COLUMNS_NAMES[2] in blogPosts) {
        post_array[2] = Object.keys(blogPosts[COLUMNS_NAMES[2]]).map((key) => {
            return {post: {...blogPosts[COLUMNS_NAMES[2]][key]}, key}
        })
    }

    return post_array;


};

function ListBlogPosts() {
    const classes = useStyles();
    const {isBlogLoaded, blogPaths, blogPosts} = useContext(AppContext);
    // let x = blogPaths[getKeyFromSingelton(main_featured)]


    // The indices in the array determine
    const [state, setState] = useState(getListArrayFromPosts(blogPosts));

    function onDragEnd(result) {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }

    // Adding a column just add a blank entry to array
    return (
        <div>

            <button
                type="button"
                onClick={() => {
                    setState([...state, []]);
                }}
            >
                Add new group
            </button>
            <button
                type="button"
                onClick={() => {
                    setState([...state, getItems(1)]);
                }}
            >
                Add new item
            </button>
            <div className={classes.table}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <TableHeader colIdx={ind}/>
                          <Droppable key={ind} droppableId={`${ind}`}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={{...getListStyle(snapshot.isDraggingOver)}}
                                        {...provided.droppableProps}
                                    >
                                        {el.map((item, index) => (
                                            <Draggable
                                                key={item.key}
                                                draggableId={item.key}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-around"
                                                            }}
                                                        >

                                                            <BlogPostItem post={item.post} path={blogPaths[item.key]}/>

                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}


export default ListBlogPosts;