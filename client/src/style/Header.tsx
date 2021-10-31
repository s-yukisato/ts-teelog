import React from 'react';
import {styled} from '@mui/system';



const CContainer = styled('div') ({
    position: "relative",
    width: "100%",
    minHeight: "100vh",
});

type CProps = {
    children: React.ReactNode;
};

export const Container: React.VFC<CProps> = ({children}) => {
    return <CContainer>{children}</CContainer>;
}