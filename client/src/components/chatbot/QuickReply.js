import React from 'react';

const QuickReply = (props) => {
    // To check if object has payload or link to a page
    if(props.reply.structValue.fields.payload){
        return(
            <a style={{ margin: 3 }} href="/" className="waves-effect waves-light btn-small"
            onClick={(event) =>
                props.click(
                    event,
                    props.reply.structValue.fields.payload.stringValue,
                    props.reply.structValue.fields.text.stringValue,
                )
            }>
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    } else {
        return(
            <a style={{ margin: 3, border: '1px solid lightgray' }} target="_blank"
                href={props.reply.structValue.fields.link.stringValue} 
                className="waves-effect waves-light btn-small">
                {props.reply.structValue.fields.text.stringValue}
            </a>
        )
    }
    
};

export default QuickReply;
