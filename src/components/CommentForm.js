import React, {useState, useEffect} from 'react';
import { Grid, TextField, withStyles, Button } from '@material-ui/core';
import useForm from "./useForm";
import {connect} from "react-redux";
import * as actions from "../actions/commentActions";
import {useToasts} from "react-toast-notifications";

const styles = theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            minWidth: 200,
        }
    },

    smMargin: {
        margin: theme.spacing(1)
    },
})

const initialFieldValues = {
    author: '',
    text: ''
}

const CommentForm = ({classes, ...props}) => {

    const {addToast} = useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('author' in fieldValues)
            temp.author = fieldValues.author ? "" : "This field is required."
        if ('text' in fieldValues)
            temp.text = fieldValues.text ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate())
        {
            //const onSuccess = serverValidation => {
        const onSuccess = serverValidation => {
                serverValidation = true;
                switch(serverValidation){
                case true:
                    addToast("Submitted succesfully", {appearance: 'success'})
                    break
                default:
                    addToast("Comment wasn't valid", {appearance: 'error'})
                }
            }
            if (props.currentId == "")
                props.createComment(values, serverValidation => {
                    onSuccess(serverValidation)
                    resetForm()
                })
            else
                props.updateComment(values, serverValidation => {
                    onSuccess(serverValidation)
                    resetForm()
                })
        }
    }    

    useEffect(() => {
        if (props.currentId != "")
            setValues({
                ...props.commentList.find(x => x.id == props.currentId)
            })
            setErrors({})
    }, [props.currentId])

    return (
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
                <TextField
                name="author"
                varient="outlined"
                label="Your Name"
                value={values.author}
                onChange={handleInputChange}
                {...(errors.author && {error:true, helperText:errors.author})}
                />
                
                <TextField
                name="text"
                varient="outlined"
                label="Your Comment"
                value={values.text}
                onChange={handleInputChange}
                {...(errors.text && {error:true, helperText:errors.text})}
                />
                
                <div>
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.smMargin}
                    >
                        Submit
                    </Button>

                    <Button
                    variant="contained"
                    className={classes.smMargin}
                    onClick={resetForm}
                    >
                        Reset
                    </Button>
                </div>
            </Grid>
        </Grid>
    </form>
    );
}

const mapStateToProps = state => ({
    commentList: state.comment.list
})

const mapActionToProps = {
    createComment: actions.create,
    updateComment: actions.update,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CommentForm));