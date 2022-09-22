import {EditMeArgsType, ProfileType} from "../../../api/profileAPI";
import React, {ChangeEvent, useState} from "react";
import s from "./EditableProfileName.module.css";
import {FormControl, Input, InputLabel} from "@mui/material";
import editIcon from "../../../assets/image/icons/edit.svg";

type EditableProfileNamePropsType = {
    profile: ProfileType
    updateProfile: (args: EditMeArgsType) => void
}

export const EditableProfileName: React.FC<EditableProfileNamePropsType> = ({profile, updateProfile}) => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(profile.name)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        updateProfile({name})
        setEditMode(false)
    }
    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <div className={s.editNameBlock}>
                    <FormControl variant='standard' className={s.editNameInput}>
                        <InputLabel color='primary'>Nickname</InputLabel>
                        <Input
                            id='name'
                            placeholder={'Nickname'}
                            value={name}
                            onChange={changeName}
                            color={'primary'}
                        />
                    </FormControl>
                    <button className={s.saveButton} onClick={activateViewMode}>
                        SAVE
                    </button>
                </div>
            ) : (
                <div className={s.nameBlock}>
                    <h4 className={s.name}>{profile.name}</h4>
                    <button className={s.onEditModeButton} onClick={activateEditMode}>
                        <img src={editIcon} alt='edit'/>
                    </button>
                </div>
            )}
        </>
    )
}