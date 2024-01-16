"use client"
import { CompatibiltyProfile } from '@prisma/client'
import React, { useState } from 'react'
import { Filter, ProfileType } from '../page'
import { Motherboard } from './Motherboard'

export const BuildForm = (props: { profiles: ProfileType,
    motherboardramslots:Filter
    motherboardmanufacturer:Filter }) => {
    const [motherboardId, setMotherboardId] = useState("")
    console.log(props.profiles)


    return (
        <div>BuildForm
            <Motherboard motherboardmanufacturer={props.motherboardmanufacturer} />

           
        </div>
    )
}
