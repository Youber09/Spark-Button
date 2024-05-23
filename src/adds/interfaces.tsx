import { RefObject } from "react"

export interface data {
    data: inData[],
    status:string,
    isLoading: boolean,
    isError: boolean,
}

export interface oneData {
    data: inData,
    status:string,
    isLoading: boolean,
    isError: boolean,
}

export interface inData{
    img: string,
    id: number
}

export interface Display {
    image: inData,
    modal:  RefObject<HTMLDialogElement>
}

export interface params {
    Id: string
}

export interface dialog {
    current: HTMLDialogElement
}