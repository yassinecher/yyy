"use client"
import { CompatibiltyProfile } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Filter, ProfileType } from '../page'
import { Motherboard } from './Motherboard'
import { Processor } from './Processor'
import { Product } from '@/types'
import { AllProductsCompatibility, defaultAllProductsCompatibility } from './comps'
import { Memory, Ram } from './Ram'


export const BuildForm = (props: {
    profiles: ProfileType[],
    processorModel: Filter
    cPUSupport: Filter
    motherboardchipset: Filter
    motherboardcpusupport: Filter
    motherboardformat: Filter
    motherboardramslots: Filter
    motherboardmanufacturer: Filter
    memoryFrequency: Filter
    memoryMarque: Filter
    memoryNumber: Filter
    memoryType: Filter
}) => {
    const [motherboardId, setMotherboardId] = useState<Product>()
    const [allProductCompatibility, setAllProductCompatibility] = useState<AllProductsCompatibility>(defaultAllProductsCompatibility)
    const [processorId, setProcessorId] = useState<Product>()
    const [ramId, setRamId] = useState<Memory[]>([])
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
                    ...{motherboardCompatibility:{...allProductCompatibility.motherboardCompatibility,...{processorCompatibility:{ 
                    message: 'Processeur Compatible',
                   error: false,},
                   motherboardCompatibility:{ 
                    message: 'Carte mére Compatible',
                   error: false,},},}
                
                }
               }
               setAllProductCompatibility(newc)
            }else{
                const newc= {...allProductCompatibility,...{motherboardCompatibility:{...allProductCompatibility.motherboardCompatibility,...{processorCompatibility:{ 
                    message: 'Processeur non Compatible avec la carte mére',
                   error: true,
                },motherboardCompatibility:{ 
                    message: 'Carte mére non Compatible avec le Processeur',
                   error: true,}},}}
               }
               setAllProductCompatibility(newc)
            }
           

        }

    }
    }, [motherboardId,processorId,ramId,hardDiskId,caseId,powerId]);
    useEffect(() => {
        if (processorId) {
            const PProfiles = props.profiles.filter((e) => e.CPUs.find((ee) => ee.productId == processorId.id))
                
            if (motherboardId) {
                const MProfiles = props.profiles.filter((e) => e.motherboards.find((ee) => ee.productId == motherboardId.id))
            
               if(haveCommonElement(MProfiles,PProfiles)){
                const newc= {...allProductCompatibility,
                    ...{motherboardCompatibility:{...allProductCompatibility.motherboardCompatibility,...{processorCompatibility:{ 
                    message: 'Processeur Compatible',
                   error: false,},
                   motherboardCompatibility:{ 
                    message: 'Carte mére Compatible',
                   error: false,},},
                
                
                },
                processorCompatibility:{
                    ...allProductCompatibility.processorCompatibility,...{processorCompatibility:{ 
                        message: 'Processeur Compatible',
                       error: false,},
                       motherboardCompatibility:{ 
                        message: 'Carte mére Compatible',
                       error: false,},},
                    
                }
                
                }
               }
               setAllProductCompatibility(newc)
            }else{
                const newc= {...allProductCompatibility,...{motherboardCompatibility:{...allProductCompatibility.motherboardCompatibility,...{processorCompatibility:{ 
                    message: 'Processeur non Compatible avec la carte mére',
                   error: true,
                },motherboardCompatibility:{ 
                    message: 'Carte mére non Compatible avec le Processeur',
                   error: true,}},}},
                   processorCompatibility:{
                       ...allProductCompatibility.processorCompatibility,...{processorCompatibility:{ 
                        message: 'Processeur non Compatible avec la carte mére',
                        error: true,},
                          motherboardCompatibility:{ 
                            message: 'Carte mére non Compatible avec le Processeur',
                            error: true,},},
                       
                   }
               }
               setAllProductCompatibility(newc)
            }
           

        }

    }
    }, [motherboardId,processorId,ramId,hardDiskId,caseId,powerId]);

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
               cPUSupport={props.cPUSupport}
               processorModel={props.processorModel}
                />
            <Ram
            rams={ramId}
            setRams={setRamId}
            selectedCompatibility={allProductCompatibility}
            motherboardId={motherboardId}
            setMotherboardId={setMotherboardId}
            profiles={props.profiles}
            memoryFrequency={props.memoryFrequency}
            memoryMarque={props.memoryMarque}
            memoryNumber={props.memoryNumber}
            memoryType={props.memoryType} />
        </div>
    )
}
