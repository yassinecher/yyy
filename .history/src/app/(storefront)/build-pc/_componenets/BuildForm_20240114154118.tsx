"use client"
import { CompatibiltyProfile } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Filter, ProfileType } from '../page'
import { Motherboard } from './Motherboard'
import { Processor } from './Processor'
import { Product } from '@/types'
type compatibiltyItemResult = {
    message: string,
    error: boolean
}

export type AllProductsCompatibility = {
    motherboardCompatibility: compatibiltyItemResult
    processorCompatibility: compatibiltyItemResult
    ramCompatibility: compatibiltyItemResult
    hardDiskCompatibility: compatibiltyItemResult
    caseCompatibility: compatibiltyItemResult
    powerCompatibility: compatibiltyItemResult
}

const defaultAllProductsCompatibility: AllProductsCompatibility = {
    motherboardCompatibility:{
        message: 'Veuillez sélectionner une cate mére',
        error: true,
    },
    processorCompatibility: {
        message: 'Veuillez sélectionner un processeur',
        error: true,
    },
    ramCompatibility: {
        message: 'Veuillez sélectionner au moins une barrette RAM',
        error: true,
    },
    hardDiskCompatibility: {
        message: 'Veuillez sélectionner un disque dur',
        error: true,
    },
    caseCompatibility: {
        message: 'Veuillez sélectionner un boîtier',
        error: true,
    },
    powerCompatibility: {
        message: 'Veuillez sélectionner la boîte d\'alimentation',
        error: true,
    },
};
export const BuildForm = (props: {
    profiles: ProfileType[],
    motherboardchipset: Filter
    motherboardcpusupport: Filter
    motherboardformat: Filter
    motherboardramslots: Filter
    motherboardmanufacturer: Filter
}) => {
    const [motherboardId, setMotherboardId] = useState<Product>()
    const [allProductCompatibility, setAllProductCompatibility] = useState<AllProductsCompatibility>(defaultAllProductsCompatibility)
    const [processorId, setProcessorId] = useState<Product>()
    const [ramId, setRamId] = useState<Product>()
    const [hardDiskId, setHardDisk] = useState<Product>()
    const [caseId, setCase] = useState<Product>()
    const [powerId, setPowerId] = useState<Product>()
    console.log(props.profiles)



    function haveCommonElement<T>(set1: T[], array2: T[]): boolean {
        const array1 = Array.from(set1);
    
        for (const item of array1) {
            if (array2.includes(item)) {
                return true;
            }
        }
    
        return false;
    }
    useEffect(() => {
        if (motherboardId) {
            const MProfiles = props.profiles.filter((e) => e.motherboards.find((ee) => ee.productId == motherboardId.id))
            if (processorId) {
                const PProfiles = props.profiles.filter((e) => e.CPUs.find((ee) => ee.productId == processorId.id))
                
               if(haveCommonElement(MProfiles,PProfiles)){
                const newc= {...allProductCompatibility,
                    ...{processorCompatibility:{ 
                    message: 'Processeur Compatible',
                   error: false,},
                   motherboardCompatibility:{ 
                    message: 'Carte mére Compatible',
                   error: false,},
                
                }
               }
               setAllProductCompatibility(newc)
            }else{
                const newc= {...allProductCompatibility,...{processorCompatibility:{ 
                    message: 'Processeur non Compatible avec la carte mére',
                   error: true,
                },motherboardCompatibility:{ 
                    message: 'Carte mére non Compatible avec le Processeur',
                   error: true,}}
               }
               setAllProductCompatibility(newc)
            }
           

        }

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
                motherboardramslots={props.motherboardramslots} motherboardmanufacturer={props.motherboardmanufacturer} />
            <Processor
                setProcessorId={setProcessorId}
                processorId={processorId}
                selectedCompatibility={allProductCompatibility}
                profiles={props.profiles}
                motherboardchipset={props.motherboardchipset}
                motherboardcpusupport={props.motherboardcpusupport}
                motherboardformat={props.motherboardformat}
                motherboardramslots={props.motherboardramslots} motherboardmanufacturer={props.motherboardmanufacturer}
            />

        </div>
    )
}
