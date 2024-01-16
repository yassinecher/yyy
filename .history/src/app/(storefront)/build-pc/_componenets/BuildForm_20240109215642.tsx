"use client"
import { CompatibiltyProfile } from '@prisma/client'
import React, { useState } from 'react'
import { Filter, ProfileType } from '../page'
import { Motherboard } from './Motherboard'

export const BuildForm = (props: { profiles: ProfileType,
    motherboardchipset:Filter
    motherboardcpusupport:Filter
    motherboardformat:Filter
    motherboardramslots:Filter
    motherboardmanufacturer:Filter }) => {
    const [motherboardId, setMotherboardId] = useState("")
    console.log(props.profiles)


    return (
        <div>BuildForm
            <Motherboard motherboardramslots={ props.motherboardramslots} motherboardmanufacturer={props.motherboardmanufacturer} />

           
        </div>
    )
}
