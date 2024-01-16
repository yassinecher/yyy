"use client"
import { CompatibiltyProfile } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Filter, ProfileType } from '../page'
import { Motherboard } from './Motherboard'
import { Processor } from './Processor'
import { Product } from '@/types'
type compatibiltyItemResult={
    message:string,
    error:boolean
    }

export type AllProductsCompatibility={
    processorCompatibility:compatibiltyItemResult
    ramCompatibility:compatibiltyItemResult
    hardDiskCompatibility:compatibiltyItemResult
    caseCompatibility:compatibiltyItemResult
    powerCompatibility:compatibiltyItemResult
}
export const BuildForm = (props: { profiles: ProfileType[],
    motherboardchipset:Filter
    motherboardcpusupport:Filter
    motherboardformat:Filter
    motherboardramslots:Filter
    motherboardmanufacturer:Filter }) => {
    const [motherboardId, setMotherboardId] = useState<Product>()
    const [allProductCompatibility, setAllProductCompatibility] = useState<AllProductsCompatibility>()
    const [processorId, setProcessorId] = useState<Product>()
    const [ramId, setRamId] =useState<Product>()
    const [hardDiskId, setHardDisk] = useState<Product>()
    const [caseId, setCase] = useState<Product>()
    const [powerId, setPowerId] =useState<Product>()
    console.log(props.profiles)


    useEffect(() => {
      if(motherboardId){
        const cProfiles=props.profiles.filter((e)=>e.motherboards)
       console.log(props.profiles)
      }
       

      }, [motherboardId]);

    return (
        <div>
            <Motherboard
            selectedCompatibility={allProductCompatibility}
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
