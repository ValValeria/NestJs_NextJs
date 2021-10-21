import React, {useEffect, useState} from "react";
import BasicLayout from "../layouts/basic-layout/basic-layout";
import {IResponse, IUser} from "../interfaces";
import {useRouter} from "next/router";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import UserCard from "../components/user_card";

export default function Users(){
    const [users, updateUsers] = useState<IUser[]>();
    const [page, updatePage] = useState<number>(1);
    const [open, updateOpen] = useState<boolean>(false);
    const router = useRouter();

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={() => updateOpen(false)}>
                Close
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="primary"
                onClick={() => updateOpen(false)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    
    useEffect(() => {
        async function loadUsers(){
            try{
                const response = await fetch(`/api/users/?page=${page}`);
                const data: IResponse<IUser[]> = await response.json();

                updateUsers(data.data.users);
            } catch (e){
                return Promise.reject()
            }

            return Promise.resolve();
        }

        loadUsers
            .catch(async() => {
                await router.push('/');
            })
    }, []);

    return  (
        <div className={"user w-100"}>
          <BasicLayout hasTitle={true} text={"Users"}>
              <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={() => updateOpen(false)}
                  message="Some errors have occurred"
                  action={action}
              />

              {
                  users.map(v => {
                      return (
                          <UserCard user={v} key={Math.random()}/>
                      );
                  })
              }
          </BasicLayout>
        </div>);
}
