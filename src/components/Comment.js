import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions/commentActions";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from '@material-ui/core';
import CommentForm from './CommentForm';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useToasts} from "react-toast-notifications";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25 rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Comment = ({classes, ...props}) => {
    // const [x, setX] = useState(0)
    // setX(5)

    // useEffect(() => {

    // },[x])
    const {addToast} = useToasts()
    // passing empty string to useState because mongo IDs are strings
    const [currentId, setCurrentId] = useState("")

    useEffect(() => {
        props.fetchAllComments()
    },[props]) // componentDidMount alternative

    const onDelete = id => {
        if (window.confirm('Are you sure you want to delete this comment?'))
            props.deleteComment(id, () => addToast("Deleted successfully", {appearance: 'info'}))
    }

    if (props.commentList.length == 0){
        return (
            <Paper className={classes.paper} elevation={3}>
                <Grid container>
                    <Grid item xs={6}>
                        <CommentForm {...({currentId, setCurrentId})}/>
                    </Grid>
                    <Grid item xs={6}>
                        <p>No Comments at this time. Try adding one!</p>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <CommentForm {...({currentId, setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Text</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.commentList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.id}</TableCell>
                                            <TableCell>{record.author}</TableCell>
                                            <TableCell>{record.text}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary" onClick={() => {setCurrentId(record.id)}}></EditIcon></Button>
                                                    <Button><DeleteIcon color="secondary" onClick={() => onDelete(record.id)}></DeleteIcon></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    commentList: state.comment.list
})

const mapActionToProps = {
    fetchAllComments: actions.fetchAll,
    deleteComment: actions.del
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Comment));