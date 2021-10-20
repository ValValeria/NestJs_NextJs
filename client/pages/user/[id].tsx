import React, {useEffect, useState} from "react";
import BasicLayout from "../../layouts/basic-layout/basic-layout";
import {useRouter} from "next/router";
import {IUserResponse, IUser} from "../../interfaces";

export default function User(){
    const [user, updateUser] = useState<IUser>();
    const router = useRouter();

    useEffect(() => {
        (async() => {
            const response = await fetch(`/api/user/${router.query.id}`);
            const json: IUserResponse = await response.json();
            updateUser(json.data.user[0]);
        })();
    }, [router.query.id]);

    return (
        <div className={"user w-100"}>
            <BasicLayout hasTitle={true} text={"Profile"}>

            </BasicLayout>
        </div>
    );
}
