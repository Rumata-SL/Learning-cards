import React, {ChangeEvent, useState} from "react";
import s from './Profile.module.css'
import avatar from './assets/avatar.png'
import changePhoto from './assets/photo.svg'
import editIcon from './assets/edit.svg'
import logoutIcon from './assets/logout.svg'

export const Profile = () => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState('Ivan')

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
    }
    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>Personal Information</h3>
            <div className={s.avatarBlock}>
                <div className={s.avatar}>
                    <div className={s.holder}>
                        <img src={avatar} alt="avatar"/>
                    </div>
                    <button className={s.changeAvatarButton}>
                        <img src={changePhoto} alt="change-photo"/>
                    </button>
                </div>
            </div>
            {editMode
                ? <div className={s.editNameBlock}>
                    <label htmlFor="profileName">Nickname</label>
                    <div className={s.editNameForm}>
                        <input id='profileName' type="text" value={name} onChange={changeName}/>
                        <button className={s.saveButton} onClick={activateViewMode}>SAVE</button>
                    </div>
                </div>
                : <div className={s.nameBlock}>
                    <h4 className={s.name}>{name}</h4>
                    <button className={s.onEditModeButton} onClick={activateEditMode}>
                        <img src={editIcon} alt="edit"/>
                    </button>
                </div>
            }

            <span className={s.email}>j&johnson@gmail.com</span>

            <div className={s.logoutButtonBlock}>
                <button className={s.logoutButton}>
                    <img src={logoutIcon} alt="logout"/>
                    Log out
                </button>
            </div>
        </div>
    );
};
