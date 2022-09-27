/* eslint-disable */

import React from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

type gradePropsType = {
    grade: number
}
export const Grade: React.FC<gradePropsType> = props => {

    const roundedGrade = Number((props.grade).toFixed())

    return <div>
        <StarOutlinedIcon sx={roundedGrade >= 1 ? {color: '#FFC700'} : {color: '#DADADA'}}/>
        <StarOutlinedIcon sx={roundedGrade >= 2 ? {color: '#FFC700'} : {color: '#DADADA'}}/>
        <StarOutlinedIcon sx={roundedGrade >= 3 ? {color: '#FFC700'} : {color: '#DADADA'}}/>
        <StarOutlinedIcon sx={roundedGrade >= 4 ? {color: '#FFC700'} : {color: '#DADADA'}}/>
        <StarOutlinedIcon sx={roundedGrade >= 5 ? {color: '#FFC700'} : {color: '#DADADA'}}/>
    </div>

}