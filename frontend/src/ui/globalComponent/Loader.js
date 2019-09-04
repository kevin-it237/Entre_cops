import React from 'react';

const Loader = (props) => (
    <div class="spinner-border" role="status" style={{color: props.color}}>
        <span class="sr-only">Loading...</span>
    </div>
);

export default Loader;