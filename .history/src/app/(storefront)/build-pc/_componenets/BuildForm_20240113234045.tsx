"use client"
import { CompatibiltyProfile } from '@prisma/client'
import React, { useState } from 'react'
import { Filter, ProfileType } from '../page'
import { Motherboard } from './Motherboard'
import { Processor } from './Processor'
import { Product } from '@/types'

export const BuildForm = (props: { profiles: ProfileType,
    motherboardchipset:Filter
    motherboardcpusupport:Filter
    motherboardformat:Filter
    motherboardramslots:Filter
    motherboardmanufacturer:Filter }) => {
    const [motherboardId, setMotherboardId] = useState<Product>()
    const [processorId, setProcessorId] = useState('')
    console.log(props.profiles)


    return (
        <div>BuildForm
            <Motherboard
            motherboardId={motherboardId}
            setMotherboardId={setMotherboardId}
            profiles={props.profiles}
            motherboardchipset={props.motherboardchipset}
            motherboardcpusupport={props.motherboardcpusupport}
            motherboardformat={props.motherboardformat}
            motherboardramslots={ props.motherboardramslots} motherboardmanufacturer={props.motherboardmanufacturer} />
            <Processor
             setMotherboardId={setProcessorId}
             profiles={props.profiles}
             motherboardchipset={props.motherboardchipset}
             motherboardcpusupport={props.motherboardcpusupport}
             motherboardformat={props.motherboardformat}
             motherboardramslots={ props.motherboardramslots} motherboardmanufacturer={props.motherboardmanufacturer}  
            />
           
        </div>
    )
}
