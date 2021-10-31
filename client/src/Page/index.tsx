import React from 'react';
import {Wrapper} from '../style/Wrapper'

import Paper from '@mui/material/Paper';

// type Book = {
//     title: string,
//     author: string,
//     price: number,
// }

// type IndexProps = {
//     book: Book
// }


const Index: React.VFC = () => {
    return (
        <Wrapper>
            <Paper sx={{width: 500, height:700}}>
                This is Hello
            </Paper>
        </Wrapper>
    )
}

export default Index;