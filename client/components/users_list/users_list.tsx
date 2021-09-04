import React, { useEffect } from "react";
import BasicLayout from "../../layouts/basic-layout/basic-layout";

export interface IResponse {
    data: { [prop: string]: any },
    messages: string[],
    errors: string[],
    status: "ok" | "bad"
}

export interface IUser {
    id: number,
    username: string,
    password: string,
    email: string,
    isActive: boolean
}

export default function UsersList() {
    const [users, updateUsers] = React.useState<IUser[]>([]);

    const requestData = async () => {
        const response = await fetch("/api/users/?page=1&per_page=3");

        if (response.ok) {
            const data: IResponse = await response.json();
            const users = data.data?.users;

            if (Array.isArray(users)) {
                updateUsers(users);
            }
        }
    };

    useEffect(() => {
        requestData()
            .catch((e) => {

            });
    });

    return (
      <div className={"users"}>
        <BasicLayout text={"Our users"}>
            <div className={"users__list w-100"}></div>
        </BasicLayout>
      </div>
    )
}